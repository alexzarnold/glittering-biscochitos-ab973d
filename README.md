# ORCA website

The website for the **Options, Risk, and Capital Association** at the
University of Colorado Boulder.

Plain HTML, CSS, and JavaScript. No frameworks, no build step, no npm, no
terminal required. If you can edit a text file and drag a folder into a
browser window, you can run this site.

---

## Contents

1. [Before you touch anything](#1-before-you-touch-anything)
2. [Previewing the site on your own computer](#2-previewing-the-site-on-your-own-computer)
3. [Deploying to Netlify](#3-deploying-to-netlify)
4. [Updating the meeting schedule](#4-updating-the-meeting-schedule)
5. [Adding or changing a team member](#5-adding-or-changing-a-team-member)
6. [Changing the colors and fonts](#6-changing-the-colors-and-fonts)
6b. [The logo files](#6b-the-logo-files)
7. [Where form submissions go](#7-where-form-submissions-go)
8. [Editing page text](#8-editing-page-text)
9. [What is in each file](#9-what-is-in-each-file)
10. [Handing the site to next year's board](#10-handing-the-site-to-next-years-board)
10b. [The diving orca](#10b-the-diving-orca)
11. [When something breaks](#11-when-something-breaks)

---

## 1. Before you touch anything

Read **PLACEHOLDERS.md** first. The site ships with markers like
`[[CLUB_EMAIL]]` everywhere real details need to go. That file lists every one
of them, which files it appears in, and what to replace it with.

Nothing else in this README will make much sense until those are filled in.

---

## 2. Previewing the site on your own computer

**The easy way.** Double-click `index.html`. It opens in your browser and
everything works, including the meeting schedule and the team page. You can
keep the file open in a text editor, save, and refresh the browser to see
changes.

That is genuinely all most people will ever need.

**The slightly better way**, if you happen to have Python installed (Macs do by
default). Open Terminal, move to this folder, and run:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser. The only practical
difference is that the contact and sign-up forms behave a little more like they
will on the live site.

---

## 3. Deploying to Netlify

Netlify hosts this for free. There are two ways to do it. Pick one and stick
with it, because mixing them causes confusion later.

### Option A: drag and drop (easiest, fine for a small club)

1. Go to [app.netlify.com](https://app.netlify.com) and sign in.
2. Click **Add new site**, then **Deploy manually**.
3. Drag this entire folder onto the drop area. Drag the folder itself, not the
   files inside it.
4. Wait about twenty seconds. Netlify gives you a URL like
   `https://cheerful-pastry-a1b2c3.netlify.app`.
5. Go to **Site configuration**, then **Change site name**, and pick something
   sensible like `cuorca`. Your URL becomes `https://cuorca.netlify.app`.
6. Go back and replace `[[SITE_URL]]` everywhere with that address, then
   re-upload. This is what makes the link preview image work.

To publish a change later, edit the files and drag the folder in again. Netlify
replaces the whole site each time.

**Downside:** there is no history. If you drag in a broken version, the good
version is gone unless you kept a copy. Keep a zipped backup before big edits.

### Option B: connect it to GitHub (better for handover)

1. Create a free GitHub account if the club does not have one. Use the club
   email so the account survives graduations.
2. Create a new repository, for example `orca-website`. Upload these files to
   it through the GitHub website (**Add file**, then **Upload files**). No
   terminal needed.
3. In Netlify, click **Add new site**, then **Import an existing project**, and
   pick your repository.
4. When Netlify asks for build settings, leave the build command **empty** and
   set the publish directory to `.` (a single dot). The included
   `netlify.toml` already says this, so the defaults should be correct.
5. Click deploy.

From then on, every edit you save on github.com publishes to the live site
within about a minute. You get a full history, so a bad edit can be undone.

**This is the option to choose if you want the site to survive handover.**

---

## 4. Updating the meeting schedule

Open **`data.js`**. Find the `MEETINGS` list near the top.

Each meeting is one block that looks like this:

```js
{
  date: "2026-09-03",
  time: "18:30",
  endTime: "19:30",
  type: "General",
  topic: "What an option actually is",
  location: "Koelbel Building, Room 220",
  note: "First meeting of the semester. No experience needed."
},
```

Copy a block, paste it below, and change the values. The rules:

- `date` is year, month, day with dashes. September 3rd 2026 is `"2026-09-03"`.
- `time` and `endTime` use the 24-hour clock. 6:30 PM is `"18:30"`.
- `type` must be exactly `"General"`, `"Analyst"`, or `"Exec"`. Spelling matters.
- `note` can be empty. Write `""` for none.
- Every line ends with a comma except the last one inside each block.
- Every block ends with `},` except the last one, which ends with `}`.

**You never need to delete old meetings.** The site works out which are in the
past on its own and moves them to a de-emphasized section at the bottom of the
Meetings page. Leaving them in place shows new members what the club actually
covers.

The home page next-meeting box, the Meetings page schedule, and the **Add to
calendar** button all read from this one list.

---

## 5. Adding or changing a team member

Open **`data.js`**. Find the `TEAM` list.

```js
const TEAM = [
  { name: "Alex Arnold",   role: "President",      photo: "" },
  { name: "Breeana Tran",  role: "Vice President", photo: "" },
  { name: "David Plam",    role: "Treasurer",      photo: "" }
];
```

- `role` should be `"President"`, `"Vice President"`, or `"Treasurer"`.
- `photo` can be `""`. **This is fine.** With no photo the site draws a dark
  tile with the person's initials and a gold rule under it. That is part of the
  design, not a missing image. Do not delay updating the page because nobody
  has a headshot.
- To use a photo, put the image in the `assets` folder and write
  `photo: "assets/alex-arnold.jpg"`. Square images look best.

The Team page shows names and roles only, on purpose. Adding a `bio` field to
this list will not display anything unless you also change `renderTeam` in
`main.js`.

**Do not add people who are not on the board to make the grid look fuller.**

---

## 6. Changing the colors and fonts

Open **`styles.css`**. The first block of the file looks like this:

```css
:root {
  --ink:        #141414;  /* dominant near-black */
  --paper:      #FAF9F7;  /* off-white page background */
  --gold:       #CAAD5F;  /* sampled from the logo file. Exact. */
  --gold-ink:   #816928;  /* same hue, darkened so gold TEXT passes WCAG AA on light */
  ...
  --font-display: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Inter", -apple-system, ..., sans-serif;
}
```

Change a value there and it updates everywhere on every page. You do not need
to read the rest of the file.

**Two things to know before you change the gold.**

First, there are two golds on purpose. `--gold` is the bright logo gold and is
only used on dark backgrounds and for decorative rules. `--gold-ink` is a
darker version used for gold *text on light backgrounds*, because the bright
gold on off-white is unreadable and fails accessibility requirements. If you
change one, change the other to match.

Second, gold is deliberately not a button fill or a background anywhere in this
design. It is for underlines, thin rules, small-caps labels, and hover states.
Filling large areas with it makes the site look like a wedding invitation. This
is a suggestion, not a law, but it is a good suggestion.

**Changing the fonts.** Two families, no more. If you swap them, update both
the `--font-display` and `--font-sans` values in `styles.css` **and** the Google
Fonts `<link>` tag in the `<head>` of every `.html` file, or the new fonts will
not load.

---

## 6b. The logo files

Every logo on the site is a vector trace of the official ORCA artwork, taken
straight from the club's own bylaws document. It is not a lookalike drawn from
scratch. The exact colors sampled out of that file are:

- Ink: `#252525`
- Gold: `#CAAD5F`

There are five files in `assets`, and the site uses three of them:

| File | Where it is used |
|---|---|
| `orca-wordmark-light.svg` | Header, hero, and footer. Light ink for dark backgrounds. |
| `orca-fin.svg` | The fin motif. Also drawn inline in the pages so it can pick up the current text color. |
| `favicon.svg` | Browser tab icon, generated from the same fin. |
| `orca-logo.svg` | The full lockup with the tagline, dark ink. Not used on the site. Here for flyers, slides, and anywhere you need it on white. |
| `orca-logo-light.svg` | The full lockup with the tagline, light ink, for dark backgrounds. |

**To swap in different artwork**, replace `orca-wordmark-light.svg` and the
header, hero, and footer all update at once. Keep the same file name and roughly
the same proportions (the current file is about 4.2 times wider than it is tall).

**Why the hero does not use the full lockup.** The tagline baked into the
artwork becomes about 7 pixels tall on a phone, which is unreadable. So the hero
uses the wordmark and sets the tagline as real text underneath, which scales
properly and can be read by a screen reader. The full lockup is still in the
folder if you want it for print.

---

## 7. Where form submissions go

The sign-up form on the Join page posts to **Formspree**, form ID `xwledllo`.
Responses appear at [formspree.io](https://formspree.io) under that form, and
Formspree emails a copy to whichever address owns the account.

Two things worth knowing.

**Check who owns the Formspree account.** If it is a personal address, move it
to the club address before handover, or next year's board will have no way to
see who signed up. This is the single easiest thing to forget.

**To point the form somewhere else**, open `join.html`, find the line that
starts `<form class="form" id="signup-form"`, and change the `action` value to
your Formspree endpoint. Nothing else needs to change.

The form works two ways on purpose. With JavaScript on, `main.js` sends it in
the background and swaps a thank-you message into the card without leaving the
page. With JavaScript off, the browser posts it the ordinary way and Formspree
shows its own confirmation. Either way the response lands.

Formspree's free tier has a monthly submission cap. If the club outgrows it,
the fix is a paid plan or a Google Form; there is no code change needed for the
latter beyond swapping the form block for an iframe.

## 8. Editing page text

Every page is a plain `.html` file you can open in a text editor. The text sits
between the tags. Change the words between `>` and `<` and leave the tags
alone.

Two things are duplicated on every page on purpose: the **site header** (the
navigation bar) and the **site footer**. Each is wrapped in a comment saying
`KEEP THIS IDENTICAL ACROSS ALL PAGES`.

Yes, this means changing a navigation link involves editing ten files. That
was a deliberate trade. The alternative, injecting the nav with JavaScript,
fails silently and confusingly when something goes wrong, and it makes the
pages harder to read for anybody learning. Copying a block nine times is
tedious but it cannot break in a way you would not immediately see.

The ten files are: `index.html`, `about.html`, `meetings.html`, `team.html`,
`join.html`, `resources.html`, `contact.html`, `legal.html`, `404.html`,
`thanks.html`.

One line inside the nav does differ per page: `aria-current="page"` marks which
page you are on so it can be highlighted. Keep it on the right link.

---

## 9. What is in each file

```
index.html        Home
about.html        Purpose, structure, standards, nondiscrimination, PDF link
meetings.html     Cadence, semester schedule, what a first meeting is like
team.html         Executive board
join.html         Sign-up form, analyst path, FAQ. The most important page.
resources.html    Placeholder. Reading lists and slides go here later.
contact.html      Email and BuffConnect
legal.html        Affiliation, disclaimers, privacy, accessibility
thanks.html       Fallback confirmation page
404.html          Shown when somebody hits a URL that does not exist

styles.css        All styling. Palette and type scale at the very top.
data.js           Meetings, team, analysts. The file officers actually edit.
main.js           Menu, fade-ins, the diving orca, schedule rendering,
                  calendar download, form submission.

netlify.toml      Netlify settings. You should not need to touch this.
robots.txt        Tells search engines they may index the site.
sitemap.xml       Lists the pages for search engines.

assets/
  favicon.svg     The little icon in the browser tab
  favicon-32.png  Fallback icon for older browsers
  favicon-180.png Icon used when somebody saves the site to a phone home screen
  favicon-512.png Large icon
  og-image.png    The 1200x630 preview image shown when a link is shared
  orca-logo.svg   Full logo lockup, dark ink, for light backgrounds
  orca-logo-light.svg       Full lockup, light ink, for dark backgrounds
  orca-wordmark.svg         ORCA + fin only, no tagline, dark ink
  orca-wordmark-light.svg   ORCA + fin only, light ink. Used in the header,
                            the hero, and the footer.
  orca-fin.svg    The dorsal fin mark on its own, for reuse elsewhere
  ORCA-Bylaws.pdf The governing document, linked at the foot of the About page
```

**About `data.js` needing JavaScript.** The Meetings and Team pages are drawn by
a script that reads `data.js`. If a visitor has JavaScript switched off, those
two pages show a message pointing them to the mailing list instead of a schedule.

That was a conscious trade-off. Handing the site to a new board every year
matters more here than supporting the very small number of people browsing with
scripts disabled, and one clearly commented data file is far easier for a new
officer than editing schedule markup by hand in two places. Every other page on
the site works with JavaScript off.

---

## 10. Handing the site to next year's board

Do these five things before you graduate. It takes about twenty minutes and it
is the difference between the site surviving and quietly dying.

1. **Move the accounts to a club email, not yours.** The Netlify account, the
   GitHub account, and the domain if you bought one should all be registered to
   the club address, and the password should be in whatever the club uses to
   pass credentials along. A site nobody can log into is a dead site.

2. **Add the incoming board as collaborators.** In Netlify: **Site
   configuration**, then **Members**. In GitHub: **Settings**, then
   **Collaborators**. Do this before the handover meeting, not after.

3. **Update `data.js`.** New board in `TEAM`, empty out `ANALYSTS` if the cohort
   is changing, and clear the old semester's meetings or leave them as history.

4. **Check the Formspree account.** Make sure it is registered to the club
   address, not a graduating officer's, and that somebody is reading the
   notification emails. Also confirm the BuffConnect link still resolves.

5. **Walk the new board through this file.** Sit with them, open `data.js`, and
   have them add one meeting and save it while you watch. Fifteen minutes of
   this beats any document, including this one.

Two smaller things worth passing on: the nondiscrimination statement in
`about.html` has to match Article II of the bylaws word for word, and if the
bylaws are amended the site copy about structure and the analyst path should be
checked against the new version.

---

## 10b. The diving orca

The band between the hero and the section below it on the home page is a
scroll-linked animation. As it passes through the viewport, an orca swims out
of the dark water at the top and down into the pale deep water below.

**Why the crossing has no seam.** The same orca is drawn twice, once light and
once dark, and each copy is clipped to one side of the boundary. Whatever part
of the animal is in dark water renders light, and whatever part is in pale water
renders dark. Mid-dive it is genuinely half and half, and the two halves line up
exactly, so it reads as one continuous animal crossing a boundary rather than
two shapes fading into each other.

The orca artwork is a vector trace of the reference illustration, 1188.56 wide
by 499.29 tall, facing right. The saddle patch and eye patch are a separate path
so they can shift tone with the body.

It lives in three places: the `<div class="dive">` block near the top of
`index.html`, the `THE DIVE` section of `styles.css`, and `initDive()` in
`main.js`.

**To tune the swim**, edit these lines in `initDive()`:

```js
var x = w * (-0.16 + 1.32 * p);   // how far left and right it travels
var y = h * (0.15 + 0.78 * smooth(p));  // 0.15 = start depth, 0.78 = how far it dives
var deg = Math.atan2(dy, dx) * 180 / Math.PI * 1.45;  // 1.45 exaggerates the nose angle
var size = Math.max(150, Math.min(360, w * 0.24));    // how big the orca is
```

**To reshape the boundary**, edit the six pairs in the `wave()` function. They
are fractions of the band's width and height, so they hold at any screen size.

**To change the band height**, edit `.dive { height: ... }` in `styles.css`.
**To change the two water colors**, edit `.dive__shallow` and `.dive__deep`.

**To remove it entirely**, delete the `<div class="dive">` block from
`index.html`. Nothing else breaks; the rest of the page does not depend on it.

It holds still for anyone whose system asks for reduced motion, it draws a
sensible static scene if JavaScript never loads, and it is hidden from screen
readers.

---

## 10c. The legal page

`legal.html` carries four things the club needs in writing, and it is linked
from the bottom bar of every page.

1. **Not the university.** CU Boulder's own policy says an approved mark "does
   not constitute any type of endorsement" and that a student organization
   "shall not hold itself out as acting on behalf of CU Boulder." This section
   says exactly that.
2. **Not investment advice.** Educational only, no money managed or pooled, no
   return claims. This is what keeps a club that discusses derivatives clearly
   outside investment-adviser territory.
3. **Privacy.** What the sign-up form collects, that Formspree processes it,
   that nothing is sold or shared, and how to be deleted.
4. **Accessibility.** A statement plus a contact address, which is what an
   accessibility statement is actually for.

**Two things will make this page wrong, so watch for them:**

- **If ORCA ever pools or manages real money**, the disclaimer section becomes
  false and the club's legal position changes materially. Stop and get advice
  before publishing anything that says otherwise.
- **If the club starts using CU logos**, that has to go through CU Boulder's
  Visual Identity Manager first, and the affiliation section should be checked
  against whatever the approval says.

Update the "Last updated" date at the foot of the page whenever you change it.

---

## 11. When something breaks

**A page has gone blank.** You almost certainly broke `data.js`. A missing
comma or an unclosed quote stops the whole file. Undo your last change, save,
reload. If you are on GitHub, use the file's history to revert to the last
working version.

**A meeting is not showing up.** Check the `date` format. It must be
`"2026-09-03"`, with a four-digit year, dashes, and quotes. Also check that the
meeting is not in the past, in which case it has moved to the bottom section of
the Meetings page as designed.

**The link preview image is not appearing.** `[[SITE_URL]]` has not been
replaced, or it was replaced with a trailing slash. It needs to be the full
address with no slash on the end. Note that messaging apps cache previews
aggressively, so a link you already shared may keep showing the old preview for
a while.

**Form submissions are not arriving.** Log in to Formspree and check the form
`xwledllo` directly, then check that the notification email address on the
account is one somebody actually reads. Unlike the rest of the site, the form
does work when you preview locally by double-clicking `index.html`, because it
posts straight to Formspree.

**The orca is not moving.** Either the visitor's system is set to reduce
motion, which is deliberate and leaves it parked mid-dive, or `main.js` failed
to load. Check the browser console.

**Fonts look wrong.** The site loads Cormorant Garamond and Inter from Google
Fonts. If the network is blocked or slow, it falls back to Georgia and your
system sans-serif. The layout will hold; it just looks less like the brand.

**Everything looks unstyled.** `styles.css` is missing or was renamed. It has
to sit next to the HTML files with exactly that name.
