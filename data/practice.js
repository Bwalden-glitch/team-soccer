/* PRACTICE PLAN TAB DATA
   Source: "Indoor Team Training Plan & Sub System" (Max), Nov 2026.
   Set window.PRACTICE = null to show the "Coming soon" card instead.
   EDITING: every item is one entry in a list. To remove an idea, delete its line/block.
   To add one, copy an existing entry and change the text. Keep the commas between entries.
   PRIVACY: no player names, photos, or personal data (public site). Use slots like P1 / GK1.

   Shape (all keys optional except title):
     assumptions: "text"
     schedule:  { columns: [ ... ], note, rows: [ [time, block, focus], ... ] }
     swaps:     [ [option, replace, with], ... ]
     formation: { name, players: [ {x, y, label} ], labels: [ {x, y, text} ], arrows: [ {x1,y1,x2,y2,label?,lx?,ly?} ], notes: [ ... ] }
                (SVG field is 700 x 380; our goal on the left, attacking right)
     triggers:  { list: [ ... ], rule: "text" }
     drills:    [ { id, title, time, setup, run, points: [ ... ], progression, active, diagram } ]
     triggers.diagram and each drill's diagram use the Pitch format in data/pitch.js.
     sections:  [ { title, body, bullets: [ ... ] } ]
*/
window.PRACTICE = {
  title: "Practice Plan",
  intro: "A 2-hour indoor session for 16 players, built around a 2-3-1 shape, pressing as a unit, and using the walls.",

  assumptions: "Practices Mondays and Fridays, 6:00–8:00 PM. U11/U12, 16 players, one coach plus one parent helper, an indoor walled field, 2 goals, about 16 balls, cones, and 2 bib colors. Games: 7 on the field (6 + GK), two 25-min halves. Change these numbers to match your league's rules and game length.",

  /* ---------- 2-hour schedule: [time, block, focus] ---------- */
  schedule: {
    columns: ["Time (PM)", "Block", "Focus"],
    rows: [
      ["6:00–6:10", "Wall-ball warm-up + 50/50 race",    "Walls, aggression"],
      ["6:10–6:22", "Diamond passing with scan cue",     "First touch, scanning, passing to feet"],
      ["6:22–6:25", "Water",                             ""],
      ["6:25–6:40", "Wall-pass channels to goal",        "Walls, 1-2s, defending rebounds"],
      ["6:40–6:55", "Rondo to press as a unit",          "Pressing triggers"],
      ["6:55–6:58", "Water",                             ""],
      ["6:58–7:13", "Shadow play: shape and rotations",  "Positioning, width, transitions"],
      ["7:13–7:28", "Defend the box: 3v3 + late runner", "Marking, runners, talking"],
      ["7:28–7:31", "Water",                             ""],
      ["7:31–7:41", "Numbered-call battles",             "Aggression, 50/50s"],
      ["7:41–8:00", "Points scrimmage",                  "Everything + sub practice"]
    ],
    note: "6:00 to 8:00 PM, Mondays and Fridays: 120 min with three 3-min water breaks."
  },

  /* ---------- Swap-in options: [option, replace, with] ---------- */
  swaps: [
    ["Evaluation night", "Blocks 6:40–6:55 and 6:58–7:13", "E1–E4 (about 7 min each)"],
    ["Low-energy night", "Diamond passing (6:10–6:22)",    "King of the ring + winner-stays 1v1"],
    ["Press focus",      "Numbered-call battles (7:31–7:41)", "Pressing race (time limit)"]
  ],

  /* ---------- Formation (drawn as an SVG) ---------- */
  formation: {
    name: "2-3-1",
    players: [
      { x: 55,  y: 190, label: "GK" },
      { x: 175, y: 120, label: "CB" },
      { x: 175, y: 260, label: "CB" },
      { x: 330, y: 190, label: "CM" },
      { x: 380, y: 60,  label: "LM" },
      { x: 380, y: 320, label: "RM" },
      { x: 540, y: 190, label: "ST" }
    ],
    labels: [
      { x: 380, y: 28,  text: "wall" },
      { x: 380, y: 362, text: "wall" },
      { x: 640, y: 200, text: "attack →" }
    ],
    arrows: [
      { x1: 308, y1: 200, x2: 200, y2: 190, label: "drops when defending", lx: 240, ly: 172 }
    ],
    notes: [
      "Two center backs always guard the middle of the box, which is where indoor goals come from.",
      "Wide mids live on the walls. The boards give them a free 1-2 partner and spread the other team.",
      "The center mid is the switch: drops between the CBs to make 3 when defending, steps up to make 3 in midfield when attacking.",
      "One striker is a target to play into and the first presser.",
      "It's the shape the substitution pairs are built around: 3 defensive spots (CB, CB, CM) and 3 attacking spots (LM, RM, ST)."
    ]
  },

  /* ---------- Pressing triggers ---------- */
  triggers: {
    list: [
      "Bad touch: the ball bounces away from them.",
      "Back pass: everyone steps up together.",
      "Receiver facing their own goal.",
      "Ball near the wall: the boards act as your second defender.",
      "Slow or bouncing pass."
    ],
    rule: "One rule: the closest player goes on the trigger, and the next two cut off the nearest passes. Nobody presses alone.",
    /* pressing-shape diagram (blue = our team, orange = opponent) */
    diagram: {
      half: true, goals: "both", legendA: "Our team", legendD: "Opponent",
      dots: [dot(35, 200, "GK", "g"), dot(170, 120, "CB", "a"), dot(170, 280, "CB", "a"), dot(300, 200, "CM", "a"), dot(390, 60, "LM", "a"), dot(390, 340, "RM", "a"), dot(480, 200, "ST", "a"), dot(665, 200, "GK", "g"), dot(605, 130, "O1", "d"), dot(605, 275, "O2", "d"), dot(500, 105, "O3", "d"), dot(425, 265, "O4", "d"), dot(540, 355, "O5", "d")],
      balls: [[625, 150]],
      passes: [[500, 105, 605, 130]],
      runs: [[480, 200, 578, 170], [390, 60, 470, 90], [390, 340, 575, 290], [300, 200, 400, 250], [170, 120, 255, 130], [170, 280, 255, 270]],
      notes: [{ x: 560, y: 45, t: "Trigger: back pass" }, { x: 215, y: 210, t: "CBs step up" }],
    }
  },

  /* ---------- Session drills (one block per drill) ---------- */
  drills: [
    { id: "d1", title: "Wall-ball warm-up + 50/50 race", time: "6:00–6:10",
      setup: "8 pairs spread along the boards, 1 ball per pair, partners 8–10 yd apart. 4 cone gates in the middle for the race.",
      run: "Pass into the wall at an angle so it rebounds to your partner. Partner receives, takes one touch, and plays it back the same way. Last 3 min: 50/50 race. Coach bangs a ball off the wall, two kids race from equal distance, and the winner dribbles through a gate.",
      points: [
        "Angle in = angle out. Aim at a spot on the wall, not at your partner.",
        "Firm and low. A soft pass dies off the boards.",
        "Take your touch away from the wall and open up to the field."
      ],
      progression: "One-touch only, then add a passive defender who steps to the wall side.",
      active: "Every pair has a ball. Run races at 4 stations at once so nobody waits more than 2 turns.",
      /* d1 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        dots: [dot(110, 80, "A1", "a"), dot(260, 80, "A2", "a"), dot(440, 320, "A3", "a"), dot(590, 320, "A4", "a"), dot(230, 250, "A5", "a"), dot(470, 250, "D1", "d")],
        cones: [[335, 330], [375, 330]],
        balls: [[130, 100], [460, 300], [350, 205]],
        passes: [[110, 80, 185, 18], [185, 18, 260, 80], [440, 320, 515, 382], [515, 382, 590, 320]],
        runs: [[230, 250, 330, 212], [470, 250, 370, 212]],
        dribbles: [[352, 220, 355, 310]],
        notes: [{ x: 185, y: 135, t: "wall pass" }, { x: 350, y: 170, t: "50/50 race" }],
      } },

    { id: "d2", title: "Diamond passing with scan cue", time: "6:10–6:22",
      setup: "Two diamonds, 8 kids each, cones 12 yd apart, 2 balls per diamond. Helper or coach stands behind one cone.",
      run: "Pass to feet around the diamond and follow your pass. Before receiving, check your shoulder. The coach holds up fingers or a bib color and the receiver shouts it out before the first touch.",
      points: [
        "Look before the ball arrives, not after.",
        "Open your hips and take the first touch across your body, away from pressure.",
        "Pass to the far foot, firm, along the ground."
      ],
      progression: "Switch to a Y pattern (up, lay back, through ball). Coach shouts 'Switch!' to reverse direction.",
      active: "Two balls per diamond keeps it to 1 or 2 kids per cone and under 5 sec of waiting.",
      /* d2 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        dots: [dot(90, 200, "A1", "a"), dot(200, 90, "A2", "a"), dot(310, 200, "A3", "a"), dot(200, 310, "A4", "a"), dot(390, 200, "A5", "a"), dot(500, 90, "A6", "a"), dot(610, 200, "A7", "a"), dot(500, 310, "A8", "a"), dot(255, 50, "C", "c")],
        cones: [[60, 200], [200, 58], [340, 200], [200, 345], [360, 200], [500, 58], [640, 200], [500, 345]],
        balls: [[112, 218], [412, 218]],
        passes: [[90, 200, 200, 90], [390, 200, 500, 90]],
        runs: [[72, 172, 172, 70]],
        notes: [{ x: 200, y: 206, t: "scan, call it" }, { x: 500, y: 206, t: "Y: up, back, through" }],
      } },

    { id: "d3", title: "Wall-pass channels to goal", time: "6:25–6:40",
      setup: "4 channels, two along each wall, both goals in use. 4 kids per channel: attacker, defender, 2 waiting. Keepers in goal.",
      run: "Attacker dribbles at the defender, plays the ball off the boards past them, runs around to collect (a 1-2 with the wall) and shoots. Rotate attacker → defender → back of line.",
      points: [
        "Hit the wall early, 2–3 yd before the defender, so the rebound goes behind them.",
        "Defender: stand side-on, cheat toward the wall side, and read the rebound angle.",
        "Defender: step into the rebound path. Don't chase the player."
      ],
      progression: "Add a second attacker for a 2v1. The attacker picks the wall pass or a real 1-2. Then the defender goes live and can counter to a small gate.",
      active: "4 stations running at once; each kid is on the ball every ~30 sec.",
      /* d3 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        goals: "both",
        dots: [dot(380, 60, "A1", "a"), dot(535, 120, "D1", "d"), dot(665, 200, "GK", "g"), dot(320, 340, "A2", "a"), dot(165, 285, "D2", "d"), dot(35, 200, "GK", "g")],
        cones: [[380, 160], [460, 160], [540, 160], [620, 160], [80, 240], [160, 240], [240, 240], [320, 240]],
        balls: [[400, 78], [300, 356]],
        dribbles: [[380, 60, 465, 65], [320, 340, 235, 335]],
        passes: [[465, 65, 515, 18], [515, 18, 590, 72], [600, 85, 678, 190], [235, 335, 185, 382], [185, 382, 115, 328], [105, 318, 22, 212]],
        runs: [[470, 82, 588, 86], [235, 318, 117, 312]],
      } },

    { id: "d4", title: "Rondo to press as a unit", time: "6:40–6:55",
      setup: "Two 12x12 grids, one side of each against the boards. 5v3 in each grid, 1 ball per grid plus spares.",
      run: "5 keep the ball, 3 press. The 3 press only on a trigger (see Pressing triggers). When they win it, they dribble out through an end gate for a point. Swap the 3 every 90 sec.",
      points: [
        "First presser curves the run to cut off one passing lane.",
        "2nd and 3rd lock the nearest options. All three go on one shout: 'Go!'",
        "Use the wall: trap the ball against the boards, where it's a 2v1 for you."
      ],
      progression: "6-second rule: defenders get a bonus point for winning it within 6 sec of the trigger. Then 5v3 becomes 5v4.",
      active: "All 16 are in a grid the whole block. Rest is the 90-sec swap.",
      /* d4 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        zones: [[60, 14, 240, 236], [400, 14, 240, 236]],
        dots: [dot(85, 55, "A1", "a"), dot(85, 200, "A2", "a"), dot(180, 225, "A3", "a"), dot(275, 200, "A4", "a"), dot(275, 55, "A5", "a"), dot(150, 140, "D1", "d"), dot(215, 140, "D2", "d"), dot(180, 75, "D3", "d")],
        cones: [[160, 285], [200, 285], [500, 285], [540, 285]],
        balls: [[104, 218]],
        passes: [[85, 55, 85, 200]],
        runs: [[150, 140, 108, 182], [215, 140, 165, 195], [180, 75, 112, 66]],
        notes: [{ x: 180, y: 325, t: "win it: out the gate" }, { x: 520, y: 135, t: "Grid 2: same 5v3" }],
      } },

    { id: "d5", title: "Shadow play: shape and rotations", time: "6:58–7:13",
      setup: "Full field. Team A (6 + GK) in a 2-3-1 with the ball. Team B (6) as walking defenders. Spare keeper rotates in.",
      run: "Team A moves the ball through phases: keeper → center back → wide mid on the wall → striker. On the coach's 'Lose it!' Team A drops into defending shape in 5 sec, with the center mid between the center backs.",
      points: [
        "Width: wide mids stay near the boards until the ball comes.",
        "Rotate: when the striker drops, a wide mid runs in behind.",
        "Transition: nearest player presses, everyone else gets goal-side fast."
      ],
      progression: "Team B goes 50%, then live 6v6 where 3 passes in a row = 1 point. Swap teams every 4 min.",
      active: "Everyone is in a shape. No lines.",
      /* d5 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        half: true, goals: "both",
        dots: [dot(35, 200, "GK", "g"), dot(170, 120, "A1", "a"), dot(170, 280, "A2", "a"), dot(300, 200, "A3", "a"), dot(390, 55, "A4", "a"), dot(390, 345, "A5", "a"), dot(540, 200, "A6", "a"), dot(615, 115, "D1", "d"), dot(615, 285, "D2", "d"), dot(470, 110, "D3", "d"), dot(470, 290, "D4", "d"), dot(665, 200, "GK", "g")],
        balls: [[52, 222]],
        passes: [[35, 200, 170, 280], [170, 280, 390, 345], [390, 345, 540, 200]],
        runs: [[390, 55, 580, 185], [540, 200, 475, 210]],
        notes: [{ x: 250, y: 50, t: "hold width" }],
      } },

    { id: "d6", title: "Defend the box: 3v3 + late runner", time: "7:13–7:28",
      setup: "Use each half separately, 8 kids per half: GK, 3 defenders, 3 attackers, 1 late runner 10 yd behind. 2 small target gates at halfway.",
      run: "3 attackers go at goal. On the 2nd pass the late runner joins. Defenders win it and pass through a halfway gate to score.",
      points: [
        "See ball and man: open body shape, not ball-watching.",
        "Track your runner all the way into the box.",
        "Talk: 'I've got 7!', 'Runner!', 'Man on!'"
      ],
      progression: "Third-man run: attacker plays into the striker, who lays it off for a third player running in. Defenders must call it.",
      active: "Two games at once; rotate roles every 3 reps.",
      /* d6 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        half: true, goals: "right",
        dots: [dot(665, 200, "GK", "g"), dot(600, 140, "D1", "d"), dot(600, 260, "D2", "d"), dot(530, 200, "D3", "d"), dot(450, 110, "A1", "a"), dot(450, 290, "A2", "a"), dot(410, 200, "A3", "a"), dot(385, 335, "A4", "a")],
        cones: [[340, 45], [340, 95], [340, 255], [340, 305]],
        balls: [[470, 130]],
        passes: [[410, 200, 450, 110], [450, 110, 450, 290]],
        runs: [[385, 335, 590, 215], [530, 200, 568, 248]],
        notes: [{ x: 175, y: 205, t: "Group 2: same here" }, { x: 500, y: 375, t: "late runner" }],
      } },

    { id: "d7", title: "Numbered-call battles", time: "7:31–7:41",
      setup: "See Evaluation & Drills tab → Aggression drills: Numbered-call battles. Run on both halves at once.",
      run: "Two teams on the end lines, coach calls numbers and plays a ball in. Called players battle to goal.",
      points: [
        "First to the ball wins.",
        "Get your body in first: shoulder to shoulder.",
        "Lose it? Win it right back."
      ],
      progression: "Call 2 or 3 numbers for 2v2 and 3v3.",
      active: "Two halves, 8 kids each. Call fast, games last under 20 sec.",
      /* d7 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        half: true, goals: "both",
        dots: [dot(35, 200, "GK", "g"), dot(665, 200, "GK", "g"), dot(70, 60, "A1", "a"), dot(70, 120, "A2", "a"), dot(70, 280, "A3", "a"), dot(70, 340, "A4", "a"), dot(630, 60, "D1", "d"), dot(630, 120, "D2", "d"), dot(630, 280, "D3", "d"), dot(630, 340, "D4", "d"), dot(350, 355, "C", "c")],
        balls: [[350, 210]],
        passes: [[350, 330, 350, 222]],
        runs: [[70, 120, 325, 195], [630, 120, 375, 195]],
        notes: [{ x: 350, y: 60, t: "Coach calls: 2!" }],
      } },

    { id: "d8", title: "Final game: points scrimmage", time: "7:41–8:00",
      setup: "Full field, 7v7 with keepers. The 2 extra kids rotate in on the fly using the pair system (Subs & Rotation tab).",
      run: "Normal game with bonus points: goal = 1, goal after a wall pass or 1-2 = 2, win the ball back within 5 sec of losing it = 1, stop a late runner = 1.",
      points: [
        "Press on the trigger, as a unit.",
        "Width on the walls, rotate up top.",
        "Track runners into our box."
      ],
      progression: "Last 5 min: winning team needs to keep it. Losing team presses all-out.",
      active: "Use 2-min shifts so the 2 subs never sit long, and practice your game-day changes.",
      /* d8 diagram: edit positions/arrows here (see data/pitch.js for the format) */
      diagram: {
        half: true, goals: "both",
        dots: [dot(35, 200, "GK", "g"), dot(170, 120, "A1", "a"), dot(170, 280, "A2", "a"), dot(300, 200, "A3", "a"), dot(390, 60, "A4", "a"), dot(390, 340, "A5", "a"), dot(530, 200, "A6", "a"), dot(665, 200, "GK", "g"), dot(530, 120, "D1", "d"), dot(530, 280, "D2", "d"), dot(400, 200, "D3", "d"), dot(310, 60, "D4", "d"), dot(310, 340, "D5", "d"), dot(170, 200, "D6", "d")],
        balls: [[410, 80]],
        passes: [[390, 60, 450, 18], [450, 18, 510, 62]],
        runs: [[400, 82, 500, 82]],
        notes: [{ x: 450, y: 140, t: "wall 1-2 = 2 pts" }],
      } }
  ],

  sections: []
};
