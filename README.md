# Team Soccer PWA (indoor U11/U12 team)
Static, no build step, all paths relative. NOT PUBLISHED: waiting on Brennan's review.

- index.html / style.css / app.js: shell and renderers (4 bottom tabs)
- data/pitch.js: Pitch diagram helper (plain-JS port of the Page's Pitch component) + sub Gantt renderer; helpers dot(), miniGoals(), ringOf(). Loaded before the data files.
- data/team.js: app name + practice days/time (shown in header and top of Practice tab)
- data/practice.js: Practice Plan tab (assumptions, schedule, swaps, 2-3-1 formation SVG data, pressing triggers, 8 drills)
- data/subs.js: Subs & Rotation tab (facts, change steps, rotation tables; slots P1-P7 = pairs, GK1/GK2 = keepers)
- data/eval.js: Evaluation & Drills tab (E1-E4, 1-3 rubric, blank score sheet, pair sorting, A1-A6 aggression drills, cues)
- data/home.js: At-Home Training (8 weeks, tracker saved in localStorage key `team-soccer:home:v1`)
- Set any of window.PRACTICE / SUBS / EVAL to null and that tab shows "Coming soon".
- After ANY edit, bump CACHE in sw.js (currently team-soccer-v5) so installed phones refresh.
- PRIVACY: public site. No player names, photos, or personal data. Use P-slots.
- Local preview: `cd /workspace/team-soccer-app && python3 -m http.server 8765`
- Diagrams: each drill/eval entry has a `diagram: {...}` next to its text; pressing shape = PRACTICE.triggers.diagram; sub timeline = SUBS.gantt. Tap any diagram to enlarge.
- Screenshots in screenshots/ are for review only; leave them out when publishing.
