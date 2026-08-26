# Placeholders

Every `[[LIKE_THIS]]` marker in the codebase, where it lives, and what to put
there instead. Work top to bottom and the site is done.

**How to replace them.** Open the folder in a plain text editor that can search
across files (VS Code, Sublime Text, Notepad++, or the search box on
github.com). Search for the marker exactly as written, including both pairs of
square brackets, and replace every occurrence. Do not leave the brackets in.

**Check your work.** When you think you are finished, search the whole folder
for `[[` . If nothing comes back, every placeholder has been replaced.

**Already filled in for you.** Club email (`orca@colorado.edu`), the BuffConnect
link, the three board members, and the nondiscrimination statement are all in
place. The statement is copied word for word from Article II, Section I.B of the
governing document and verified character for character against the source.

---

## Do these first (the site looks broken without them)

### `[[SITE_URL]]`
**Where:** every `.html` file (5 times each), `robots.txt`, `sitemap.xml`
**Replace with:** the full live address of the site with no trailing slash, for
example `https://cuorca.netlify.app` or `https://orcacu.org`
**Why it matters:** this is what makes the link preview image appear when
somebody pastes the site into a message or a story. A relative path does not
work for that. Do this as soon as your host gives you a URL.

### `[[MEETING_DAY_TIME]]`
**Where:** `index.html`, `meetings.html`, `contact.html`, `main.js`
**Replace with:** a plain-language day and time, for example
`Wednesdays at 6:30 PM`
**Note:** this is the fallback shown before you enter a real schedule in
`data.js`. Once `data.js` has meetings in it, the site shows the real next
meeting instead and this text stops appearing on the home page.

### `[[BUILDING_ROOM]]`
**Where:** `index.html`, `meetings.html`, `contact.html`, `data.js`, `main.js`
**Replace with:** the building and room, for example `Koelbel Building, Room 220`

---

## Content you have to supply

### `[[DUES_POLICY]]`
**Where:** `join.html`, once, as the answer to "Are there dues?"
**Replace with:** a direct answer.
If there are no dues, something like: *No. Membership is free and there is
nothing to pay to attend meetings.*
If there are dues, say the amount, what it covers, and what happens if somebody
cannot pay.
**This was left blank on purpose.** The current governing document does not
mention dues at all. An earlier draft said *"There are no membership fees."* If
that is still true, say so here. It is a strong recruiting line and worth
stating plainly. But it should be your call, not an assumption carried over from
a superseded draft.

This is the last placeholder with any real thinking behind it. The other three
are just details you have and I did not.

---

## Files you need to add (not placeholders, but the site expects them)

### `assets/ORCA-Bylaws.pdf` (already included)
Generated from `ORCA_Bylaws_Black_Gold_Refined_UPDATED.docx`, which is the
version this site's copy was written against. The link at the very foot of the
About page points at it, and that is the only place on the site it appears. If
the document is amended, regenerate this file (Word: File, then Save As, then
PDF) and keep the same file name. If you would rather not publish it at all,
delete the last section of `about.html` rather than leaving a dead link.

### Logo files (already included, nothing to do)
The logos in `assets` are a vector trace of the official ORCA artwork pulled
from the club's own governing document, so they match exactly. Ink samples at
`#252525` and gold at `#CAAD5F`. Nothing here needs replacing. If the club ever
rebrands, swap `assets/orca-wordmark-light.svg` and the header, hero, and footer
all follow. See section 6b of the README.

### Officer photos (optional)
Put them in the `assets` folder and reference them in `data.js`, for example
`photo: "assets/jane-doe.jpg"`. Square images work best. **No photo is
completely fine.** The site draws a dark tile with the person's initials and a
gold rule instead, which is a deliberate part of the design.
