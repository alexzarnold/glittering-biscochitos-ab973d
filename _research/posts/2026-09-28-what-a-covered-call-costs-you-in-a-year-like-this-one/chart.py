import pandas as pd, numpy as np, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.style.use("_research/orca.mplstyle")
# bump type so the chart stays legible at phone width
plt.rcParams.update({"axes.titlesize": 15, "axes.labelsize": 12,
                     "xtick.labelsize": 11, "ytick.labelsize": 11})

S = "C:/Users/2arno/AppData/Local/Temp/claude/c--Users-2arno-Documents-ORCA-Website-orca/537d7db9-eedd-4fd4-820d-ff44d576ace5/scratchpad"
P = "_research/posts/2026-09-28-what-a-covered-call-costs-you-in-a-year-like-this-one"
c = pd.read_csv(f"{S}/chartdata.csv")

fig, ax = plt.subplots(figsize=(7, 5.2))
lim = [-13.5, 13.5]
ax.plot(lim, lim, color="#8A857C", lw=1.1, ls="--", zorder=1)
ax.annotate("if it just tracked\nthe index", xy=(11, 11), xytext=(7.6, 11.6),
            fontsize=10.5, color="#55514B", ha="left", va="center", linespacing=1.4)

inside = c[(c.spx_ret.between(*lim)) & (c.bxm_ret.between(*lim))]
ax.scatter(inside.spx_ret, inside.bxm_ret, s=30, color="#141414", alpha=0.40,
           edgecolors="none", zorder=2)

edges = [-35, -8, -4, -2, 0, 1.5, 3, 5, 8, 25]
mids, ys = [], []
for lo, hi in zip(edges[:-1], edges[1:]):
    b = c[(c.spx_ret >= lo) & (c.spx_ret < hi)]
    if len(b) >= 3:
        mids.append(b.spx_ret.mean()); ys.append(b.bxm_ret.mean())
ax.plot(mids, ys, color="#CAAD5F", lw=2.8, marker="o", ms=5.5, zorder=3,
        clip_on=True, solid_capstyle="round")
ax.annotate("average of what it\nactually did", xy=(6.0, 1.85), xytext=(4.2, -4.6),
            fontsize=10.5, color="#816928", ha="left", va="center",
            fontweight="bold", linespacing=1.4,
            arrowprops=dict(arrowstyle="-", color="#816928", lw=0.9,
                            connectionstyle="arc3,rad=0.22", shrinkA=6, shrinkB=4))

ax.axhline(0, color="#C9C4BB", lw=0.8, zorder=0)
ax.axvline(0, color="#C9C4BB", lw=0.8, zorder=0)
ax.set_xlim(lim); ax.set_ylim(lim); ax.set_aspect("equal")
ax.set_xticks(range(-12, 13, 4)); ax.set_yticks(range(-12, 13, 4))
ax.set_xlabel("S&P 500 return over the option cycle (%)")
ax.set_ylabel("BXM buy-write return (%)")
ax.set_title("Writing calls bends the payoff")
off = len(c) - len(inside)
ax.annotate(f"115 monthly option cycles, Nov 2016 to Sep 2026. {off} cycles from the\n"
            "2020 crash and rebound fall outside this view; both are in the averages.",
            xy=(0, -0.155), xycoords="axes fraction", fontsize=9.5, color="#8A857C",
            ha="left", va="top", linespacing=1.5)
fig.savefig(f"{P}/chart.png", dpi=200, bbox_inches="tight")
print("saved. off-chart:", off, "| bins:", [f"{m:.1f}->{y:.1f}" for m, y in zip(mids, ys)])
