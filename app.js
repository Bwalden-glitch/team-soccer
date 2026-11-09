(function () {
  "use strict";
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const view = $("#view");
  const TABS = ["practice", "subs", "eval", "home"];
  let tab = TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "practice";

  /* ---------- shared helpers ---------- */
  const SLOT_RE = /^\s*((P\d{1,2}|GK\d?)\s*([,/&]|and)?\s*)+$/i;
  function cell(v) {
    const s = String(v == null ? "" : v);
    if (s && SLOT_RE.test(s)) {
      return s.match(/P\d{1,2}|GK\d?/gi).map(t => `<span class="slot${/^GK/i.test(t) ? " gk" : ""}">${esc(t.toUpperCase())}</span>`).join("");
    }
    return esc(s);
  }
  function tableHTML(t) {
    if (!t || !t.rows) return "";
    let h = "";
    if (t.title) h += `<h3 style="margin-top:16px">${esc(t.title)}</h3>`;
    if (t.caption) h += `<p class="mute small">${esc(t.caption)}</p>`;
    h += `<div class="tblwrap"><table class="tbl">`;
    if (t.columns) h += `<thead><tr>${t.columns.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead>`;
    h += "<tbody>" + t.rows.map(r => {
      const water = t.water && /water/i.test(r[1] || "");
      return `<tr${water ? ' class="water"' : ""}>${r.map((v, i) => `<td${i === 0 && String(v).length <= 12 ? ' class="nw"' : ""}>${cell(v)}</td>`).join("")}</tr>`;
    }).join("") + "</tbody></table></div>";
    if (t.note) h += `<p class="mute small">${esc(t.note)}</p>`;
    return h;
  }
  const list = (arr, ordered) => arr && arr.length ? `<${ordered ? "ol" : "ul"} class="list">${arr.map(x => `<li>${esc(x)}</li>`).join("")}</${ordered ? "ol" : "ul"}>` : "";
  const steps = arr => arr && arr.length ? `<ol class="steps">${arr.map(s => typeof s === "string" ? `<li>${esc(s)}</li>` : `<li><b>${esc(s.title)}</b>${s.detail ? `<br><span class="mute small">${esc(s.detail)}</span>` : ""}</li>`).join("")}</ol>` : "";
  const kv = (label, val) => val ? `<div class="kv"><b>${esc(label)}</b>${Array.isArray(val) ? list(val, true) : esc(val)}</div>` : "";
  function sections(arr) {
    return (arr || []).map(s => `<div class="card">${s.title ? `<h3>${esc(s.title)}</h3>` : ""}${s.body ? `<p>${esc(s.body)}</p>` : ""}${list(s.bullets)}</div>`).join("");
  }
  function drill(d) {
    return `<details class="drill" id="${esc(d.id || "")}"><summary>${d.time ? `<span class="badge">${esc(d.time)}</span>` : ""}<span>${esc(d.title)}</span></summary><div class="dbody">
      ${diagram(d.diagram, d.title)}${kv("Setup", d.setup)}${kv("How it runs", d.run)}${kv("Coaching points", d.points)}${kv("Progression", d.progression)}${kv("Keeping all 16 busy", d.active)}${d.notes ? kv("Notes", d.notes) : ""}
    </div></details>`;
  }
  function diagram(spec, title) {
    if (!spec || !window.Pitch) return "";
    return `<figure class="diagram"><button class="zoom" data-zoom aria-label="Enlarge diagram${title ? ": " + esc(title) : ""}">${window.Pitch.svg(spec)}<span class="zhint">⤢ Tap to enlarge</span></button>${window.Pitch.legend(spec)}</figure>`;
  }
  function jump(items) {
    const ok = items.filter(Boolean);
    return ok.length > 1 ? `<div class="jump">${ok.map(([id, label]) => `<button class="chipbtn" data-jump="${id}">${esc(label)}</button>`).join("")}</div>` : "";
  }
  function soon(title, what) {
    return `<h1>${esc(title)}</h1><div class="card soon"><div class="big">⚽</div><h2>Coming soon!</h2>
      <p class="mute">Coach is putting the finishing touches on ${esc(what)}. It'll show up here automatically, so check back after the next practice.</p>
      <p class="mute small">In the meantime, the <b>At-Home</b> tab is ready to go.</p></div>`;
  }

  /* ---------- formation SVG (from data) ---------- */
  function formationSVG(f) {
    const p = (f.players || []).map(pl => `<g><circle cx="${+pl.x}" cy="${+pl.y}" r="22" fill="#198754" stroke="#fff" stroke-width="2"/><text x="${+pl.x}" y="${+pl.y + 5}" text-anchor="middle" fill="#fff" font-size="14" font-weight="700">${esc(pl.label)}</text></g>`).join("");
    const l = (f.labels || []).map(t => `<text x="${+t.x}" y="${+t.y}" text-anchor="middle" fill="#cfe9d9" font-size="13">${esc(t.text)}</text>`).join("");
    const a = (f.arrows || []).map(r => `<line x1="${+r.x1}" y1="${+r.y1}" x2="${+r.x2}" y2="${+r.y2}" stroke="#ffe08a" stroke-width="2.5" stroke-dasharray="6 5" marker-end="url(#ah)"/>${r.label ? `<text x="${+(r.lx ?? (r.x1 + r.x2) / 2)}" y="${+(r.ly ?? (r.y1 + r.y2) / 2 - 10)}" text-anchor="middle" fill="#ffe08a" font-size="13">${esc(r.label)}</text>` : ""}`).join("");
    return `<div class="field card" style="padding:8px;background:#0f5132"><svg viewBox="0 0 700 380" role="img" aria-label="${esc(f.name || "")} formation on an indoor field" font-family="-apple-system,Segoe UI,Roboto,sans-serif">
      <defs><marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#ffe08a"/></marker></defs>
      <rect x="10" y="10" width="680" height="360" rx="40" fill="#11603b" stroke="#fff" stroke-width="3"/>
      <line x1="350" y1="10" x2="350" y2="370" stroke="#ffffff88"/><circle cx="350" cy="190" r="45" fill="none" stroke="#ffffff88"/>
      <path d="M10 120 A 90 90 0 0 1 10 260" fill="none" stroke="#ffffff88"/><path d="M690 120 A 90 90 0 0 0 690 260" fill="none" stroke="#ffffff88"/>
      <rect x="2" y="160" width="10" height="60" fill="#fff"/><rect x="688" y="160" width="10" height="60" fill="#fff"/>
      ${a}${l}${p}</svg></div>`;
  }

  /* ---------- team info ---------- */
  const T = window.TEAM || {};
  function whenCard() {
    if (!T.practiceDays && !T.practiceTime) return "";
    return `<div class="when"><span class="ic">🗓️</span><div><span>Practice</span><b>${esc(T.practiceDays || "")}</b><b>${esc(T.practiceTime || "")}</b>${T.practiceNote ? `<span>${esc(T.practiceNote)}</span>` : ""}</div></div>`;
  }
  if (T.appName) { $("#hdrTitle").textContent = T.appName; document.title = T.appName; }
  if (T.practiceDays || T.practiceTime) $("#hdrWhen").textContent = [(T.practiceDays || "").replace(/Mondays/, "Mon").replace(/Fridays/, "Fri").replace(/Tuesdays/, "Tue").replace(/Wednesdays/, "Wed").replace(/Thursdays/, "Thu").replace(/Saturdays/, "Sat").replace(/Sundays/, "Sun"), T.practiceTime].filter(Boolean).join(" · ");

  /* ---------- PRACTICE ---------- */
  function renderPractice() {
    const P = window.PRACTICE;
    if (!P) return whenCard() + soon("Practice Plan", "the practice plan");
    let h = `<h1>${esc(P.title || "Practice Plan")}</h1>${whenCard()}${P.intro ? `<p class="mute">${esc(P.intro)}</p>` : ""}`;
    h += jump([P.schedule && ["p-sched", "Schedule"], P.formation && ["p-form", "Formation"], P.triggers && ["p-trig", "Pressing"], P.drills && P.drills.length && ["p-drills", "Drills"]]);
    if (P.assumptions) h += `<div class="callout"><b>Built for:</b> ${esc(P.assumptions)}</div>`;
    if (P.schedule) {
      h += `<h2 id="p-sched">2-hour schedule</h2>` + tableHTML({ columns: P.schedule.columns || ["Time", "Block", "Focus"], rows: P.schedule.rows, note: P.schedule.note, water: true });
    }
    if (P.swaps && P.swaps.length) h += `<h3 style="margin-top:14px">Swap-in options</h3>` + tableHTML({ columns: ["Option", "Replace", "With"], rows: P.swaps });
    if (P.formation) {
      const f = P.formation;
      h += `<h2 id="p-form">Formation: ${esc(f.name || "")}</h2>${formationSVG(f)}${list(f.notes)}`;
    }
    if (P.triggers) {
      h += `<h2 id="p-trig">Pressing triggers</h2>${diagram(P.triggers.diagram, "Pressing shape")}<div class="card">${list(P.triggers.list)}${P.triggers.rule ? `<p class="cheer">${esc(P.triggers.rule)}</p>` : ""}</div>`;
    }
    if (P.blocks && P.blocks.length) h += `<h2>Blocks</h2>` + P.blocks.map(b => drill({ ...b, run: b.run || (b.steps || []).join(" "), points: b.points || b.coachingPoints, progression: b.progression || (b.variations || []).join(" ") })).join("");
    if (P.drills && P.drills.length) h += `<h2 id="p-drills">Session drills</h2><p class="mute small">Tap a drill to open it.</p>` + P.drills.map(drill).join("");
    h += sections(P.sections);
    return h;
  }

  /* ---------- SUBS ---------- */
  function renderSubs() {
    const S = window.SUBS;
    if (!S) return soon("Subs & Rotation", "the substitution system");
    let h = `<h1>${esc(S.title || "Subs & Rotation")}</h1>`;
    h += jump([["s-how", "How it works"], S.gantt && ["s-gantt", "Timeline"], S.tables && S.tables.length && ["s-tables", "Rotation"]]);
    h += `<div id="s-how"></div>`;
    if (S.intro) h += `<div class="callout">${esc(S.intro)}</div>`;
    if (S.facts && S.facts.length) h += `<div class="card">${S.facts.map(f => kv(f.label, f.value)).join("")}</div>`;
    if (S.steps && S.steps.length) h += `<h2>Making a change</h2><div class="card">${steps(S.steps)}</div>`;
    if (S.notes && S.notes.length) h += S.notes.map(n => `<p class="mute small">${esc(n)}</p>`).join("");
    if (S.gantt && window.Pitch) h += `<h2 id="s-gantt">${esc(S.gantt.title || "On-field timeline")}</h2>${S.gantt.caption ? `<p class="mute small">${esc(S.gantt.caption)}</p>` : ""}<figure class="diagram gantt"><button class="zoom" data-zoom aria-label="Enlarge timeline">${window.Pitch.gantt(S.gantt)}<span class="zhint">⤢ Tap to enlarge</span></button></figure>`;
    if (S.tables && S.tables.length) h += `<h2 id="s-tables">Rotation</h2><p class="mute small"><span class="slot">P1</span>–<span class="slot">P7</span> are pairs (1 defender + 1 attacker); <span class="slot gk">GK1</span> <span class="slot gk">GK2</span> are keepers. Numbers only, no names.</p>` + S.tables.map(tableHTML).join("");
    h += sections(S.sections);
    return h;
  }

  /* ---------- EVAL ---------- */
  function renderEval() {
    const E = window.EVAL;
    if (!E) return soon("Evaluation & Drills", "the evaluation and drills");
    let h = `<h1>${esc(E.title || "Evaluation & Drills")}</h1>`;
    h += jump([E.evalDrills && ["e-drills", "Eval drills"], E.rubric && ["e-rubric", "Rubric"], E.sorting && ["e-sort", "Pairs"], E.aggressionDrills && ["e-agg", "Aggression"], E.cues && ["e-cues", "Cues"]]);
    if (E.evalDrills && E.evalDrills.length) h += `<h2 id="e-drills">Player evaluation drills</h2>${E.evalIntro ? `<p class="mute">${esc(E.evalIntro)}</p>` : ""}` + E.evalDrills.map(drill).join("");
    if (E.rubric) h += `<h2 id="e-rubric">Rubric (1–3 per trait)</h2>` + tableHTML(E.rubric);
    if (E.scoreSheet) h += `<h3 style="margin-top:14px">Score sheet (blank template)</h3><p class="mute small">Fill in on paper or your own notes. Don't add kids' names or scores to this public app.</p>` + tableHTML(E.scoreSheet);
    if (E.sorting && E.sorting.length) h += `<h2 id="e-sort">Sorting into pairs</h2><div class="card">${steps(E.sorting)}</div>`;
    if (E.aggressionDrills && E.aggressionDrills.length) h += `<h2 id="e-agg">Aggression drills</h2>${E.aggressionWarning ? `<div class="callout warn">${esc(E.aggressionWarning)}</div>` : ""}` + E.aggressionDrills.map(drill).join("");
    if (E.drills && E.drills.length) h += `<h2>Drills</h2>` + E.drills.map(d => drill({ ...d, title: d.title || d.name, points: d.points || d.coachingPoints, progression: d.progression || (d.progressions || []).join(" ") })).join("");
    if (E.cues && E.cues.length) h += `<h2 id="e-cues">Cues and rewards for aggression</h2><div class="card">${list(E.cues)}</div>`;
    h += sections(E.sections);
    return h;
  }

  /* ---------- AT-HOME (with on-device tracker) ---------- */
  const KEY = "team-soccer:home:v1";
  let H;
  const loadH = () => { try { H = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { H = {}; } H.days = H.days || {}; H.ch = H.ch || {}; H.bench = H.bench || {}; H.week = H.week || 1; H.view = H.view || "week"; };
  const saveH = () => { try { localStorage.setItem(KEY, JSON.stringify(H)); } catch (e) {} };
  const DAYS = 4;
  const dayArr = n => { const a = H.days[n] || []; return [...Array(DAYS)].map((_, i) => !!a[i]); };
  const total = () => Object.values(H.days).reduce((s, a) => s + (a || []).filter(Boolean).length, 0);
  function cheer(n) {
    if (n === 0) return "Tap a day when you finish a session. Let's go! ⚽";
    if (n < 4) return "Great start! Every touch counts.";
    if (n < 10) return "You're building a habit. Keep it rolling! 🔥";
    if (n < 20) return "Halfway hero! Your first touch is getting sharper.";
    if (n < 32) return "Big effort! Coach is going to notice. 💪";
    return "ALL 32 SESSIONS! You're a legend. 🏆";
  }
  function renderHome() {
    const D = window.HOME; loadH();
    if (!D) return soon("At-Home Training", "the at-home routines");
    const weeks = D.weeks || [], n = total(), max = weeks.length * DAYS;
    let h = `<h1>${esc(D.title)}</h1><p class="mute">${esc(D.intro)}</p>`;
    h += `<div class="card"><div style="display:flex;justify-content:space-between;align-items:baseline"><b>Your progress</b><span class="mute small">${n} / ${max} sessions</span></div>
      <div class="prog"><i style="width:${max ? Math.round(n / max * 100) : 0}%"></i></div><p class="cheer small">${cheer(n)}</p></div>`;
    h += `<div class="jump"><button class="chipbtn${H.view === "week" ? " on" : ""}" data-hv="week">This week</button><button class="chipbtn${H.view === "track" ? " on" : ""}" data-hv="track">Track scores</button><button class="chipbtn${H.view === "start" ? " on" : ""}" data-hv="start">Before you start</button></div>`;
    if (H.view === "start") {
      h += `<div class="card"><h3>What you need</h3>${list(D.gear)}</div><div class="card"><h3>Stay safe</h3>${list(D.safety)}</div>
        <div class="card"><h3>How it works</h3>${list(["Pick your week below. Start at Week 1.", "Do the week's routine 3–4 days (rest days are good for you!).", "Tap a day box when you finish a session.", "Every drill has an EASIER and a HARDER version. Pick the one that's a good challenge.", "Move to the next week when you've done at least 3 days.", "Progress saves on this phone only. Nothing is sent anywhere."])}</div>`;
    } else if (H.view === "track") {
      h += `<div class="card"><h3>Your scores</h3><p class="mute small">Test in Week 1, retest in Week 8. Saved on this phone only.</p>
        <div class="bench"><span></span><span class="hd">Week 1</span><span class="hd">Week 8</span>
        ${(D.benchmarks || []).map(b => `<span><b>${esc(b.name)}</b><br><span class="mute small">${esc(b.how)}</span></span>
          <input inputmode="numeric" pattern="[0-9]*" data-b="${esc(b.id)}" data-w="start" value="${esc((H.bench[b.id] || {}).start || "")}" aria-label="${esc(b.name)} week 1">
          <input inputmode="numeric" pattern="[0-9]*" data-b="${esc(b.id)}" data-w="end" value="${esc((H.bench[b.id] || {}).end || "")}" aria-label="${esc(b.name)} week 8">`).join("")}
        </div><p id="benchMsg" class="cheer small"></p></div>
        <div class="card"><h3>Weekly challenges</h3>${weeks.map(w => `<label class="chk" style="margin:8px 0"><input type="checkbox" data-ch="${w.n}"${H.ch[w.n] ? " checked" : ""}><span>Week ${w.n}: <span class="mute" style="font-weight:500">${esc(w.challenge)}</span></span></label>`).join("")}</div>
        <button class="btn ghost" id="resetH">Reset my progress on this phone</button>`;
    } else {
      h += `<div class="weeks">${weeks.map(w => { const c = dayArr(w.n).filter(Boolean).length; return `<button class="wk${w.n === H.week ? " on" : ""}${c >= 3 ? " full" : ""}" data-week="${w.n}">Wk ${w.n}<small>${c}/${DAYS}</small></button>`; }).join("")}</div>`;
      const w = weeks.find(x => x.n === H.week) || weeks[0];
      if (w) {
        const da = dayArr(w.n);
        h += `<div class="card"><span class="pill">Week ${w.n} · ${esc(w.theme)} · ${esc(w.minutes)}</span><h2 style="margin-top:8px">${esc(w.title)}</h2><p>${esc(w.goal)}</p>
          <b class="small">Sessions done this week</b><div class="days">${da.map((d, i) => `<button class="day${d ? " done" : ""}" data-day="${i}">${d ? "✓" : "Day " + (i + 1)}</button>`).join("")}</div>
          <p class="mute small">🎯 Week challenge: ${esc(w.challenge)}</p></div>`;
        if (D.warmup) h += `<details class="drill"><summary><span class="badge">3 min</span><span>${esc(D.warmup.name)}</span></summary><div class="dbody">${steps(D.warmup.steps)}<div class="cues">${(D.warmup.cues || []).map(c => `<span class="cue">${esc(c)}</span>`).join("")}</div></div></details>`;
        h += (w.drills || []).map((d, i) => `<details class="drill"${i === 0 ? " open" : ""}><summary><span class="badge">${esc(d.skill)}</span><span>${esc(d.name)}</span></summary><div class="dbody">
          <p class="small"><b>Do:</b> ${esc(d.dose)}</p>${steps(d.steps)}
          <div class="cues">${(d.cues || []).map(c => `<span class="cue">💬 ${esc(c)}</span>`).join("")}</div>
          <div class="tri"><div class="e"><b>Easier:</b> ${esc(d.easier)}</div><div class="h"><b>Harder:</b> ${esc(d.harder)}</div><div class="p"><b>Parent tip:</b> ${esc(d.parent)}</div></div>
          ${d.video ? `<a class="vid" href="${esc(d.video.url)}" target="_blank" rel="noopener">▶ Watch a demo: ${esc(d.video.title)}</a>` : ""}
        </div></details>`).join("");
        if (w.n === weeks.length && D.afterWeek8) h += `<div class="callout">${esc(D.afterWeek8)}</div>`;
      }
    }
    return h;
  }
  function benchMsg() {
    const el = $("#benchMsg"); if (!el) return;
    const better = (window.HOME.benchmarks || []).filter(b => { const x = H.bench[b.id] || {}; return x.start !== undefined && x.end !== undefined && x.start !== "" && x.end !== "" && +x.end > +x.start; });
    el.textContent = better.length ? `You improved in ${better.length} test${better.length > 1 ? "s" : ""}! 🎉` : "";
  }

  /* ---------- router + events ---------- */
  function render() {
    document.querySelectorAll("#tabs button").forEach(b => b.classList.toggle("on", b.dataset.tab === tab));
    const r = { practice: renderPractice, subs: renderSubs, eval: renderEval, home: renderHome }[tab];
    let html;
    try { html = r(); } catch (e) { console.error(e); html = `<div class="card soon"><div class="big">🛠️</div><h2>Something's off in this tab's data file</h2><p class="mute small">${esc(e.message)}</p></div>`; }
    view.innerHTML = html + `<p class="foot">No player names or personal info are kept in this app. At-home progress stays on this phone.</p>`;
    if (tab === "home") benchMsg();
  }
  document.querySelector("#tabs").addEventListener("click", e => {
    const b = e.target.closest("button[data-tab]"); if (!b) return;
    tab = b.dataset.tab; history.replaceState(null, "", "#" + tab); render(); window.scrollTo(0, 0);
  });
  const ov = document.createElement("div"); ov.id = "overlay"; ov.hidden = true; document.body.appendChild(ov);
  ov.addEventListener("click", () => { ov.hidden = true; ov.innerHTML = ""; document.body.classList.remove("noscroll"); });
  view.addEventListener("click", e => {
    const z = e.target.closest("[data-zoom]");
    if (z) { const svg = z.querySelector("svg"); if (svg) { ov.innerHTML = `<div class="ovin">${svg.outerHTML}<p>Turn your phone sideways for a bigger view. Tap anywhere to close.</p></div>`; ov.hidden = false; document.body.classList.add("noscroll"); } return; }
    const t = e.target.closest("[data-jump],[data-hv],[data-week],[data-day],#resetH"); if (!t) return;
    if (t.dataset.jump) { const el = document.getElementById(t.dataset.jump); if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 70, behavior: "smooth" }); return; }
    if (t.dataset.hv) { H.view = t.dataset.hv; saveH(); render(); return; }
    if (t.dataset.week) { H.week = +t.dataset.week; saveH(); render(); return; }
    if (t.dataset.day !== undefined) { const a = dayArr(H.week); a[+t.dataset.day] = !a[+t.dataset.day]; H.days[H.week] = a; saveH(); render(); return; }
    if (t.id === "resetH" && confirm("Clear all your at-home progress on this phone?")) { localStorage.removeItem(KEY); render(); }
  });
  view.addEventListener("change", e => {
    const t = e.target;
    if (t.dataset.ch) { H.ch[t.dataset.ch] = t.checked; saveH(); return; }
    if (t.dataset.b) { const v = t.value.replace(/\D/g, ""); t.value = v; H.bench[t.dataset.b] = H.bench[t.dataset.b] || {}; H.bench[t.dataset.b][t.dataset.w] = v; saveH(); benchMsg(); }
  });
  window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (TABS.includes(h) && h !== tab) { tab = h; render(); window.scrollTo(0, 0); } });
  loadH(); render();
  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
})();
