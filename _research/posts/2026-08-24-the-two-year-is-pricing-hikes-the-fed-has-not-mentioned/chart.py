# Chart for "The two-year is pricing hikes the Fed has not mentioned".
# Reads data.csv in this folder (FRED series, through Aug 21 2026). Run from the repo root.
import pandas as pd, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.style.use("_research/orca.mplstyle")
plt.rcParams.update({"axes.titlesize": 15, "axes.labelsize": 12, "xtick.labelsize": 11, "ytick.labelsize": 11})
P = "_research/posts/2026-08-24-the-two-year-is-pricing-hikes-the-fed-has-not-mentioned"
d = pd.read_csv(f"{P}/data.csv", parse_dates=["date"]).set_index("date")
d = d[d.index >= "2026-01-01"].dropna(subset=["DGS2"])

fig, ax = plt.subplots(figsize=(8, 4.8))
ax.fill_between(d.index, d.DFEDTARL, d.DFEDTARU, color="#C9C4BB", alpha=0.55, lw=0, step="post", zorder=1)
ax.plot(d.index, d.DGS3MO, color="#8A857C", lw=1.6, zorder=2)
ax.plot(d.index, d.DGS1, color="#141414", lw=1.8, zorder=3)
ax.plot(d.index, d.DGS2, color="#CAAD5F", lw=2.8, zorder=4)
end = d.index[-1]
for col, lab, c, dy in [("DGS2", "2-year", "#816928", 0.0), ("DGS1", "1-year", "#141414", 0.0), ("DGS3MO", "3-month bill", "#55514B", -0.06)]:
    ax.annotate(f"{lab} {d[col].iloc[-1]:.2f}", xy=(end, d[col].iloc[-1] + dy), xytext=(6, 0), textcoords="offset points",
                fontsize=10.5, color=c, va="center", fontweight="bold" if col == "DGS2" else "normal")
ax.annotate("Fed funds target range\n3.50 to 3.75", xy=(pd.Timestamp("2026-06-12"), 3.625), fontsize=10, color="#55514B", va="center")
ax.annotate("Feb 27: 2-year at 3.38,\nbelow the funds rate", xy=(pd.Timestamp("2026-02-27"), 3.38), xytext=(pd.Timestamp("2026-03-20"), 3.22),
            fontsize=10, color="#55514B", va="center", arrowprops=dict(arrowstyle="-", color="#8A857C", lw=0.9))
ax.set_ylim(3.1, 4.5)
ax.set_xlim(d.index[0], end + pd.Timedelta(days=40))
ax.yaxis.set_major_formatter(matplotlib.ticker.FormatStrFormatter("%.2f"))
ax.set_xticks(pd.date_range("2026-01-01", "2026-08-01", freq="MS"))
ax.xaxis.set_major_formatter(matplotlib.dates.DateFormatter("%b"))
ax.set_ylabel("Yield (%)")
ax.set_title("Short rates moved up while the Fed stood still")
fig.savefig(f"{P}/chart.png", dpi=200, bbox_inches="tight")
