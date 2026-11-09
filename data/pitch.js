/* PITCH DIAGRAM HELPER (plain JS port of the Page's Pitch component; no build step).
   Load BEFORE the data files. Gives the data files these helpers:
     dot(x, y, label, type)   type: "a" attacker / our team, "d" defender / opponent, "g" keeper, "c" coach
     miniGoals(zones)         4 cones per zone = a mini goal at each end
     ringOf(n, cx, cy, r, prefix, type)   n dots in a circle
   Diagram spec (field is 700 x 400, walls at the edges, goals on the left/right ends):
     { dots: [dot(...)], cones: [[x,y]], balls: [[x,y]],
       passes: [[x1,y1,x2,y2]] (solid arrow), runs: [...] (dashed arrow), dribbles: [...] (zigzag arrow),
       goals: "both" | "left" | "right" | "none", half: true (halfway line + circle),
       zones: [[x, y, width, height]] (dashed boxes), notes: [{x, y, t: "text"}],
       legendA: "Attacker", legendD: "Defender" }
   window.Pitch.svg(spec) returns the SVG; window.Pitch.legend(spec) returns the key; window.Pitch.gantt(data) draws the sub timeline. */
function dot(x, y, l, t) { return { x: x, y: y, l: l, t: t }; }
function miniGoals(zs) {
  return zs.flatMap(function (z) { return [
    [z[0] + 12, z[1] + z[3] / 2 - 22], [z[0] + 12, z[1] + z[3] / 2 + 22],
    [z[0] + z[2] - 12, z[1] + z[3] / 2 - 22], [z[0] + z[2] - 12, z[1] + z[3] / 2 + 22]]; });
}
function ringOf(n, cx, cy, r, prefix, t) {
  return Array.from({ length: n }, function (_, i) {
    return dot(Math.round(cx + r * Math.cos(i * 2 * Math.PI / n)), Math.round(cy + r * Math.sin(i * 2 * Math.PI / n)), prefix + (i + 1), t);
  });
}
window.Pitch = (function () {
  const C = { pitch: "#eaf5ee", line: "#9fbfab", wall: "#2f5d45", ink: "#27352d", a: "#2563eb", d: "#f59e0b", g: "#6b7280", c: "#ffffff", note: "#3f5a4b", cone: "#ea580c" };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const zig = (x1, y1, x2, y2) => {
    const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const n = Math.max(2, Math.floor((L - 18) / 14));
    let d = `M${x1} ${y1}`;
    for (let i = 1; i <= n; i++) { const s = i * (L - 18) / n, o = i % 2 ? 7 : -7; d += ` L${(x1 + ux * s - uy * o).toFixed(1)} ${(y1 + uy * s + ux * o).toFixed(1)}`; }
    return d + ` L${x2} ${y2}`;
  };
  const head = (x1, y1, x2, y2) => {
    const a = Math.atan2(y2 - y1, x2 - x1), s = 16;
    return `${x2},${y2} ${(x2 - s * Math.cos(a - 0.45)).toFixed(1)},${(y2 - s * Math.sin(a - 0.45)).toFixed(1)} ${(x2 - s * Math.cos(a + 0.45)).toFixed(1)},${(y2 - s * Math.sin(a + 0.45)).toFixed(1)}`;
  };
  const fill = k => C[k] || C.a;
  const lab = k => (k === "d" || k === "c") ? "#111" : "#fff";

  function svg(spec) {
    if (!spec) return "";
    const dots = spec.dots || [];
    const trim = s => {
      const [x1, y1, x2, y2] = s;
      if (!dots.some(d => Math.hypot(d.x - x2, d.y - y2) < 6)) return s;
      const L = Math.hypot(x2 - x1, y2 - y1), k = (L - 27) / L;
      return [x1, y1, x1 + (x2 - x1) * k, y1 + (y2 - y1) * k];
    };
    const g = spec.goals || "none";
    let o = `<svg viewBox="0 0 700 400" role="img" aria-label="${esc(spec.label || "Drill diagram")}" font-family="-apple-system,Segoe UI,Roboto,sans-serif">`;
    o += `<rect x="10" y="10" width="680" height="380" rx="30" fill="${C.pitch}" stroke="${C.wall}" stroke-width="8"/>`;
    if (spec.half) o += `<line x1="350" y1="14" x2="350" y2="386" stroke="${C.line}" stroke-width="2"/><circle cx="350" cy="200" r="45" fill="none" stroke="${C.line}" stroke-width="2"/>`;
    if (g === "both" || g === "left") o += `<path d="M14 120 A 85 85 0 0 1 14 280" fill="none" stroke="${C.line}" stroke-width="2"/><rect x="8" y="165" width="12" height="70" fill="${C.ink}"/>`;
    if (g === "both" || g === "right") o += `<path d="M686 120 A 85 85 0 0 0 686 280" fill="none" stroke="${C.line}" stroke-width="2"/><rect x="680" y="165" width="12" height="70" fill="${C.ink}"/>`;
    (spec.zones || []).forEach(z => o += `<rect x="${z[0]}" y="${z[1]}" width="${z[2]}" height="${z[3]}" fill="none" stroke="${C.wall}" stroke-width="2.5" stroke-dasharray="8 6"/>`);
    (spec.cones || []).forEach(c => o += `<polygon points="${c[0]},${c[1] - 11} ${c[0] - 10},${c[1] + 8} ${c[0] + 10},${c[1] + 8}" fill="${C.cone}"/>`);
    (spec.passes || []).map(trim).forEach(s => o += `<line x1="${s[0]}" y1="${s[1]}" x2="${s[2]}" y2="${s[3]}" stroke="${C.ink}" stroke-width="3.5"/><polygon points="${head(...s)}" fill="${C.ink}"/>`);
    (spec.runs || []).map(trim).forEach(s => o += `<line x1="${s[0]}" y1="${s[1]}" x2="${s[2]}" y2="${s[3]}" stroke="${C.ink}" stroke-width="3.5" stroke-dasharray="9 7"/><polygon points="${head(...s)}" fill="${C.ink}"/>`);
    (spec.dribbles || []).map(trim).forEach(s => o += `<path d="${zig(...s)}" fill="none" stroke="${C.ink}" stroke-width="3.5"/><polygon points="${head(...s)}" fill="${C.ink}"/>`);
    dots.forEach(d => o += `<circle cx="${d.x}" cy="${d.y}" r="23" fill="${fill(d.t)}" stroke="${d.t === "c" ? C.ink : "#fff"}" stroke-width="2.5"/><text x="${d.x}" y="${d.y + 7}" text-anchor="middle" font-size="19" font-weight="700" fill="${lab(d.t)}">${esc(d.l)}</text>`);
    (spec.balls || []).forEach(b => o += `<circle cx="${b[0]}" cy="${b[1]}" r="9" fill="#fff" stroke="#111" stroke-width="3"/>`);
    (spec.notes || []).forEach(n => { const hw = String(n.t).length * 21 * 0.27, nx = Math.min(Math.max(n.x, 16 + hw), 684 - hw); o += `<text x="${nx.toFixed(0)}" y="${n.y}" text-anchor="middle" font-size="21" font-weight="600" fill="${C.note}" stroke="${C.pitch}" stroke-width="5" paint-order="stroke">${esc(n.t)}</text>`; });
    return o + "</svg>";
  }

  /* Key shown under each diagram as HTML (stays readable at phone width) */
  function legend(spec) {
    if (!spec) return "";
    const dots = spec.dots || [], has = k => dots.some(d => d.t === k);
    const it = [];
    if (has("a")) it.push(`<span><i class="lg-dot" style="background:${C.a}"></i>${esc(spec.legendA || "Attacker")}</span>`);
    if (has("d")) it.push(`<span><i class="lg-dot" style="background:${C.d}"></i>${esc(spec.legendD || "Defender")}</span>`);
    if (has("g")) it.push(`<span><i class="lg-dot" style="background:${C.g}"></i>Keeper</span>`);
    if (has("c")) it.push(`<span><i class="lg-dot" style="background:#fff;border:2px solid ${C.ink}"></i>Coach</span>`);
    if ((spec.balls || []).length) it.push(`<span><i class="lg-dot" style="background:#fff;border:2px solid #111;width:10px;height:10px"></i>Ball</span>`);
    if ((spec.cones || []).length) it.push(`<span><i class="lg-cone"></i>Cone</span>`);
    if ((spec.passes || []).length) it.push(`<span><svg width="26" height="10"><line x1="1" y1="5" x2="18" y2="5" stroke="${C.ink}" stroke-width="2.5"/><polygon points="25,5 17,1 17,9" fill="${C.ink}"/></svg>Pass</span>`);
    if ((spec.runs || []).length) it.push(`<span><svg width="26" height="10"><line x1="1" y1="5" x2="18" y2="5" stroke="${C.ink}" stroke-width="2.5" stroke-dasharray="4 3"/><polygon points="25,5 17,1 17,9" fill="${C.ink}"/></svg>Run</span>`);
    if ((spec.dribbles || []).length) it.push(`<span><svg width="26" height="10"><path d="M1 5 L5 1 L9 9 L13 1 L17 5" fill="none" stroke="${C.ink}" stroke-width="2"/><polygon points="25,5 17,1 17,9" fill="${C.ink}"/></svg>Dribble</span>`);
    return `<div class="legend">${it.join("")}</div>`;
  }

  /* Substitution timeline: data = { total, halftime, ticks, rows: [ {label, on: [[start,end],...]} ] } */
  function gantt(data) {
    if (!data || !data.rows) return "";
    const total = data.total || 50, rowH = 40, top = 34, left = 64, w = 700 - left - 14;
    const x = m => left + m * w / total, H = top + data.rows.length * rowH + 44;
    let o = `<svg viewBox="0 0 700 ${H}" role="img" aria-label="When each pair is on the field" font-family="-apple-system,Segoe UI,Roboto,sans-serif">`;
    (data.ticks || [0, 10, 20, 30, 40, 50]).forEach(m => o += `<line x1="${x(m)}" y1="${top - 4}" x2="${x(m)}" y2="${top + data.rows.length * rowH}" stroke="#dde5df"/><text x="${x(m)}" y="${top + data.rows.length * rowH + 24}" text-anchor="middle" font-size="20" fill="#5f6b64">${m}</text>`);
    if (data.halftime) o += `<line x1="${x(data.halftime)}" y1="${top - 8}" x2="${x(data.halftime)}" y2="${top + data.rows.length * rowH}" stroke="#5f6b64" stroke-width="2.5" stroke-dasharray="6 5"/><text x="${x(data.halftime)}" y="20" text-anchor="middle" font-size="20" font-weight="600" fill="#5f6b64">Halftime</text>`;
    o += `<text x="${x(total)}" y="${H - 2}" text-anchor="end" font-size="17" fill="#5f6b64">game minute</text>`;
    data.rows.forEach((r, i) => {
      const y = top + i * rowH;
      o += `<text x="8" y="${y + 26}" font-size="21" font-weight="700" fill="#17201b">${esc(r.label)}</text>`;
      (r.on || []).forEach(s => o += `<rect x="${x(s[0])}" y="${y + 6}" width="${(s[1] - s[0]) * w / total}" height="28" rx="5" fill="${r.color || "#198754"}"/>`);
    });
    return o + "</svg>";
  }
  return { svg, legend, gantt };
})();
