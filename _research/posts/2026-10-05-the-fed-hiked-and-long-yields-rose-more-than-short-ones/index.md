---
title: "The Fed hiked and long yields rose more than short ones"
summary: "After a rate hike the yield curve usually flattens. Since the September 16 hike it has steepened, by more than after all but one of the 51 hikes since 1994. About half the move in the 10-year is term premium, now at its highest since 2010."
date: 2026-10-05
pillar: vol-rates
author: Alex Arnold
---

## The takeaway

When the Fed raises rates, short-term yields usually rise more than long-term ones and the yield curve flattens. Not this time. From the close before the September 16 hike to October 2, the 10-year yield rose 28 basis points and the 2-year 16, so the gap between them widened by 12. Of the 51 hikes from 1994 through 2023, only one was followed by more steepening over the same stretch. A standard model splits the 10-year's move roughly in half: half from higher expected policy rates, half from term premium, the extra yield investors demand for holding long bonds. Term premium is now at its highest level since April 2010.

## The setup

The yield curve is the line connecting Treasury yields at different maturities. Its slope is usually summarized as the 10-year yield minus the 2-year, called 2s10s. All figures are from FRED, from the close on September 15, the day before the decision, to October 2 2026:

| | Sep 15 | Oct 2 | Change |
|---|---|---|---|
| 3-month bill | 4.11 | 4.19 | +8 bp |
| 2-year | 4.67 | 4.83 | +16 bp |
| 10-year | 5.00 | 5.28 | +28 bp |
| 30-year | 5.36 | 5.63 | +27 bp |
| 10-year real yield (TIPS) | 2.62 | 2.92 | +30 bp |
| 10-year breakeven | 2.38 | 2.36 | -2 bp |
| 2s10s | 33 bp | 45 bp | +12 bp |

The 10-year and 30-year closed within a basis point of their highest levels since 2002, set on September 30.

The bottom three rows matter most. The entire rise in the 10-year came through the real yield. Inflation compensation went slightly down. The market is not saying the hike will fail to contain inflation. It is demanding more real return to hold long bonds.

To see how unusual the steepening is, I lined up every Fed rate increase since 1994, 51 of them through July 2023, and measured how 2s10s moved over the 13 trading days after each decision, the same length as this episode. The median change was -5 basis points. The curve steepened after only 11 of the 51 hikes, and only once by more than this time: after July 26 2023, when it steepened 21 basis points.

![Line chart showing the change in the 10-year minus 2-year Treasury spread over the 13 trading days after each of 51 Fed rate hikes from 1994 to 2023, drawn as thin gray lines, with their median in black ending at minus 5 basis points. The September 16 2026 hike is highlighted in gold: it flattens to about minus 13 basis points in the first four days, then steepens to plus 12 basis points by day 13, above nearly every gray line.](chart.png "Figure 1. Change in the 2s10s spread after each Fed rate hike. Hike dates from the Fed's target series. Source: FRED (DGS2, DGS10, DFEDTAR, DFEDTARU), as of Oct 2 2026.")

The path matters too. For four days the curve did what it usually does, flattening as the 2-year jumped. Then the long end took over.

## The mechanism

Any long-term yield can be split into two parts:

$$
y_{10} = \underbrace{\text{average expected short rate over 10 years}}_{\text{expectations}} + \underbrace{\text{term premium}}_{\text{compensation for duration risk}}
$$

The first part is what investors think overnight rates will average over the life of the bond. The second is what they demand on top for locking money up for ten years instead of rolling it short, which exposes them to the risk that rates or inflation turn out different from expected.

A hike the market believes in usually flattens the curve because it acts mostly on the first part, and mostly at the short end. Rates go up now, inflation expectations come down later, and the long end rises less than the short end or even falls.

Neither part can be observed directly, so the split has to come from a model. The Federal Reserve Board publishes one, the Kim-Wright model, on FRED. It works with a fitted 10-year zero-coupon yield, which differs slightly from the quoted 10-year yield above:

| Kim-Wright, 10-year | Sep 15 | Oct 2 | Change |
|---|---|---|---|
| Fitted yield | 5.01 | 5.26 | +24 bp |
| Expected short rates | 4.05 | 4.17 | +12 bp |
| Term premium | 0.96 | 1.08 | +12 bp |

Source: FRED (THREEFY10, THREEFYTP10), as of October 2 2026. Expected short rates are the fitted yield minus the term premium.

So the model attributes the 10-year's move half to a higher expected path for policy and half to term premium. Over 2026 as a whole the split is the same: the fitted yield is up 101 basis points since December 31, with 50 from expectations and 51 from term premium, which has gone from 0.57% to 1.08%.

What pushes term premium up? The usual candidates are more uncertainty about where rates and inflation are headed, more long-term debt for the market to absorb, and bonds becoming a worse hedge when they and stocks fall together. A Fed that has just started hiking in the middle of an oil shock adds to the first. The model can say how big the term premium is. It cannot say which of these is driving it.

## Risks and what would change the view

**The split is a model estimate.** Kim-Wright is one of several term premium models, and they disagree on levels, sometimes by a lot. The direction of the move is more reliable than the exact 50-50 split.

**Term premium can reverse fast.** The closest analogue is the one hike that steepened the curve more, in July 2023. Over the following weeks Kim-Wright's term premium rose from 0.11% on July 25 to 0.66% on October 19, as the 10-year climbed from 3.91% to 4.98%. By December 29 term premium was back to 0.09% and the 10-year to 3.88%. A surge in term premium is not a trend until it holds.

**Inflation data could settle it.** The minutes of the September meeting are due this week and September CPI the week after. A cool CPI print that pulls long yields down and flattens the curve would mean this episode was about uncertainty that the data then resolved. A hot print that pushes the 10-year breakeven up, not just the real yield, would mean the market has started to doubt the Fed, which is a different and worse story than the one told here.
