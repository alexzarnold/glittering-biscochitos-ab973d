---
title: "Options priced Jackson Hole like any other day"
summary: "The night before Chair Warsh spoke, S&P 500 options priced a 0.61% move, cheaper than an ordinary day in 2026. Stocks moved 0.25%. The two-year yield moved 14 basis points. What an event's implied move is, how to read it, and why being right about an event is not the same as being right about your underlying."
date: 2026-08-31
pillar: options
author: Alex Arnold
---

## The takeaway

The night before Fed Chair Kevin Warsh's Jackson Hole speech, short-dated S&P 500 options priced an average move of about 0.61% for the day, and priced the event week *below* their own 2026 norm. The S&P 500 moved 0.25%. The options were right about stocks. The speech still mattered, but the risk showed up in rates, where the two-year Treasury yield jumped 14 basis points, the largest Jackson Hole-day move in the ten years covered here.

## The setup

VIX9D is Cboe's measure of the implied volatility of S&P 500 options over the next nine calendar days. Implied volatility is the annualized size of moves that option prices are paying for. On August 27, the close before the speech, VIX9D was 12.10 and the 30-day VIX was 14.51 (Cboe, as of August 27 2026).

Two things stand out.

First, the level. Converted to a single day, 12.10 implies an average move of about 0.61% (the math is below). In 2026 through August 28, the S&P 500 moved more than 0.61% on 39% of trading days, and its median daily move was 0.52% (FRED series SP500). So the options priced Jackson Hole as a fairly ordinary day.

Second, the shape. The ratio of VIX9D to VIX was 0.83. Its average in 2026 through August 28 was 0.906. When a known event sits inside the next nine days, short-dated volatility usually rises relative to 30-day volatility. Here it sat below its normal level. There was no visible event premium at all.

That was a choice, not a default. On most days options overprice the move: across every trading day from 2017 through August 28 2026, the average actual S&P 500 move was 0.82 times the move VIX9D priced the night before. Jackson Hole has run the other way. On the chair's speech day in 2017 through 2025, the actual move averaged 1.46 times the priced move, and beat it in six of nine years.

![Dot plot of the ten Fed chair Jackson Hole speech days from 2017 to 2026. For each year, a hollow marker shows the S&P 500 move priced the night before by VIX9D and a filled marker shows the actual size of the move. Actual moves exceeded the priced move in 2019, 2022, 2024 and 2025 by wide margins. In 2026 the priced move was the lowest since 2018 and the actual move was smaller still.](chart.png "Figure 1. Priced versus actual S&P 500 moves on Jackson Hole speech days. Speech dates from federalreserve.gov. Sources: Cboe VIX9D, FRED SP500, as of Aug 28 2026.")

Then the speech. Warsh gave no guidance on the September meeting, but he was blunt about inflation: "Inflation is running above our 2 percent target. So the Fed's predominant focus right now should be on prices." And: "We must be confident that underlying inflation is moving to our objective, clearly and at sufficient speed. Otherwise, we have work to do." The S&P 500 fell 0.25% on the day. The two-year yield went from 4.20% to 4.34% (FRED series DGS2).

## The mechanism

An at-the-money straddle is a call and a put at the same strike, the current price. It pays off on the size of the move in either direction, so its price is the market's estimate of the average absolute move. If returns were normally distributed with volatility $\sigma$, that is

$$
\text{straddle} \approx \sqrt{\tfrac{2}{\pi}} \, \sigma \sqrt{T} \, S \approx 0.8 \, \sigma \sqrt{T} \, S
$$

For one trading day, $T = 1/252$. With $\sigma = 12.10\%$, that gives $0.798 \times 12.10\% \times 0.063 \approx 0.61\%$, or about 47 points on the S&P 500 at its August 27 close of 7,730.99.

The event premium comes from the fact that variance adds up across days. Suppose the nine-day window holds $n$ trading days and one of them is an event day expected to be $m$ times as volatile as a normal day. Then

$$
\sigma_{9d}^2 \propto \frac{(n-1) + m^2}{n}
$$

The window from August 28 held six trading days. If traders had expected the speech day to swing twice as much as a normal day, $m = 2$, VIX9D would have been $\sqrt{9/6} \approx 1.22$ times its no-event level. Instead the ratio to VIX was below its 2026 average. The market priced $m$ close to 1.

Why does this matter for anyone holding options? Because a long straddle's daily profit, before costs, is roughly

$$
\text{P\&L} \approx \tfrac{1}{2} \, \Gamma \, S^2 \left( \sigma_{\text{realized}}^2 - \sigma_{\text{implied}}^2 \right) \Delta t
$$

Gamma, $\Gamma$, is how fast the option's delta changes as the underlying moves. The straddle holder earns from realized moves and pays for implied ones through time decay. History said Jackson Hole was a day to expect realized to beat implied. In 2026, that expectation was right about the macro significance and wrong about the S&P 500. The shock went through the rate market and did not come through in stock prices on the day.

The lesson for the structure is simple. An option is a claim on one underlying. Being right that an event matters is not the same as being right that it moves the thing you own options on.

## Risks and what would change the view

**Ten observations is a small sample.** The 1.46 ratio on past Jackson Hole days rests on nine data points, two of which (2019 and 2022) do most of the work. On August 23 2019 the S&P 500 also reacted to a same-day escalation in the U.S. and China trade dispute, so not all of that move belongs to the speech.

**The conversion is approximate.** VIX9D is built from a strip of options including out-of-the-money puts, so it runs above the implied volatility of an at-the-money straddle. The true straddle price was probably a little below 0.61%. The normal-distribution factor also understates how often large moves happen. Both errors run in the same direction, which makes the options look cheaper still, and the point stands.

**The next test is September 16.** The Fed's September decision now carries real hike risk. If short-dated options again price it below their normal level and the S&P 500 moves more than the priced amount, the pattern is not "Jackson Hole was dull this year" but "equity options keep underpricing Fed events." If stocks shrug again while rates move, this post's reading holds: the risk in this cycle is running through the rate market.
