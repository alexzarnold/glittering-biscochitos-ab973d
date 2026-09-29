# Chart for "Who bought the 30-year at 5.31%".
# Reads treasury-auctions-30y.csv in this folder (U.S. Treasury Fiscal Data, auctions_query, through Sep 11 2026). Run from the repo root.
import pandas as pd, matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
plt.style.use("_research/orca.mplstyle")
plt.rcParams.update({"axes.titlesize": 15, "axes.labelsize": 12, "xtick.labelsize": 11, "ytick.labelsize": 11})
P = "_research/posts/2026-09-14-who-bought-the-30-year-at-5-31-percent"
d = pd.read_csv(f"{P}/treasury-auctions-30y.csv", parse_dates=["auction_date"])
d = d[d.inflation_index_security == "No"].sort_values("auction_date")          # nominal bonds only, no TIPS
d["dealer"] = d.primary_dealer_accepted / d.comp_accepted * 100             # share of competitive awards
d["trend"] = d.dealer.rolling(12).median()

fig, ax = plt.subplots(figsize=(8, 4.8))
past, last = d.iloc[:-1], d.iloc[-1]
ax.scatter(past.auction_date, past.dealer, s=18, color="#8A857C", alpha=0.55, edgecolors="none", zorder=2)
ax.plot(d.auction_date, d.trend, color="#141414", lw=2, zorder=3)
ax.scatter([last.auction_date], [last.dealer], s=90, color="#CAAD5F", edgecolor="#816928", lw=1.2, zorder=5)
ax.annotate(f"Sep 10 2026: {last.dealer:.1f}%\nlowest of {len(d)} auctions", xy=(last.auction_date, last.dealer),
            xytext=(pd.Timestamp("2021-06-01"), 4.5), fontsize=10.5, color="#816928", fontweight="bold", va="center",
            arrowprops=dict(arrowstyle="-", color="#816928", lw=0.9, connectionstyle="arc3,rad=-0.2", shrinkB=6))
ax.annotate("Median of the last\n12 auctions", xy=(pd.Timestamp("2012-06-01"), d.set_index("auction_date").trend.asof(pd.Timestamp("2012-06-01"))),
            xytext=(pd.Timestamp("2010-01-01"), 62), fontsize=10, color="#141414", va="center",
            arrowprops=dict(arrowstyle="-", color="#141414", lw=0.8))
ax.set_ylim(0, 70)
ax.yaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: f"{v:.0f}%"))
ax.set_ylabel("Share awarded to primary dealers")
ax.set_title("Dealers were barely needed at the September 30-year")
fig.savefig(f"{P}/chart.png", dpi=200, bbox_inches="tight")
print(len(d), round(last.dealer, 2))
