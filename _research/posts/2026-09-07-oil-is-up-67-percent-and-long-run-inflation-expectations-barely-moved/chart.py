# Chart for "Oil is up 67% and long-run inflation expectations barely moved".
# Reads data.csv in this folder (FRED: DFII10, T5YIE, T5YIFR, DCOILBRENTEU, through Sep 4 2026). Run from the repo root.
import pandas as pd, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.style.use("_research/orca.mplstyle")
plt.rcParams.update({"axes.titlesize": 15, "axes.labelsize": 12, "xtick.labelsize": 11, "ytick.labelsize": 11})
P = "_research/posts/2026-09-07-oil-is-up-67-percent-and-long-run-inflation-expectations-barely-moved"
d = pd.read_csv(f"{P}/data.csv", parse_dates=["date"]).set_index("date")
d = d[d.index >= "2026-01-01"].dropna(subset=["DGS10"])

fig, ax = plt.subplots(figsize=(8, 4.8))
ax.axvline(pd.Timestamp("2026-04-07"), color="#8A857C", lw=1, ls="--", zorder=0)
ax.annotate("Brent peaks at $138 (Apr 7)", xy=(pd.Timestamp("2026-04-10"), 1.66), fontsize=10, color="#55514B", ha="left", va="bottom")
ax.plot(d.index, d.T5YIE, color="#8A857C", lw=1.7, zorder=2)
ax.plot(d.index, d.DFII10, color="#141414", lw=1.9, zorder=3)
ax.plot(d.index, d.T5YIFR, color="#CAAD5F", lw=2.8, zorder=4)
end = d.index[-1]
labels = [("DFII10", "10-year real yield", "#141414", 0.03, "normal"),
          ("T5YIE", "5-year breakeven", "#55514B", 0.03, "normal"),
          ("T5YIFR", "5y5y forward breakeven", "#816928", -0.05, "bold")]
for col, lab, c, dy, w in labels:
    ax.annotate(f"{lab} {d[col].iloc[-1]:.2f}", xy=(end, d[col].iloc[-1] + dy), xytext=(6, 0), textcoords="offset points",
                fontsize=10.5, color=c, va="center", fontweight=w)
ax.set_ylim(1.6, 2.8)
ax.set_xlim(d.index[0], end + pd.Timedelta(days=75))
ax.set_xticks(pd.date_range("2026-01-01", "2026-09-01", freq="MS"))
ax.xaxis.set_major_formatter(matplotlib.dates.DateFormatter("%b"))
ax.yaxis.set_major_formatter(matplotlib.ticker.FormatStrFormatter("%.1f"))
ax.set_ylabel("Percent")
ax.set_title("Near-term inflation pricing chased oil. The long run did not.")
fig.savefig(f"{P}/chart.png", dpi=200, bbox_inches="tight")
