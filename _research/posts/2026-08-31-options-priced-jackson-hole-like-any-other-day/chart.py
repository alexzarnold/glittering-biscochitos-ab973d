# Chart for "Options priced Jackson Hole like any other day".
# Reads data.csv in this folder (FRED SP500 and DGS2, Cboe VIX9D and VIX, through Aug 28 2026). Run from the repo root.
import numpy as np, pandas as pd, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.style.use("_research/orca.mplstyle")
plt.rcParams.update({"axes.titlesize": 15, "axes.labelsize": 12, "xtick.labelsize": 11, "ytick.labelsize": 11})
P = "_research/posts/2026-08-31-options-priced-jackson-hole-like-any-other-day"
d = pd.read_csv(f"{P}/data.csv", parse_dates=["date"]).set_index("date")
spx = d.SP500.dropna(); ret = spx.pct_change() * 100; v9 = d.VIX9D.dropna()
# Chair's Jackson Hole speech dates, from federalreserve.gov speech pages
days = ["2017-08-25", "2018-08-24", "2019-08-23", "2020-08-27", "2021-08-27",
        "2022-08-26", "2023-08-25", "2024-08-23", "2025-08-22", "2026-08-28"]
k = np.sqrt(2 / np.pi) / np.sqrt(252)   # expected absolute one-day move per point of annualized vol
rows = []
for s in days:
    t = pd.Timestamp(s); eve = spx.index[spx.index < t][-1]
    rows.append((t.year, v9[eve] * k, abs(ret[t]), ret[t]))
r = pd.DataFrame(rows, columns=["year", "implied", "realized", "signed"])
r.to_csv(f"{P}/jackson_hole_days.csv", index=False, float_format="%.3f")

fig, ax = plt.subplots(figsize=(8, 5.4))
ax.grid(axis="y", visible=False); ax.grid(axis="x", visible=True)
y = np.arange(len(r))[::-1]
for yi, row in zip(y, r.itertuples()):
    hl = row.year == 2026
    line_c = "#CAAD5F" if hl else "#C9C4BB"
    ax.plot([row.implied, row.realized], [yi, yi], color=line_c, lw=3 if hl else 2, zorder=1, solid_capstyle="round")
    ax.scatter(row.implied, yi, s=70, facecolor="#FAF9F7", edgecolor="#816928" if hl else "#8A857C", lw=1.8, zorder=3)
    ax.scatter(row.realized, yi, s=70, color="#816928" if hl else "#141414", zorder=4)
ax.set_yticks(y); ax.set_yticklabels(r.year.astype(str))
for lab in ax.get_yticklabels():
    if lab.get_text() == "2026": lab.set_color("#816928"); lab.set_fontweight("bold")
ax.set_xlim(0, 3.7)
ax.xaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: f"{v:.1f}%"))
ax.set_xlabel("S&P 500 move on the day of the Fed chair's Jackson Hole speech")
ax.scatter([], [], s=70, facecolor="#FAF9F7", edgecolor="#8A857C", lw=1.8, label="Priced the night before (from VIX9D)")
ax.scatter([], [], s=70, color="#141414", label="Actual size of the move")
ax.legend(loc="lower right", fontsize=10.5)
ax.set_title("Priced move versus actual move, 2017 to 2026")
fig.savefig(f"{P}/chart.png", dpi=200, bbox_inches="tight")
print(r.round(2).to_string())
