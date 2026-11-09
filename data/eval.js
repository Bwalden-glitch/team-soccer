/* EVALUATION & DRILLS TAB DATA
   Source: "Indoor Team Training Plan & Sub System" (Max), Nov 2026.
   Set window.EVAL = null to show the "Coming soon" card instead.
   PRIVACY: never put names or scores for real kids in this public file. The score sheet below is a
   blank template; fill it in on paper or the coach's own notes.
   EDITING: each drill / rubric row / cue is one entry; delete or copy lines to change.

   Shape (all optional except title):
     evalIntro: "text"
     evalDrills: [ drill ]          drill = { id, title, setup, run, points: [ ... ], progression, active, diagram }  (diagram format: data/pitch.js)
     rubric:     { columns: [ ... ], rows: [ [trait, "1", "2", "3"] ] }
     scoreSheet: { columns: [ ... ], rows: [ [ ... ] ] }
     sorting:    [ { title, detail } ]
     aggressionWarning: "text"
     aggressionDrills: [ drill ]
     cues: [ "text" ]
     sections: [ { title, body, bullets: [ ... ] } ]
*/
window.EVAL = {
  title: "Evaluation & Drills",

  /* ---------- Player evaluation drills ---------- */
  evalIntro: "Run these over 1–2 practices. Every kid plays both roles. Your helper keeps the sheet.",
  evalDrills: [
    { id: "e1", title: "E1. 1v1 to goal (attack lens)",
      setup: "Two channels 10 yd wide, 20 yd long, small goal or keeper at the end. 8 kids per channel.",
      run: "Attacker gets the ball from the defender and goes 1v1 to score. Swap roles every rep.",
      points: ["Watch: do they attack the defender or turn away?", "Watch: first touch forward or stuck under their feet?", "Watch: good shot choice and finish?"],
      progression: "Defender starts closer, so there's less time to settle the ball.",
      active: "4 pairs per channel go in waves of 2, every 20 sec.",
      /* e1 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        zones: [[150, 50, 410, 100], [150, 250, 410, 100]],
        cones: [[560, 80], [560, 120], [560, 280], [560, 320]],
        dots: [dot(90, 100, "A3", "a"), dot(190, 100, "A1", "a"), dot(480, 110, "D1", "d"), dot(90, 300, "A4", "a"), dot(190, 300, "A2", "a"), dot(520, 300, "D2", "d")],
        balls: [[210, 120]],
        dribbles: [[212, 100, 420, 82]],
        runs: [[480, 110, 445, 100]],
        passes: [[520, 300, 190, 300]],
        notes: [{ x: 355, y: 205, t: "swap roles every rep" }],
      } },

    { id: "e2", title: "E2. 1v1 defending channel (defense lens)",
      setup: "Same channels. Defender serves a ball and has to stop the attacker from dribbling over the end line.",
      run: "Score defenders, not attackers. A stop = 1, a stop with the ball won = 2.",
      points: ["Watch: closes fast, then slows down and gets low?", "Watch: stays on feet, forces to one side?", "Watch: wins it clean or just delays?"],
      progression: "Add the wall: one channel against the boards to test reading rebounds.",
      active: "Same waves as E1; flip roles each rep.",
      /* e2 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        zones: [[150, 50, 410, 100], [150, 286, 410, 100]],
        cones: [[560, 55], [560, 145], [560, 292], [560, 378]],
        dots: [dot(200, 100, "A1", "a"), dot(520, 100, "D1", "d"), dot(220, 330, "A2", "a"), dot(470, 340, "D2", "d")],
        balls: [[220, 118], [240, 348]],
        dribbles: [[222, 100, 280, 112], [242, 332, 300, 360]],
        runs: [[520, 100, 335, 104], [470, 340, 335, 345]],
        notes: [{ x: 355, y: 210, t: "stop = 1, win it = 2" }, { x: 355, y: 240, t: "bottom channel uses the wall" }],
      } },

    { id: "e3", title: "E3. 2v1 / 3v2 rotations",
      setup: "Half field, goal + keeper. Groups of 3 rotate: 2 attack, 1 defends; then 3 attack, 2 defend.",
      run: "Every kid plays both roles. Defenders who win it go to a halfway gate.",
      points: ["Watch attack: passes at the right time, makes runs off the ball.", "Watch defense: delays the 2v1, tracks the runner, talks.", "Note who naturally drops back vs. goes forward."],
      progression: "Move from 2v1 to 3v2 to 4v3.",
      active: "Run both halves at once, reps take 15 sec.",
      /* e3 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        half: true, goals: "right",
        dots: [dot(665, 200, "GK", "g"), dot(420, 115, "A1", "a"), dot(420, 285, "A2", "a"), dot(380, 200, "A3", "a"), dot(580, 150, "D1", "d"), dot(580, 260, "D2", "d")],
        cones: [[340, 45], [340, 95]],
        balls: [[440, 132]],
        passes: [[380, 200, 420, 115]],
        runs: [[420, 285, 590, 205], [580, 260, 600, 228]],
        notes: [{ x: 175, y: 205, t: "2v1, then 3v2, then 4v3" }],
      } },

    { id: "e4", title: "E4. Winner-stays ladder",
      setup: "4 small fields, 2 kids each, mini goals. Field 1 is the top court.",
      run: "60-sec 1v1 games. Winner moves up a field, loser moves down.",
      points: ["Watch: who climbs, and who wins the ball back after losing it?", "Watch: who backs off vs. who keeps going?", "Write down where each kid finishes."],
      progression: "Switch to 2v2 with random partners.",
      active: "Everyone plays every round.",
      /* e4 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        zones: [[30, 30, 305, 160], [365, 30, 305, 160], [30, 210, 305, 160], [365, 210, 305, 160]],
        cones: miniGoals([[30, 30, 305, 160], [365, 30, 305, 160], [30, 210, 305, 160], [365, 210, 305, 160]]),
        dots: [dot(140, 120, "A1", "a"), dot(230, 120, "D1", "d"), dot(475, 120, "A2", "a"), dot(565, 120, "D2", "d"), dot(140, 300, "A3", "a"), dot(230, 300, "D3", "d"), dot(475, 300, "A4", "a"), dot(565, 300, "D4", "d")],
        balls: [[160, 140], [495, 140], [160, 320], [495, 320]],
        dribbles: [[160, 120, 205, 160]],
        runs: [[430, 165, 300, 165]],
        notes: [{ x: 182, y: 58, t: "Field 1 (top)" }, { x: 517, y: 58, t: "Field 2" }, { x: 182, y: 238, t: "Field 3" }, { x: 517, y: 238, t: "Field 4" }, { x: 350, y: 206, t: "winner up, loser down" }],
      } }
  ],

  /* ---------- Rubric: 1-3 per trait ---------- */
  rubric: {
    columns: ["Trait", "1", "2", "3"],
    rows: [
      ["ATT: Takes players on",     "Avoids 1v1s",   "Sometimes",         "Goes at defenders"],
      ["ATT: First touch",          "Under feet",    "OK when unpressed", "Forward, under pressure"],
      ["ATT: Finishing/decision",   "Rushed",        "Some good shots",   "Picks corners, right choice"],
      ["ATT: Runs and scanning",    "Ball-watches",  "Some runs",         "Looks up, runs in behind"],
      ["DEF: Closes down",          "Waits",         "Slow to close",     "Fast, then slows and gets low"],
      ["DEF: Body shape",           "Dives in",      "Sometimes side-on", "Side-on, forces one way"],
      ["DEF: Wins the ball",        "Rarely",        "Some 50/50s",       "Wins most 50/50s"],
      ["DEF: Tracks runners/talks", "Loses runner",  "Tracks some",       "Tracks and talks"]
    ]
  },

  /* ---------- Blank score sheet (template only) ---------- */
  scoreSheet: {
    columns: ["Player", "ATT (4–12)", "DEF (4–12)", "Type", "Pair"],
    rows: [
      ["Player A", "", "", "", ""],
      ["Player B", "", "", "", ""],
      ["Player C", "", "", "", ""],
      ["Player D", "", "", "", ""],
      ["… through Player N (14 outfielders)", "", "", "", ""]
    ]
  },

  /* ---------- Sorting into pairs ---------- */
  sorting: [
    { title: "Score each kid",    detail: "1–3 on each trait; total ATT and DEF." },
    { title: "Pick a type",       detail: "Higher DEF = D, higher ATT = A. Ties go where you need numbers: 7 D and 7 A." },
    { title: "Rank each group",   detail: "D1 (best defender) to D7; A1 to A7." },
    { title: "Snake into pairs",  detail: "Strong D with weaker A, and the reverse, so all 7 pairs come out about even." },
    { title: "Place the stars",   detail: "Top 3 defenders in P2, P5, P7. Top 3 attackers in P1, P3, P6. That way every 3-pair group on the field has one of each." }
  ],

  /* ---------- Aggression drills ---------- */
  aggressionWarning: "Safe aggression: shoulder-to-shoulder is fine; pushing, holding, and pinning a kid into the boards are not. Many indoor leagues ban slide tackles, so check yours and teach staying on your feet.",
  aggressionDrills: [
    { id: "a1", title: "A1. 50/50 race to the ball",
      setup: "Two lines at the halfway line, coach in the middle, 2 goals.",
      run: "Coach rolls or bangs a ball off the wall into space. First kid there attacks the goal, the other defends.",
      points: ["Sprint through the ball, don't slow down near it.", "Get your body between player and ball.", "Lost it? Win it back right away."],
      progression: "Coach makes the ball bounce or plays it off the wall at awkward angles.",
      active: "Run 3–4 races at once from different spots on the field.",
      /* a1 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        half: true, goals: "both",
        dots: [dot(35, 200, "GK", "g"), dot(665, 200, "GK", "g"), dot(300, 50, "A1", "a"), dot(300, 100, "A2", "a"), dot(300, 150, "A3", "a"), dot(400, 50, "D1", "d"), dot(400, 100, "D2", "d"), dot(400, 150, "D3", "d"), dot(330, 330, "C", "c")],
        balls: [[375, 250]],
        passes: [[330, 330, 420, 382], [420, 382, 380, 262]],
        runs: [[300, 150, 355, 238], [400, 150, 390, 232]],
      } },

    { id: "a2", title: "A2. Numbered-call battles",
      setup: "Two teams of 8 on opposite end lines, numbered 1–8. Goals at both ends. Each half of the field runs its own game.",
      run: "Coach calls a number and plays a ball in. Both #s sprint, battle, and score. Call '2 and 5' for a 2v2.",
      points: ["First to the ball wins.", "Get your body in first: shoulder to shoulder.", "Stay goal-side when you lose it."],
      progression: "Call a new number mid-battle to make it 2v1, so the defender has to keep fighting.",
      active: "Two fields at once, 15–20 sec battles, fast calls.",
      /* a2 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        half: true, goals: "both",
        dots: [dot(35, 200, "GK", "g"), dot(665, 200, "GK", "g"), dot(70, 60, "A1", "a"), dot(70, 120, "A2", "a"), dot(70, 280, "A3", "a"), dot(70, 340, "A4", "a"), dot(630, 60, "D1", "d"), dot(630, 120, "D2", "d"), dot(630, 280, "D3", "d"), dot(630, 340, "D4", "d"), dot(350, 355, "C", "c")],
        balls: [[350, 210]],
        passes: [[350, 330, 350, 222]],
        runs: [[70, 120, 325, 195], [630, 120, 375, 195]],
        notes: [{ x: 350, y: 60, t: "Coach calls: 2!" }],
      } },

    { id: "a3", title: "A3. King of the ring (shielding)",
      setup: "15x15 circle or square, every kid has a ball.",
      run: "Shield your ball and kick others' balls out. Out = 5 toe-taps on the side, then back in. No one is ever eliminated.",
      points: ["Low, wide, and arm out to feel the defender (no pushing).", "Ball on the far foot, away from them.", "Win it, then shield it."],
      progression: "Last 30 sec: points for each ball you knock out.",
      active: "All 16 in at once, nobody sits out.",
      /* a3 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        zones: [[190, 60, 320, 280]],
        dots: [dot(465, 200, "A1", "a"), dot(431, 281, "A2", "a"), dot(350, 315, "A3", "a"), dot(269, 281, "A4", "a"), dot(235, 200, "A5", "a"), dot(269, 119, "A6", "a"), dot(350, 85, "A7", "a"), dot(431, 119, "A8", "a")],
        balls: [[451, 299], [370, 333], [289, 299], [255, 218], [289, 137], [370, 103], [451, 137], [605, 265]],
        passes: [[480, 215, 595, 262]],
        dribbles: [[235, 200, 300, 240]],
        notes: [{ x: 600, y: 305, t: "out: 5 toe-taps, back in" }, { x: 350, y: 375, t: "everyone has a ball" }],
      } },

    { id: "a4", title: "A4. Winner-stays 1v1 and 2v2",
      setup: "4 small fields with mini goals, 4 kids per field.",
      run: "First goal wins. Winners stay on, losers swap with the waiting pair. 45-sec cap.",
      points: ["Go at them, don't wait.", "Defender: close fast, then win it.", "If you lose it, don't stop."],
      progression: "Winner needs 2 in a row to be 'king'.",
      active: "4 fields, games under 45 sec, waiting kids ref and cheer.",
      /* a4 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        zones: [[30, 30, 290, 160], [380, 30, 290, 160], [30, 210, 290, 160], [380, 210, 290, 160]],
        cones: miniGoals([[30, 30, 290, 160], [380, 30, 290, 160], [30, 210, 290, 160], [380, 210, 290, 160]]),
        dots: [dot(110, 85, "A1", "a"), dot(110, 140, "A2", "a"), dot(240, 85, "D1", "d"), dot(240, 140, "D2", "d"), dot(470, 110, "A3", "a"), dot(580, 110, "D3", "d"), dot(120, 290, "A4", "a"), dot(230, 290, "D4", "d"), dot(460, 265, "A6", "a"), dot(460, 320, "A7", "a"), dot(590, 265, "D6", "d"), dot(590, 320, "D7", "d"), dot(350, 95, "A5", "a"), dot(350, 305, "D5", "d")],
        balls: [[490, 128], [140, 308], [130, 158], [480, 283]],
        dribbles: [[490, 110, 535, 140]],
        notes: [{ x: 350, y: 206, t: "winners stay" }],
      } },

    { id: "a5", title: "A5. Pressing race (time limit)",
      setup: "Two 15x15 grids, 5 keep the ball vs 3 pressers.",
      run: "Pressers have 10 sec to win the ball. Win it = 1 point. Each trio gets 5 tries, then swap. Best trio wins.",
      points: ["Sprint to close, slow down at 2 yd.", "Shout 'Go!' and all three press together.", "Win it, then keep it."],
      progression: "Cut the time to 8 sec, or make it 5v4.",
      active: "All in a grid; trios swap every ~90 sec.",
      /* a5 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        zones: [[40, 40, 280, 320], [380, 40, 280, 320]],
        dots: [dot(75, 90, "A1", "a"), dot(75, 310, "A2", "a"), dot(180, 330, "A3", "a"), dot(285, 310, "A4", "a"), dot(285, 90, "A5", "a"), dot(150, 200, "D1", "d"), dot(210, 200, "D2", "d"), dot(180, 140, "D3", "d")],
        balls: [[95, 328]],
        runs: [[150, 200, 102, 282], [210, 200, 168, 300], [180, 140, 108, 112]],
        notes: [{ x: 180, y: 32, t: "10 sec to win it" }, { x: 520, y: 205, t: "Grid 2: same" }],
      } },

    { id: "a6", title: "A6. Wall-ball battles",
      setup: "Pairs along the boards, 1 ball each, cone 5 yd off the wall.",
      run: "Coach plays the ball off the wall between two kids. Whoever wins it gets a point for keeping it 5 sec or dribbling around the cone.",
      points: ["Read the angle and get there first.", "Body in, shoulder to shoulder.", "No shoving into the boards."],
      progression: "Add a third kid so it's 2v1 for whoever wins it.",
      active: "Coach and helper each run one end, 4 pairs at a time.",
      /* a6 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        dots: [dot(120, 140, "A1", "a"), dot(280, 140, "D1", "d"), dot(330, 320, "C", "c"), dot(440, 140, "A2", "a"), dot(600, 140, "D2", "d"), dot(470, 320, "C", "c")],
        cones: [[200, 115], [520, 115]],
        balls: [[170, 70], [520, 70]],
        passes: [[330, 320, 230, 18], [230, 18, 178, 64], [470, 320, 560, 18], [560, 18, 528, 64]],
        runs: [[120, 140, 152, 92], [280, 140, 192, 88], [440, 140, 500, 90], [600, 140, 540, 88]],
        notes: [{ x: 350, y: 375, t: "two battles at once" }],
      } }
  ],

  /* ---------- Cues and rewards ---------- */
  cues: [
    "Cues: 'First to it!', 'Win it back!', 'Body in!', 'Go!' (for the press), 'Don't stop!'",
    "Praise the effort out loud right away, even when they don't come away with the ball.",
    "Win-back points: 1 point in any game for winning the ball within 5 sec of losing it.",
    "Track it: tally tackles and first-to-the-ball wins on the clipboard, and read out the top 3 at the end.",
    "Earned perk: the hardest worker picks the final game's teams or bibs.",
    "Never punish a fair, mistimed tackle. Praise the try, coach the timing."
  ],

  sections: []
};
