---
title: "Oil is up 67% and long-run inflation expectations barely moved"
summary: "The 10-year Treasury yield is up 60 basis points this year. Only 10 of those came from higher inflation expectations. Splitting a nominal yield into its real and inflation parts shows the bond market treating the oil shock as temporary, and the Fed as the thing to worry about."
date: 2026-09-07
pillar: vol-rates
author: Alex Arnold
---

## The takeaway

Brent crude is up 67% since the start of the year, and the 10-year Treasury yield is up 60 basis points. It is tempting to connect the two. The data does not support it. Of those 60 basis points, 50 came from the real yield and only 10 from inflation compensation. Near-term inflation pricing rose and fell with oil. The market's measure of inflation five to ten years out ended roughly where it started. The bond market is not pricing a lasting inflation problem. It is pricing a Fed that will lean against one.

## The setup

Every nominal Treasury yield can be split into two parts using Treasury Inflation-Protected Securities, or TIPS. A TIPS bond's principal rises with the consumer price index, so its yield is a *real* yield: what you earn after inflation. The gap between a nominal yield and the TIPS yield of the same maturity is called the breakeven. It is the inflation rate at which the two bonds would end up paying the same.

Here is 2026 so far, all from FRED:

| | Dec 31 2025 | Sep 4 2026 | Change |
|---|---|---|---|
| 10-year nominal yield (DGS10) | 4.18 | 4.78 | +60 bp |
| 10-year real yield (DFII10) | 1.93 | 2.43 | +50 bp |
| 10-year breakeven (T10YIE) | 2.25 | 2.35 | +10 bp |
| 5-year breakeven (T5YIE) | 2.26 | 2.37 | +11 bp |
| 5y5y forward breakeven (T5YIFR) | 2.24 | 2.33 | +9 bp |
| Brent crude, $ per barrel | 61.35 | 102.24 | +67% |

The endpoints undersell how different the path was. Brent peaked at \$138.21 on April 7. Around then, the 5-year breakeven, which covers the next five years, was near its highs and went on to peak at 2.72% on May 4. The 5y5y forward, which covers years six through ten, did the opposite. It fell to 2.05% on March 30, its 2026 low, right as oil was surging.

Daily moves tell the same story. In 2026 through September 4, the correlation between daily changes in Brent and daily changes in the 5-year breakeven was 0.62. For the 5y5y forward it was 0.18.

![Line chart of three 2026 series: the 5-year breakeven, which rises through spring alongside oil and falls back in June; the 5y5y forward breakeven, which stays in a narrow band between about 2.05 and 2.35 percent all year; and the 10-year real yield, which climbs from about 1.9 percent in January to 2.43 percent by September. A dashed line marks the Brent peak on April 7.](chart.png "Figure 1. Near-term inflation pricing chased oil. The long run did not. Source: FRED (DFII10, T5YIE, T5YIFR, DCOILBRENTEU), as of Sep 4 2026.")

Meanwhile the real yield climbed steadily. The 10-year real yield of 2.43% on September 4 is close to its highest level since October 2023.

## The mechanism

The split is an identity. FRED computes the breakeven directly as the difference:

$$
y^{\text{nominal}} = y^{\text{real}} + \text{breakeven}
$$

So a 60 basis point rise in the nominal yield has to be divided between the two terms. The only question is which one moved.

The 5y5y forward comes from comparing two maturities. If the 10-year breakeven is an average over ten years and the 5-year breakeven is the average over the first five, the second five years must make up the difference:

$$
\pi_{5y5y} \approx \frac{10 \, \pi_{10} - 5 \, \pi_{5}}{5} = \frac{10(2.35) - 5(2.37)}{5} = 2.33\%
$$

Why would these two pieces react so differently to oil? TIPS are indexed to headline CPI, which includes gasoline and heating fuel. An oil spike feeds into headline inflation over the next year or so, and a 5-year TIPS collects all of that. By years six through ten, the spike is long gone unless it has changed how wages and prices get set, or changed the market's view of whether the Fed will allow it. A 5y5y forward that stays flat is the market saying neither has happened.

The March drop in the 5y5y is worth a second look. One reading is that traders saw the oil shock as a hit to growth that would eventually pull inflation down. Another is that they expected the Fed to respond hard enough to keep long-run inflation in check. Breakevens alone cannot tell those apart. But the rest of the curve leans toward the second: the 2-year yield rose 90 basis points over the same period, from 3.47% to 4.37%, which is the market pricing a tighter Fed, not a weaker economy.

That is where the 50 basis points of real yield come from. When investors expect the Fed to hold rates higher for longer, and they believe inflation will stay near target, the extra yield shows up as real return, not inflation compensation. For anything valued off long-term rates, from mortgages to growth stocks, a higher real yield is the tighter financial condition. This is the part of the move that matters.

## Risks and what would change the view

**Breakevens are not pure expectations.** They also carry an inflation risk premium, which pushes them up when inflation is uncertain, and a liquidity premium, which pushes them down because TIPS trade less easily than nominal Treasuries. If an oil shock raised the risk premium while expectations actually fell, the 5y5y could look calm while the underlying picture was worse. The two effects cannot be separated with these series.

**The anchor could slip.** The 10-year breakeven has ranged between 2.18% and 2.50% this year. A 5y5y forward that breaks above 2.5% and holds would mean the long end has started to price a lasting problem, and this reading would be wrong.

**Two dates will test it soon.** August CPI is released on September 11, and the Fed decides on September 16. A hot CPI print that lifts the 5y5y, not just the 5-year breakeven, would be the first sign that the market is losing confidence in the Fed. A hike that pushes real yields higher while the 5y5y stays put would confirm the pattern described here.
