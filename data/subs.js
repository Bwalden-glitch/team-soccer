/* SUBS & ROTATION TAB DATA
   Source: "Indoor Team Training Plan & Sub System" (Max), Nov 2026.
   Set window.SUBS = null to show the "Coming soon" card instead.
   PRIVACY: numbered slots only, never names. P1..P7 = the 7 defender+attacker PAIRS,
   GK1 / GK2 = the two keepers. (Slots up to P16 work too if you switch to single players.)
   Any table cell made of slots ("P4", "P1, P2, P3", "GK1") is shown as colored chips.
   EDITING: each fact / step / table row is one entry; delete or copy lines to change.

   Shape (all optional except title):
     intro: "text"
     facts:  [ { label, value } ]
     steps:  [ { title, detail } ]
     notes:  [ "text" ]
     gantt:  { title, caption, total, halftime, ticks: [ ... ], rows: [ { label, on: [ [startMin, endMin], ... ] } ] }
     tables: [ { title, caption, columns: [ ... ], rows: [ [cell, cell, ...] ], note } ]
     sections: [ { title, body, bullets: [ ... ] } ]
*/
window.SUBS = {
  title: "Subs & Rotation",
  intro: "Recommended: 2 keepers who split halves, and 14 outfielders in 7 pairs. Each pair is 1 defender (D) and 1 attacker (A). 3 pairs are on at a time, and one pair changes every 3 minutes.",

  /* ---------- Key facts ---------- */
  facts: [
    { label: "Keepers",      value: "GK1 plays the 1st half, GK2 the 2nd: 25 min each. The off-half keeper is the spare for injuries or a tired kid." },
    { label: "On the field", value: "3 Ds play CB, CB, CM. 3 As play LM, RM, ST." },
    { label: "Shift",        value: "3 min, one pair at a time. Use 2 min if your league plays shorter halves or the pace is high." },
    { label: "Playing time", value: "Each outfield kid gets 20–22 min of the 50." },
    { label: "Why it works", value: "Every group on the field always has 3 defenders, so you're never caught with all attackers. Only 2 kids change at once, which keeps the shape." }
  ],

  /* ---------- How to run a change ---------- */
  steps: [
    { title: "At 2:30, call the next pair",  detail: "Helper says 'Pair 4, at the door.'" },
    { title: "Change on a good moment",      detail: "A dead ball or when the ball is in their half. Never while defending our box." },
    { title: "Like for like",                detail: "D replaces D, A replaces A, in the same spot." },
    { title: "Off before on",                detail: "Outgoing kid reaches the bench area before the new one steps on. Follow your league's change rule." },
    { title: "Helper runs the clock",        detail: "You coach; the helper holds this page and calls changes." }
  ],

  notes: [
    "Simpler fallback: 2 lines of 6 plus 2 floaters, a full line change every 4 min. Easier to run, but you lose control of the balance mid-game."
  ],

  /* ---------- On-field timeline (Gantt chart). Minutes 0-50 of the game; 25 = halftime.
     Each row = one pair; each [start, end] = a stretch on the field. Keep in sync with the tables below. ---------- */
  gantt: {
    title: "On-field timeline",
    caption: "Two 25-min halves, one pair changes every 3 min.",
    total: 50, halftime: 25, ticks: [0, 10, 20, 30, 40, 50],
    rows: [
      { label: "P1", on: [[0, 3], [15, 24], [31, 40]] },
      { label: "P2", on: [[0, 6], [18, 25], [34, 43]] },
      { label: "P3", on: [[0, 9], [21, 25], [37, 46]] },
      { label: "P4", on: [[3, 12], [24, 25], [28, 37], [49, 50]] },
      { label: "P5", on: [[6, 15], [25, 28], [40, 49]] },
      { label: "P6", on: [[9, 18], [25, 31], [43, 50]] },
      { label: "P7", on: [[12, 21], [25, 34], [46, 50]] }
    ]
  },

  /* ---------- Tables ---------- */
  tables: [
    { title: "1st half (GK1 in goal)",
      caption: "Two 25-min halves, one pair changes every 3 min.",
      columns: ["Time", "On field", "On", "Off"],
      rows: [
        ["0:00–3:00",   "P1, P2, P3", "Start", ""],
        ["3:00–6:00",   "P2, P3, P4", "P4", "P1"],
        ["6:00–9:00",   "P3, P4, P5", "P5", "P2"],
        ["9:00–12:00",  "P4, P5, P6", "P6", "P3"],
        ["12:00–15:00", "P5, P6, P7", "P7", "P4"],
        ["15:00–18:00", "P6, P7, P1", "P1", "P5"],
        ["18:00–21:00", "P7, P1, P2", "P2", "P6"],
        ["21:00–24:00", "P1, P2, P3", "P3", "P7"],
        ["24:00–25:00", "P2, P3, P4", "P4", "P1"]
      ] },

    { title: "2nd half (GK2 in goal)",
      columns: ["Time", "On field", "On", "Off"],
      rows: [
        ["0:00–3:00",   "P5, P6, P7", "Start", ""],
        ["3:00–6:00",   "P6, P7, P4", "P4", "P5"],
        ["6:00–9:00",   "P7, P4, P1", "P1", "P6"],
        ["9:00–12:00",  "P4, P1, P2", "P2", "P7"],
        ["12:00–15:00", "P1, P2, P3", "P3", "P4"],
        ["15:00–18:00", "P2, P3, P5", "P5", "P1"],
        ["18:00–21:00", "P3, P5, P6", "P6", "P2"],
        ["21:00–24:00", "P5, P6, P7", "P7", "P3"],
        ["24:00–25:00", "P6, P7, P4", "P4", "P5"]
      ] },

    { title: "Minutes per pair",
      columns: ["Pair", "1st half", "2nd half", "Total"],
      rows: [
        ["P1", "12", "9",  "21"],
        ["P2", "13", "9",  "22"],
        ["P3", "13", "9",  "22"],
        ["P4", "10", "10", "20"],
        ["P5", "9",  "12", "21"],
        ["P6", "9",  "13", "22"],
        ["P7", "9",  "13", "22"]
      ],
      note: "Next game, swap which pairs start each half so the 20-min spot moves around." },

    { title: "Fill-in template",
      caption: "Fill this in on paper or the coach's own notes, not in this public app.",
      columns: ["Pair", "Defender (D)", "Attacker (A)", "Note"],
      rows: [
        ["GK", "GK1: ______ (1st half)", "GK2: ______ (2nd half)", "Off-half GK = spare"],
        ["P1", "D: ______",              "A: ______ (top-3 A)",    ""],
        ["P2", "D: ______ (top-3 D)",    "A: ______",              ""],
        ["P3", "D: ______",              "A: ______ (top-3 A)",    ""],
        ["P4", "D: ______",              "A: ______",              "Middle D + middle A"],
        ["P5", "D: ______ (top-3 D)",    "A: ______",              ""],
        ["P6", "D: ______",              "A: ______ (top-3 A)",    ""],
        ["P7", "D: ______ (top-3 D)",    "A: ______",              ""]
      ] }
  ],

  sections: []
};
