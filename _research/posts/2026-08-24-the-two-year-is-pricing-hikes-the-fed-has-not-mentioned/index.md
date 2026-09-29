---
title: "The two-year is pricing hikes the Fed has not mentioned"
summary: "The Fed has held at 3.50 to 3.75% all year and said nothing about raising rates. The two-year yield sits 61 basis points above the funds rate anyway. Here is how to read what that spread is saying, and how much of it to believe."
date: 2026-08-24
pillar: macro
author: Alex Arnold
---

## The takeaway

The Federal Reserve has held its target range at 3.50 to 3.75% since December and has not signaled a hike. The Treasury market has moved without it. The two-year yield closed at 4.24% on August 21 2026, 61 basis points above the effective fed funds rate, and the 3-month bill has closed above the top of the Fed's range on every trading day since June 1. Going into Jackson Hole, the bond market's working assumption is that the next move is up, not down.

## The setup

Some context on how fast this turned. The Fed cut three times between September and December 2025, landing at 3.50 to 3.75%. As late as February 27 2026, the two-year yield was 3.38%, 26 basis points *below* the effective funds rate of 3.64%. A two-year yield under the policy rate is the market saying it expects more cuts.

Then oil moved. Brent crude went from \$61.35 a barrel at the end of 2025 to above \$100 by mid-March, and peaked at \$138.21 on April 7 (FRED series DCOILBRENTEU). The two-year crossed above the funds rate on March 12 and has not closed below it since. It has held there even as Brent came back down to \$96.92 by August 21.

The whole front of the curve shifted up while the policy rate did not:

| Maturity | Dec 31 2025 | Aug 21 2026 | Change |
|----------|-------------|-------------|--------|
| Fed funds target (upper) | 3.75 | 3.75 | 0 bp |
| Effective fed funds | 3.64 | 3.63 | -1 bp |
| 3-month bill | 3.67 | 3.88 | +21 bp |
| 6-month bill | 3.59 | 3.95 | +36 bp |
| 1-year | 3.48 | 4.03 | +55 bp |
| 2-year | 3.47 | 4.24 | +77 bp |

Sources: Federal Reserve and Treasury via FRED (DFEDTARU, DFF, DGS3MO, DGS6MO, DGS1, DGS2), as of August 21 2026.

The pattern in the change column is the tell. The further out the maturity, the more it rose. That is what a market looks like when it is pricing a policy path that goes up over time, rather than reacting to something happening today.

![Line chart of 2026 short-term Treasury yields against the Fed funds target range. The 3-month, 1-year and 2-year yields start the year inside or below the shaded 3.50 to 3.75 percent band, then rise above it from March onward, with the 2-year highest at 4.24 percent by August 21.](chart.png "Figure 1. Short rates moved up while the Fed stood still. Sources: Federal Reserve and U.S. Treasury via FRED, as of Aug 21 2026.")

## The mechanism

Why should a two-year note care about what the Fed might do next spring? Because owning a two-year note and rolling overnight cash for two years are close substitutes. If the note paid much less than the expected return from rolling cash at the policy rate, nobody would hold it. So, to a first approximation:

$$
y_2 \approx \text{average expected policy rate over two years} + \text{term premium}
$$

The term premium is the extra yield investors demand for locking money up rather than keeping it short. It is usually small at the two-year point, but not zero.

You can go further and pull out what the market implies for next year specifically. If the one-year yield is $y_1$ and the two-year is $y_2$, the one-year rate one year from now, called the forward rate, solves

$$
(1+y_2)^2 = (1+y_1)(1+f_{1,1})
$$

With $y_1 = 4.03\%$ and $y_2 = 4.24\%$:

$$
f_{1,1} = \frac{1.0424^2}{1.0403} - 1 \approx 4.45\%
$$

That is 82 basis points above today's effective funds rate of 3.63%, a bit more than three quarter-point hikes' worth, averaged over the year that starts in August 2027. The number is an upper bound on what is priced, not a forecast, because it still carries whatever term premium sits in the curve.

The 3-month bill tells the near-term version of the same story. A bill bought on August 21 matures in November, so it spans the Fed's September meeting. It yields 3.88%, above the 3.75% ceiling. There is a quoting wrinkle: Treasury yields use a 365-day year and fed funds a 360-day year. Put on the same basis, the bill yields about 3.83%, still above the ceiling. Money is being lent to the Treasury for three months at a rate the Fed does not currently allow overnight. That only makes sense if some of those three months are expected to happen at a higher policy rate.

The reason is not hard to find. July's consumer price index was up 3.30% from a year earlier, while core CPI, which strips out food and energy, was up 2.47% (Bureau of Labor Statistics via FRED). The gap between those two numbers is mostly oil. A central bank can usually wait out an energy spike, but it gets harder the longer headline inflation sits a full point above target. The bond market is betting the Fed's patience is running out.

## Risks and what would change the view

**The term premium could be doing more of the work than it looks.** An oil shock makes future inflation less certain, which is exactly the condition under which investors demand more to hold duration. If a large share of those 82 basis points is term premium, the market is pricing fewer hikes than the forward suggests. Treasury yields alone cannot separate the two. Fed funds futures could, but historical futures data is not freely downloadable, so this post does not claim a number for it.

**Bills trade on supply, not only policy.** Heavy bill issuance can push bill yields up with no change in rate expectations. The 3-month is supporting evidence here, not the case itself.

**Oil could reverse.** It already did once: Brent fell to \$70.46 by June 30 before climbing back. Another drop like that would pull headline inflation down, and the reason for pricing hikes would weaken.

**The Fed could push back directly.** Chair Kevin Warsh speaks at Jackson Hole this week. A clear signal of patience would pull the two-year back toward the funds rate. We will know for certain at the September meeting, which ends on the 16th. If the Fed holds and signals it will keep holding, and the two-year falls back below 4%, this reading was wrong.
