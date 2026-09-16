/* ============================================================================
   ORCA SITE SCRIPT
   ----------------------------------------------------------------------------
   Plain JavaScript. No libraries, no build step.

   Officers almost never need to touch this file. Meeting and team content
   lives in data.js. This file only decides how that content is drawn.

   What is in here:
     1. Mobile navigation toggle
     2. Scroll-triggered fade-ins (disabled if the visitor prefers less motion)
     2b. The diving orca on the home page
     3. Meeting helpers (parsing, sorting, upcoming vs past)
     4. The "next meeting" box used on Home and Meetings
     5. The full schedule on the Meetings page
     6. The Add to Calendar (.ics) download
     7. The Team page
   ============================================================================ */

(function () {
  "use strict";

  /* --------------------------------------------------------------------------
     Small helpers
     -------------------------------------------------------------------------- */
  function $(selector, root) { return (root || document).querySelector(selector); }
  function $$(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }

  // Escapes text before it goes into the page, so a stray < in someone's bio
  // can never break the layout.
  function esc(value) {
    return String(value === null || value === undefined ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  var FIN_SVG =
    '<svg class="fin" viewBox="0 0 356.89 301.73" aria-hidden="true" focusable="false">' +
    '<path class="fin-body" d="M 325,3.27 C 297.55,10.46 268.29,21.22 238.08,35.22 C 201.87,52.01 163.46,76.01 135.07,99.59 C 98.72,129.79 66.73,166.68 42.48,206.35 C 34.33,219.69 21.09,244.86 16.32,256.11 C 11.32,267.9 6.82e-13,298.56 7.96e-13,300.33 C 7.96e-13,301.28 3.86,299.17 10.75,294.45 C 59.41,261.1 116.23,238.68 173,230.43 C 213.97,224.47 252.85,227.6 284.72,239.42 C 303.72,246.47 325.9,259.27 340.75,271.76 C 344.74,275.12 348,277.46 348,276.96 C 348,276.46 346.14,273 343.87,269.26 C 337.83,259.32 330.6,242.73 325.04,226.03 C 316.52,200.51 313.52,180.82 313.64,151.35 C 313.79,113.53 318.99,86.67 338.55,22.53 C 344.13,4.24 344.33,1.96 340.45,0.47 Z"/>' +
    '<path class="fin-swoosh" d="M 185,252.48 C 183.63,252.68 178.45,253.34 173.5,253.94 C 140.06,257.99 100.58,270.12 67.51,286.5 C 52.16,294.1 49.97,295.76 59.65,292.47 C 100.37,278.62 171.54,269.53 214,272.76 C 265.71,276.69 295.53,282.75 355.49,301.51 C 359.35,302.72 355.01,298.95 345.07,292.45 C 313.22,271.62 274.84,258.09 234.14,253.33 C 222.95,252.02 191.91,251.49 185,252.48"/>' +
    "</svg>";

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* --------------------------------------------------------------------------
     1. MOBILE NAVIGATION
     -------------------------------------------------------------------------- */
  function initNav() {
    var toggle = $(".nav__toggle");
    var nav = $("#site-menu");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Close the menu when the visitor tabs or clicks away, or presses Escape.
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }


  /* --------------------------------------------------------------------------
     2. SCROLL FADE-INS
     -------------------------------------------------------------------------- */
  function initReveal() {
    var items = $$(".reveal");
    if (!items.length) return;

    // If the visitor asked for reduced motion, or the browser is old, just
    // show everything immediately.
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    items.forEach(function (el) { observer.observe(el); });
  }



  /* --------------------------------------------------------------------------
     THE DIVE
     The orca swims from the dark water at the top of the band down into the
     pale deep water below. Everything here is decoration. If it fails, the
     page is fine.

     The scene is one SVG whose viewBox is set to the band's real pixel size,
     so nothing is stretched. Two copies of the orca sit in the markup, one
     light and one dark, each clipped to its own side of the boundary. That is
     what makes the crossing seamless: mid-dive the animal is genuinely half
     light and half dark, and the halves line up exactly.
     -------------------------------------------------------------------------- */
  function initDive() {
    var dive = $(".dive");
    if (!dive) return;

    var scene = $(".dive__scene", dive);
    var orcas = $$(".dive__orca", dive);
    var shallow = $(".dive__shallow", dive);
    var deepPaths = $$(".dive__deep, .dive__haze", dive);
    var clipAbove = $(".dive__clip-above", dive);
    var clipBelow = $(".dive__clip-below", dive);
    if (!scene || !orcas.length) return;

    var w = 0, h = 0;

    // The boundary between the two depths, as fractions of the band. Change
    // these six pairs to reshape the wave.
    function wave() {
      return {
        a:  [0.00 * w, 0.50 * h],
        c1: [0.18 * w, 0.40 * h], c2: [0.34 * w, 0.40 * h], b: [0.50 * w, 0.50 * h],
        c3: [0.66 * w, 0.60 * h], c4: [0.82 * w, 0.62 * h], c: [1.00 * w, 0.54 * h]
      };
    }

    function n(v) { return Math.round(v * 10) / 10; }

    function measure() {
      var box = dive.getBoundingClientRect();
      if (Math.round(box.width) === w && Math.round(box.height) === h) return;
      w = Math.round(box.width);
      h = Math.round(box.height);
      if (!w || !h) return;

      scene.setAttribute("viewBox", "0 0 " + w + " " + h);
      if (shallow) { shallow.setAttribute("width", w); shallow.setAttribute("height", h); }

      var v = wave();
      var curve = "C" + n(v.c1[0]) + " " + n(v.c1[1]) + " " + n(v.c2[0]) + " " + n(v.c2[1]) +
                  " " + n(v.b[0]) + " " + n(v.b[1]) +
                  " C" + n(v.c3[0]) + " " + n(v.c3[1]) + " " + n(v.c4[0]) + " " + n(v.c4[1]) +
                  " " + n(v.c[0]) + " " + n(v.c[1]);

      var below = "M0 " + n(v.a[1]) + " " + curve + " L" + w + " " + h + " L0 " + h + " Z";
      var above = "M0 0 L" + w + " 0 L" + n(v.c[0]) + " " + n(v.c[1]) +
                  " C" + n(v.c4[0]) + " " + n(v.c4[1]) + " " + n(v.c3[0]) + " " + n(v.c3[1]) +
                  " " + n(v.b[0]) + " " + n(v.b[1]) +
                  " C" + n(v.c2[0]) + " " + n(v.c2[1]) + " " + n(v.c1[0]) + " " + n(v.c1[1]) +
                  " 0 " + n(v.a[1]) + " Z";

      deepPaths.forEach(function (el) { el.setAttribute("d", below); });
      if (clipBelow) clipBelow.setAttribute("d", below);
      if (clipAbove) clipAbove.setAttribute("d", above);
    }

    // Smooth acceleration in and out, so the swim eases rather than tracks
    // the scrollbar in a straight line.
    function smooth(t) { return t * t * (3 - 2 * t); }

    function place(p) {
      // Off-stage upper left to off-stage lower right.
      var x = w * (-0.16 + 1.32 * p);
      var y = h * (0.15 + 0.78 * smooth(p));

      // True tangent of that path, then a little exaggeration so the nose
      // reads as pointing downward rather than merely drifting.
      var dy = h * 0.78 * 6 * p * (1 - p);
      var dx = w * 1.32;
      var deg = Math.atan2(dy, dx) * 180 / Math.PI * 1.45;
      if (deg > 34) deg = 34;

      // The orca artwork is 1188.56 wide by 499.29 tall, drawn facing right.
      // Scale it to a share of the band width, then rotate about its middle.
      var size = Math.max(150, Math.min(360, w * 0.24));
      var scale = size / 1188.56;

      var t = "translate(" + n(x) + " " + n(y) + ") rotate(" + deg.toFixed(2) + ") " +
              "scale(" + scale.toFixed(5) + ") translate(-594.3 -249.6)";
      orcas.forEach(function (el) { el.setAttribute("transform", t); });
    }

    var queued = false;

    function frame() {
      queued = false;
      measure();
      if (!w || !h) return;

      var box = dive.getBoundingClientRect();
      var viewH = window.innerHeight || document.documentElement.clientHeight;

      // 0 when the band is just below the fold, 1 once it has passed the top.
      var p = (viewH - box.top) / (viewH + box.height);
      if (p < 0) p = 0;
      if (p > 1) p = 1;

      place(p);
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(frame);
    }

    // Reduced motion: draw the scene once, mid-dive, and leave it alone.
    if (prefersReducedMotion) {
      measure();
      place(0.5);
      window.addEventListener("resize", function () { measure(); place(0.5); });
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    frame();
  }

  /* --------------------------------------------------------------------------
     3. MEETING HELPERS
     -------------------------------------------------------------------------- */

  // Builds a real Date from "2026-09-03" and "18:30" in the visitor's own
  // clock. Built by hand rather than with new Date("2026-09-03") because that
  // form is read as UTC and can show the wrong day in Colorado.
  function toDate(dateStr, timeStr) {
    var d = String(dateStr || "").split("-");
    var t = String(timeStr || "00:00").split(":");
    if (d.length !== 3) return null;
    var out = new Date(
      Number(d[0]), Number(d[1]) - 1, Number(d[2]),
      Number(t[0]) || 0, Number(t[1]) || 0, 0, 0
    );
    return isNaN(out.getTime()) ? null : out;
  }

  function meetingsSorted() {
    if (typeof MEETINGS === "undefined" || !Array.isArray(MEETINGS)) return [];
    return MEETINGS
      .filter(function (m) { return m && toDate(m.date, m.time); })
      .slice()
      .sort(function (a, b) { return toDate(a.date, a.time) - toDate(b.date, b.time); });
  }

  function isPast(meeting) {
    var end = toDate(meeting.date, meeting.endTime || meeting.time);
    if (!end) return false;
    // Treat a meeting as past only once its end time has gone by.
    if (!meeting.endTime) end.setHours(end.getHours() + 1);
    return end.getTime() < Date.now();
  }

  function nextMeeting(typeFilter) {
    var list = meetingsSorted().filter(function (m) { return !isPast(m); });
    if (typeFilter) {
      var matched = list.filter(function (m) { return m.type === typeFilter; });
      if (matched.length) return matched[0];
    }
    return list.length ? list[0] : null;
  }

  function formatDate(meeting) {
    var d = toDate(meeting.date, meeting.time);
    if (!d) return "";
    return d.toLocaleDateString("en-US", {
      weekday: "long", month: "long", day: "numeric"
    });
  }

  function formatTime(meeting) {
    var start = toDate(meeting.date, meeting.time);
    if (!start) return "";
    var opts = { hour: "numeric", minute: "2-digit" };
    var text = start.toLocaleTimeString("en-US", opts);
    if (meeting.endTime) {
      var end = toDate(meeting.date, meeting.endTime);
      if (end) text += " to " + end.toLocaleTimeString("en-US", opts);
    }
    return text;
  }


  /* --------------------------------------------------------------------------
     4. THE "NEXT MEETING" BOX
     Used on Home and at the top of Meetings.
     -------------------------------------------------------------------------- */
  function renderNextMeeting() {
    var mounts = $$("[data-next-meeting]");
    if (!mounts.length) return;

    var meeting = nextMeeting("General");

    mounts.forEach(function (mount) {
      var isLight = mount.getAttribute("data-next-meeting") === "light";
      var boxClass = "callout" + (isLight ? " callout--light" : "");

      if (!meeting) {
        // No schedule has been entered yet. Show the placeholder details
        // rather than an empty box, so the page never looks broken.
        mount.innerHTML =
          '<div class="' + boxClass + '">' +
            '<dl>' +
              '<div><dt>Next general meeting</dt><dd>Wednesday, September 16, 6:30 to 7:30 PM</dd></div>' +
              '<div><dt>Where</dt><dd>KOBL 320</dd></div>' +
              '<div><dt>Who can come</dt><dd>Anyone. No sign-up.</dd></div>' +
            '</dl>' +
            '<p class="tiny" style="margin:1.25rem 0 0">' +
              '<a class="link" href="join.html">Join the mailing list</a> for the full schedule.' +
            '</p>' +
          '</div>';
        return;
      }

      mount.innerHTML =
        '<div class="' + boxClass + '">' +
          '<dl>' +
            '<div><dt>Next ' + esc(meeting.type.toLowerCase()) + ' meeting</dt>' +
              '<dd>' + esc(formatDate(meeting)) + ', ' + esc(formatTime(meeting)) + '</dd></div>' +
            '<div><dt>Where</dt><dd>' + esc(meeting.location || "[[BUILDING_ROOM]]") + '</dd></div>' +
            '<div><dt>Who can come</dt><dd>Anyone. No sign-up.</dd></div>' +
          '</dl>' +
        '</div>';
    });
  }


  /* --------------------------------------------------------------------------
     5. THE FULL SCHEDULE (Meetings page)
     -------------------------------------------------------------------------- */
  function meetingItemHTML(meeting, state) {
    var classes = "timeline__item" + (state ? " " + state : "");

    return '<li class="' + classes + '">' +
      '<span class="timeline__date">' + esc(formatDate(meeting)) + '</span>' +
      '<p class="timeline__meta">' +
        '<span>' + esc(formatTime(meeting)) + '</span>' +
        '<span>' + esc(meeting.location || "[[BUILDING_ROOM]]") + '</span>' +
      '</p>' +
      (meeting.note ? '<p class="tiny text-muted" style="margin:.5rem 0 0">' + esc(meeting.note) + '</p>' : "") +
    '</li>';
  }

  function renderSchedule() {
    var upcomingMount = $("[data-schedule-upcoming]");
    var pastMount = $("[data-schedule-past]");
    if (!upcomingMount && !pastMount) return;

    var all = meetingsSorted();
    var upcoming = all.filter(function (m) { return !isPast(m); });
    var past = all.filter(isPast).reverse();

    if (upcomingMount) {
      if (!upcoming.length) {
        upcomingMount.innerHTML =
          '<div class="empty-state">' + FIN_SVG +
            '<h3>Not posted yet</h3>' +
            '<p>First meeting: [[MEETING_DAY_TIME]] in [[BUILDING_ROOM]].</p>' +
            '<p><a class="link" href="join.html">Join the mailing list</a> for the rest.</p>' +
          '</div>';
      } else {
        upcomingMount.innerHTML = '<ul class="timeline">' +
          upcoming.map(function (m, i) {
            return meetingItemHTML(m, i === 0 ? "is-next" : "");
          }).join("") + '</ul>';
      }
    }

    if (pastMount) {
      var pastSection = pastMount.closest("[data-past-section]") || pastMount;
      if (!past.length) {
        // Nothing has happened yet. Hide the whole section rather than showing
        // an empty heading.
        pastSection.hidden = true;
      } else {
        pastSection.hidden = false;
        pastMount.innerHTML = '<ul class="timeline">' +
          past.map(function (m) { return meetingItemHTML(m, "is-past"); }).join("") + '</ul>';
      }
    }
  }


  /* --------------------------------------------------------------------------
     6. ADD TO CALENDAR
     Builds an .ics file in the browser and downloads it. No server involved.
     -------------------------------------------------------------------------- */
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  // Local ("floating") timestamp, used for the meeting itself.
  function icsStamp(date) {
    return date.getFullYear() +
      pad2(date.getMonth() + 1) +
      pad2(date.getDate()) + "T" +
      pad2(date.getHours()) +
      pad2(date.getMinutes()) + "00";
  }

  // True UTC timestamp, required for DTSTAMP.
  function icsStampUTC(date) {
    return date.getUTCFullYear() +
      pad2(date.getUTCMonth() + 1) +
      pad2(date.getUTCDate()) + "T" +
      pad2(date.getUTCHours()) +
      pad2(date.getUTCMinutes()) +
      pad2(date.getUTCSeconds()) + "Z";
  }

  // The calendar format wants lines of 75 characters or fewer, with any
  // continuation indented by a single space.
  function icsFold(line) {
    if (line.length <= 74) return line;
    var out = line.slice(0, 74);
    var rest = line.slice(74);
    while (rest.length > 73) {
      out += "\r\n " + rest.slice(0, 73);
      rest = rest.slice(73);
    }
    return out + "\r\n " + rest;
  }

  function icsEscape(text) {
    return String(text || "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r?\n/g, "\\n");
  }

  function buildICS(meeting) {
    var start = toDate(meeting.date, meeting.time);
    var end = toDate(meeting.date, meeting.endTime || meeting.time);
    if (!meeting.endTime) end.setHours(end.getHours() + 1);

    // Times are written without a Z, which the calendar standard reads as
    // "whatever local time the person is in". That is what we want for a
    // meeting in a room in Boulder.
    var lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ORCA CU Boulder//Meeting//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:" + meeting.date + "-" + String(meeting.time).replace(":", "") + "-orca@cuboulder",
      "DTSTAMP:" + icsStampUTC(new Date()),
      "DTSTART:" + icsStamp(start),
      "DTEND:" + icsStamp(end),
      "SUMMARY:" + icsEscape("ORCA " + meeting.type + " Meeting: " + (meeting.topic || "")),
      "LOCATION:" + icsEscape(meeting.location || "[[BUILDING_ROOM]]"),
      "DESCRIPTION:" + icsEscape(
        (meeting.note ? meeting.note + " " : "") +
        "Options, Risk, and Capital Association at CU Boulder."
      ),
      "END:VEVENT",
      "END:VCALENDAR"
    ];
    return lines.map(icsFold).join("\r\n");
  }

  function initCalendarButton() {
    var button = $("[data-add-to-calendar]");
    if (!button) return;

    var meeting = nextMeeting();
    if (!meeting) {
      // Nothing to add yet. Remove the button instead of leaving a dead one.
      var holder = button.closest("[data-calendar-holder]") || button;
      holder.hidden = true;
      return;
    }

    var label = $("[data-calendar-label]");
    if (label) label.textContent = formatDate(meeting) + ", " + formatTime(meeting);

    button.addEventListener("click", function () {
      var blob = new Blob([buildICS(meeting)], { type: "text/calendar;charset=utf-8" });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.href = url;
      link.download = "orca-meeting-" + meeting.date + ".ics";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    });
  }


  /* --------------------------------------------------------------------------
     7. TEAM PAGE
     -------------------------------------------------------------------------- */

  function initials(name) {
    var clean = String(name || "").replace(/\[\[.*?\]\]/g, "").trim();
    if (!clean) return "";
    var parts = clean.split(/\s+/).filter(Boolean);
    return parts.slice(0, 2).map(function (p) { return p.charAt(0).toUpperCase(); }).join("");
  }

  function avatarHTML(person) {
    if (person.photo) {
      return '<div class="person__avatar">' +
        '<img src="' + esc(person.photo) + '" alt="' + esc(person.name) + '" width="480" height="480">' +
      '</div>';
    }
    // No photo: a dark tile with the person's initials and a gold rule. If the
    // name is still a placeholder, fall back to the fin mark so the tile never
    // looks broken.
    var mono = initials(person.name);
    var inner = mono
      ? '<span class="person__initials" aria-hidden="true">' + esc(mono) + '</span>'
      : FIN_SVG;
    return '<div class="person__avatar" role="img" aria-label="' +
      (mono ? esc(person.name) : "Portrait not yet added") + '">' + inner + '</div>';
  }

  function renderTeam() {
    var mount = $("[data-team]");
    if (!mount) return;

    var board = (typeof TEAM !== "undefined" && Array.isArray(TEAM)) ? TEAM : [];
    if (!board.length) {
      mount.innerHTML =
        '<div class="empty-state">' + FIN_SVG +
          '<h3>Being confirmed</h3>' +
          '<p><a class="link" href="mailto:orca@colorado.edu">orca@colorado.edu</a></p>' +
        '</div>';
      return;
    }

    mount.innerHTML = '<div class="team-grid">' + board.map(function (person) {
      return '<article class="person reveal">' +
        avatarHTML(person) +
        '<h3>' + esc(person.name) + '</h3>' +
        '<p class="person__role">' + esc(person.role) + '</p>' +
      '</article>';
    }).join("") + '</div>';

    // Newly inserted cards need to be picked up by the fade-in observer.
    initReveal();
  }



  /* --------------------------------------------------------------------------
     FORMSPREE SUBMIT
     Sends the sign-up form in the background so the visitor never leaves the
     page. If anything goes wrong, or if JavaScript is switched off entirely,
     the form still posts the ordinary way and Formspree shows its own
     confirmation. Nothing is lost either way.
     -------------------------------------------------------------------------- */
  function initFormspree() {
    var form = $("[data-formspree]");
    if (!form || !window.fetch || !window.FormData) return;

    var button = $("[data-form-submit]", form);
    var errorBox = $("[data-form-error]");
    var doneBox = $("[data-form-done]");

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (errorBox) errorBox.hidden = true;
      if (button) {
        button.disabled = true;
        button.textContent = "Sending...";
      }

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (response) {
        if (!response.ok) throw new Error("Formspree returned " + response.status);

        if (doneBox) {
          form.hidden = true;
          // Hide the intro text above the form as well, so only the
          // confirmation is left in the card.
          var card = form.closest(".form-card");
          if (card) {
            $$("h2, p", card).forEach(function (el) {
              if (!doneBox.contains(el)) el.hidden = true;
            });
          }
          doneBox.hidden = false;
          doneBox.setAttribute("tabindex", "-1");
          doneBox.focus();
        } else {
          window.location.href = "thanks.html";
        }
      }).catch(function () {
        if (button) {
          button.disabled = false;
          button.textContent = "Sign me up";
        }
        if (errorBox) {
          errorBox.textContent =
            "That did not send. Check your connection and try again, or email orca@colorado.edu.";
          errorBox.hidden = false;
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     START EVERYTHING
     -------------------------------------------------------------------------- */
  function start() {
    initNav();
    initDive();
    renderNextMeeting();
    renderSchedule();
    initCalendarButton();
    renderTeam();
    initFormspree();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
