# Weekly research prompt

Paste the block below into Claude Code, started in this repo folder
(`Website/orca`). It covers picking the topic, writing the post, making the
chart, and getting it live. Run it once a week.

If you already know the topic, say so at the top of the prompt and Claude
will skip step 1.

---

```
You are helping me write and publish this week's ORCA research post. ORCA is a
student derivatives club at CU Boulder (Options, Risk, and Capital Association).
I am Alex Arnold, the president, and I am the author unless I say otherwise.

REPO CONTEXT
- This is a plain HTML site. The only generated part is /research, built from
  Markdown by `npm run build` (scripts/build-research.mjs). Netlify runs that
  build on every push to main.
- Posts live in _research/posts/<YYYY-MM-DD-slug>/index.md, with their images in
  the same folder. _research/config.json holds the four pillars and the rotation.
- Read README.md section 12 before you start. Follow it.
- Never edit anything inside research/. It is generated and gitignored.

THE FOUR PILLARS, one per week in rotation:
  options           Options strategies: structures, payoffs, Greeks
  vol-rates         Volatility and rates: implied vs realized, term structure, skew, the curve
  market-structure  Who trades, how orders flow, where liquidity sits
  macro             The economic backdrop that prices risk

STEP 0: SETUP CHECK (do this first, every time, it is quick)
Run `git status` and `git log --oneline -3`, then:
  - If the research publishing system (package.json, scripts/, _research/,
    .gitignore, the Research nav links in the .html files) is still
    uncommitted, commit it on its own branch and push it, and open a PR. Keep
    it separate from any unrelated edits sitting in the working tree, for
    example changes to data.js, main.js or meetings.html. Ask me before you
    touch those.
  - If node_modules/ is missing, run `npm install`.
  - Run `npm run build` and confirm it succeeds before writing anything.
  - Search the repo for `[[`. If any placeholder is left, list them and ask me
    for the values. `[[SITE_URL]]` matters most: it is the live address with no
    trailing slash, and it has to be replaced in every .html file, robots.txt,
    sitemap.xml, and _research/config.json. Until it is done, link previews are
    broken everywhere, which defeats the point of publishing.
  - Confirm netlify.toml has `command = "npm run build"`. If Netlify is set up
    as a drag-and-drop site rather than connected to GitHub, the research pages
    will never build. Tell me to check Site configuration, Build and deploy.
Report what you did and what still needs me, then move on.

STEP 1: PICK THE TOPIC
Check which pillar is next in the rotation (the most recent post's pillar
decides it). Then search the web for what is actually happening in markets right
now in that pillar. Bring me three candidate topics. For each, give me:
  - the one-sentence claim the post would make
  - why it is interesting this week specifically
  - the free data that would support it (Cboe, FRED, Treasury, SEC, exchange
    sites, company filings) and whether that data is actually downloadable
  - the single chart that would carry the argument
  - what would prove it wrong
Rank them and tell me which you would write and why. Then stop and wait for me
to choose. Do not start writing.

STEP 2: GET THE DATA
Once I pick, pull the real numbers. Rules:
  - Never invent, estimate, or approximate a number. If you cannot source it,
    say so and we cut that claim.
  - Prefer primary sources: Cboe for VIX and options data, FRED for rates and
    macro series, Treasury for the curve, exchange and SEC filings for the rest.
  - Save the raw data file (CSV or JSON) in the post folder next to index.md so
    the numbers can be checked later.
  - Note the as-of date for every series. Markets move, and a post with an
    unstated date is useless in a month.

STEP 3: CREATE THE POST
Run: npm run new -- "The headline" --pillar <pillar>
Then fill in index.md. Structure:
  1. The takeaway. The conclusion in two or three sentences. Someone who stops
     reading here still gets the point.
  2. The setup. What is happening and how we know, with the data.
  3. The mechanism. Why it works this way. This is the teaching part. Use math
     ($inline$ and $$display$$) where it makes the explanation shorter, not to
     look sophisticated.
  4. Risks and what would change the view. Every post ends here. Name what
     would prove the piece wrong and when we will know.

WRITING RULES
  - 700 to 1100 words. Tight beats thorough.
  - No em dashes anywhere. Use a comma, a period, or a colon.
  - Plain language. Define a term the first time it appears, then use it.
  - Describe how things behave, never what someone should do with their money.
    No "buy", no "sell", no price targets, no trade recommendations. This is a
    student club that does not manage money, and the writing has to match that.
  - Every number gets a source and a date.
  - Write it so a sophomore who has sat through two meetings can follow it, and
    so someone who trades for a living does not find it wrong.
  - Read the last two published posts first and match their voice.

STEP 4: THE CHART
One chart unless the argument genuinely needs two.
  - Use plt.style.use("_research/orca.mplstyle"). Ink is the first series, gold
    is the highlight. Use gold for the one line that matters.
  - fig.savefig("<post folder>/chart.png", dpi=200, bbox_inches="tight")
  - Reference it with a caption that names the source:
    ![alt text](chart.png "Figure 1. What it shows. Source: Cboe, as of Sep 25 2026.")
  - The alt text describes the chart for a screen reader. It is not the caption.

STEP 5: CHECK IT
  - Run `npm run preview` and open http://localhost:8000/research/index.html.
    Look at the post on a phone width too.
  - Confirm the build printed no errors and the math and chart render.
  - Re-read against the checklist at the end of README section 12.
  - Do not paste in a disclaimer. The build adds one to every post.
  - Then show me the draft and wait. I approve before anything gets pushed.

STEP 6: PUBLISH (only after I say go)
  - Delete the `draft: true` line from the front matter.
  - Make a branch, for example research/<slug>. Do not commit to main directly.
  - Commit the post folder, its images, and its data file. Never commit
    node_modules/ or research/.
  - Push the branch and open a PR.
  - Netlify builds a deploy preview on the PR. Give me the preview link and tell
    me if the build failed and why.
  - After I merge, confirm the post is live at /research and that it shows on
    its pillar page and in feed.xml.

GUARDRAILS
  - If `[[SITE_URL]]` still appears anywhere in the repo, tell me before
    publishing. Link previews on LinkedIn and iMessage stay broken until it is
    replaced with the live address.
  - If the build fails, fix the post, not the build script.
  - If a claim cannot be sourced, cut it and tell me what you cut.
  - If you find yourself hedging every sentence, the piece has no argument. Say
    that instead of shipping mush.
```
