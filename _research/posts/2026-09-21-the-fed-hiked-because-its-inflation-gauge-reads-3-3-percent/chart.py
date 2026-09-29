# Chart for "The Fed hiked because its inflation gauge reads 3.3%".
# Reads data-monthly.csv in this folder (FRED: CPILFESL from BLS, PCEPILFE from BEA; data as of Sep 18 2026). Run from the repo root.
import pandas as pd, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.style.use("_research/orca.mplstyle")
plt.rcParams.update({"axes.titlesize": 15, "axes.labelsize": 12, "xtick.labelsize": 11, "ytick.labelsize": 11})
P = "_research/posts/2026-09-21-the-fed-hiked-because-its-inflation-gauge-reads-3-3-percent"
m = pd.read_csv(f"{P}/data-monthly.csv", parse_dates=["date"]).set_index("date")
y = pd.DataFrame({"cpi": m.CPILFESL.pct_change(12, fill_method=None) * 100,
                  "pce": m.PCEPILFE.pct_change(12, fill_method=None) * 100})
y = y[y.index >= "2025-01-01"]

fig, ax = plt.subplots(figsize=(8, 4.8))
ax.axhline(2, color="#8A857C", lw=1.1, ls="--", zorder=1)
ax.annotate("Fed's 2% goal (for PCE)", xy=(pd.Timestamp("2025-01-15"), 2.04), fontsize=10, color="#55514B", va="bottom")
c = y.cpi.dropna(); p = y.pce.dropna()
ax.plot(y.index, y.cpi, color="#8A857C", lw=1.9, marker="o", ms=3.5, zorder=2)   # gap at Oct 2025: no CPI was published
ax.plot(p.index, p, color="#CAAD5F", lw=2.8, marker="o", ms=4, zorder=3)
ax.annotate(f"Core PCE {p.iloc[-1]:.2f}\n({p.index[-1]:%b})", xy=(p.index[-1], p.iloc[-1]), xytext=(8, 4), textcoords="offset points",
            fontsize=10.5, color="#816928", fontweight="bold", va="bottom")
ax.annotate(f"Core CPI {c.iloc[-1]:.2f}\n({c.index[-1]:%b})", xy=(c.index[-1], c.iloc[-1]), xytext=(8, -4), textcoords="offset points",
            fontsize=10.5, color="#55514B", va="top")
ax.set_ylim(1.75, 3.75)
ax.set_yticks([2.0, 2.5, 3.0, 3.5])
ax.set_xlim(pd.Timestamp("2025-01-01"), pd.Timestamp("2026-11-20"))
ax.set_xticks(pd.date_range("2025-01-01", "2026-09-01", freq="4MS"))
ax.xaxis.set_major_formatter(matplotlib.dates.DateFormatter("%b\n%Y"))
ax.yaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: f"{v:.1f}%"))
ax.set_ylabel("Change from a year earlier")
ax.set_title("Two core inflation gauges, almost a point apart")
fig.savefig(f"{P}/chart.png", dpi=200, bbox_inches="tight")
