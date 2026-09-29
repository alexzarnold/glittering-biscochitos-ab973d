---
title: "What a covered call costs you in a year like this one"
summary: "Cboe's buy-write index trails the S&P 500 by 2.15 points so far in 2026. Ten years of option cycles show where that gap comes from, and why the payment for accepting it is now the smallest of the year."
date: 2026-09-28
pillar: options
author: Alex Arnold
---

## The takeaway

A covered call trades an uncertain right tail for a payment you receive up front. Cboe's BuyWrite Index, which does exactly this on the S&P 500 once a month, has returned 11.28% in 2026 against 13.43% for the S&P 500 price index, a shortfall of 2.15 points, and the true shortfall is wider because BXM includes dividends and the price series does not. Meanwhile VIX closed at 14.21 on September 22 2026, the lowest close of the year, which means the payment being offered for capping that upside is the thinnest it has been in 2026.

## The setup

The Cboe S&P 500 BuyWrite Index, ticker BXM, holds the S&P 500 portfolio and writes one at-the-money call against it each month, rolling on the third Friday. It is a mechanical rule published daily since 1986, and the cleanest public record of what writing index calls does to a return stream.

The 2026 numbers, all as of September 22 2026:

| Series | Dec 31 2025 | Sep 22 2026 | Return |
|--------|-------------|-------------|--------|
| BXM buy-write | 2299.94 | 2559.42 | +11.28% |
| S&P 500 (price) | 6845.50 | 7764.64 | +13.43% |

Sources: Cboe BXM daily history, FRED series SP500.

The right unit here is the option cycle, not the calendar month. BXM resets on the third Friday, so I measured both series third Friday to third Friday: 115 cycles from November 18 2016 to September 18 2026.

Over those 115 cycles the average BXM return was 0.74% against 1.26% for the index, with a standard deviation of 3.69 points against 5.32. Lower return, lower variability. That is the trade. But the average hides the shape, and the shape is the point:

- In the 17 cycles where the index gained more than 5%, it averaged +7.68% and BXM averaged +2.62%. The buy-write gave up 5.06 points.
- In the 32 cycles where the index fell, it averaged -4.19% and BXM averaged -2.31%. The buy-write picked up 1.88 points.
- In the worst cycle in the sample, the one rolling March 20 2020, the index fell 30.94% and BXM fell 28.79%. The cushion was 2.15 points against a 31% decline.

BXM beat the index in exactly half of the 115 cycles. It wins small and often, and loses large and rarely, which is a return pattern that flatters itself in short samples.

![Scatter plot of buy-write returns against S&P 500 returns over 115 monthly option cycles, with a dashed 45 degree reference line. The average response tracks the reference line closely when the index falls, then flattens into a shelf near plus 2 percent once the index gains more than about 2 percent.](chart.png "Figure 1. Writing calls bends the payoff. Binned averages over 115 option cycles. Sources: Cboe BXM daily history and FRED series SP500, as of Sep 22 2026.")

The flat shelf on the right side of the chart is the whole argument. Once the index gains more than about 2% in a cycle, the buy-write stops participating and settles near the premium it collected.

## The mechanism

Hold one unit of the index and write a call struck at $K$. At expiry the position is worth

$$
\min(S_T, K) + C
$$

where $C$ is the premium collected. Below the strike you own the index and keep $C$. Above it, every additional dollar of index gain is handed to the call buyer. The position is capped at $K + C$, and no amount of upside changes that. This is the shelf.

So the question is what $C$ is worth, because it is the entire compensation for giving up the tail. For an at-the-money option, Black-Scholes collapses to a useful approximation:

$$
C \approx \frac{1}{\sqrt{2\pi}} \, S \, \sigma \sqrt{T} \approx 0.4 \, S \, \sigma \sqrt{T}
$$

Premium scales with volatility and with the square root of time. Put today's numbers in, with $T = 1/12$ for a one-month option:

| Implied volatility | Date | ATM premium, one month |
|--------------------|------|------------------------|
| 14.21 | Sep 22 2026 close | 1.64% of the index |
| 18.31 | 2026 average to date | 2.11% |
| 31.05 | Mar 27 2026, the 2026 high | 3.59% |

VIX is a 30-day implied volatility measure on SPX options, so it stands in here for the volatility a one-month index call would be written at. Source: Cboe VIX daily history, as of September 22 2026.

The height of the shelf is not fixed. It is set by implied volatility on the day the call is written, and at 14.21 it sits roughly 22% lower than it would have at this year's average level and less than half where it sat in March. The cap arrives whether or not the market rallies.

One more detail: the premium is collected once per cycle, but the upside forgone is unbounded. In the cycle rolling April 17 2020 the index rose 24.71% and BXM rose 10.35%. No level of implied volatility at the start of that cycle would have made those two numbers match.

## Risks and what would change the view

The clearest thing that would change this picture is a flat or falling market. Everything above describes a concave payoff, and concavity is not a criticism. In the 32 down cycles the buy-write outperformed by 1.88 points on average, and if the next year looks like those cycles rather than like 2026, the gap closes and reverses. A post written in a drawdown would show the same chart and reach a friendlier conclusion about the same structure.

Two measurement caveats I would want checked before leaning on these numbers. First, BXM collects the index dividends and the FRED S&P 500 series does not, so the 2.15 point shortfall in 2026 understates the real gap and every cycle comparison above is mildly generous to the buy-write. Second, BXM writes at the money by rule. A call written further out of the money collects less premium and gives up less upside, so the shelf sits lower and further right, and none of the magnitudes here transfer directly to it.

The falsifiable claim is the shelf. VIX was 14.81 at the September 18 roll, which pays about 1.71% for the cycle now running. If volatility stays near there and the index keeps grinding higher, the next several cycles should show buy-write returns clustered near that figure regardless of how much the index gains. If they instead track the index upward, the mechanism described here is not what is driving these returns and the piece is wrong. We will know within three or four expirations, by the January 2027 roll.

Raw data and the chart script are in this post's folder. Retrieved September 22 2026.
