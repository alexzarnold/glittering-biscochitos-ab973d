# Chart for "The Fed hiked and long yields rose more than short ones".
# Reads data.csv and hike-dates.csv in this folder (FRED: DGS2, DGS10, DFEDTAR, DFEDTARU; through Oct 2 2026).
# Run from the repo root.
import pandas as pd, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.style.use("_research/orca.mplstyle")
plt.rcParams.update({"axes.titlesize": 15, "axes.labelsize": 12, "xtick.labelsize": 11, "ytick.labelsize": 11})
P = "_research/posts/2026-10-05-the-fed-hiked-and-long-yields-rose-more-than-short-ones"
d = pd.read_csv(f"{P}/data.csv", parse_dates=["date"]).set_index("date")
s = ((d.DGS10 - d.DGS2) * 100).dropna()          # 2s10s spread, basis points
dec = pd.to_datetime(pd.read_csv(f"{P}/hike-dates.csv").decision_date)
N = 13                                            # trading days after the decision

paths = {}
for t in dec:
    i = s.index.get_loc(s[s.index < t].index[-1])  # last close before the decision
    w = s.iloc[i:i + N + 1]
    paths[t] = (w - w.iloc[0]).reset_index(drop=True)
P_ = pd.DataFrame(paths)
past, now = P_[[c for c in P_.columns if c.year < 2026]], P_[[c for c in P_.columns if c.year == 2026]].iloc[:, 0]

fig, ax = plt.subplots(figsize=(8, 4.8))
for c in past.columns:
    ax.plot(past.index, past[c], color="#C9C4BB", lw=0.9, alpha=0.8, zorder=1)
med = past.median(axis=1)
ax.plot(med.index, med, color="#141414", lw=2.2, zorder=3)
ax.plot(now.index, now, color="#CAAD5F", lw=3, marker="o", ms=4, zorder=4)
ax.axhline(0, color="#8A857C", lw=0.8, zorder=2)
ax.annotate(f"Sep 16 2026: {now.iloc[-1]:+.0f} bp", xy=(N, now.iloc[-1]), xytext=(6, 0), textcoords="offset points",
            fontsize=10.5, color="#816928", fontweight="bold", va="center")
ax.annotate(f"Median of {past.shape[1]} hikes,\n1994 to 2023: {med.iloc[-1]:+.0f} bp", xy=(N, med.iloc[-1]), xytext=(6, -4),
            textcoords="offset points", fontsize=10.5, color="#141414", va="top")
ax.annotate("Each gray line is one hike", xy=(0.4, 28), fontsize=10, color="#8A857C")
ax.set_xlim(0, N + 4.8); ax.set_xticks(range(0, N + 1, 2))
ax.set_ylim(-55, 35)
ax.set_xlabel("Trading days after the Fed's decision")
ax.set_ylabel("Change in 10-year minus 2-year (bp)")
ax.set_title("After a hike the curve usually flattens. This time it steepened.")
fig.savefig(f"{P}/chart.png", dpi=200, bbox_inches="tight")
print(past.shape[1], round(med.iloc[-1], 1), round(now.iloc[-1], 1), "min", round(past.min().min(), 1), "max", round(past.max().max(), 1))
