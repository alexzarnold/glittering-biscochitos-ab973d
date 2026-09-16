/* ============================================================================
   ORCA SITE DATA
   ----------------------------------------------------------------------------
   THIS IS THE ONLY FILE MOST OFFICERS WILL EVER NEED TO EDIT.

   Two lists:
     1. MEETINGS - the Meetings page and the "next meeting" box on Home
     2. TEAM     - the Team page

   HOW TO EDIT
   -----------
   1. Open this file in any plain text editor, or edit it on github.com by
      clicking the pencil icon.
   2. Copy an existing block, paste it, change the values.
   3. Save. Nothing to install, build, or compile.

   THE RULES (break one and the page goes blank)
   ---------------------------------------------
   - Every block starts with {  and ends with },
   - Every line inside a block ends with a comma, except the last one.
   - Text goes inside "double quotes".
   - Do not delete the [ ] brackets or the closing ];

   If a page goes blank after an edit, you missed a comma or a quote. Undo,
   save, try again.
   ============================================================================ */


/* ============================================================================
   1. MEETINGS
   ----------------------------------------------------------------------------
     date      "YYYY-MM-DD"  September 3rd 2026 is "2026-09-03".
     time      "HH:MM"       24-hour clock. 6:30 PM is "18:30".
     endTime   "HH:MM"       Used for the Add to Calendar file.
     type      "General" or "Analyst" or "Exec"   (spelling matters)
     topic     "..."         Short title.
     location  "..."         Building and room.
     note      "..."         Optional. Use "" for none.

   The site sorts past from upcoming on its own. You never need to delete old
   meetings. Leaving them in shows new members what we actually cover.

   Copy an existing block below, edit its values, and add as many meetings as
   you like.
   ============================================================================ */

const MEETINGS = [
  {
    date: "2026-09-16",
    time: "18:30",
    endTime: "19:30",
    type: "General",
    topic: "General Meeting #1",
    location: "KOBL 320",
    note: ""
  },
  {
    date: "2026-09-30",
    time: "18:30",
    endTime: "19:30",
    type: "General",
    topic: "General Meeting #2",
    location: "KOBL 320",
    note: ""
  },
  {
    date: "2026-10-14",
    time: "18:30",
    endTime: "19:30",
    type: "General",
    topic: "General Meeting #3",
    location: "KOBL 320",
    note: ""
  },
  {
    date: "2026-10-28",
    time: "18:30",
    endTime: "19:30",
    type: "General",
    topic: "General Meeting #4",
    location: "KOBL 320",
    note: ""
  },
  {
    date: "2026-11-11",
    time: "18:30",
    endTime: "19:30",
    type: "General",
    topic: "General Meeting #5",
    location: "KOBL 320",
    note: ""
  },
  {
    date: "2026-12-02",
    time: "18:30",
    endTime: "19:30",
    type: "General",
    topic: "General Meeting #6",
    location: "KOBL 320",
    note: ""
  }
];


/* ============================================================================
   2. TEAM
   ----------------------------------------------------------------------------
     name   "..."   Full name.
     role   "..."   "President", "Vice President", or "Treasurer".
     photo  "..."   File in the assets folder, e.g. "assets/alex-arnold.jpg".
                    Use "" for no photo.

   NO PHOTO IS FINE. With photo set to "", the site draws a dark tile with the
   person's initials and a gold rule. That is part of the design, not a missing
   image.

   DO NOT PAD THIS LIST. Three real people beats six invented ones.
   ============================================================================ */

const TEAM = [
  { name: "Alex Arnold",   role: "President",      photo: "" },
  { name: "Breeana Tran",  role: "Vice President", photo: "" },
  { name: "David Plam",    role: "Treasurer",      photo: "" }
];
