/* ==========================================================================
   Figures — hand-built, scalable SVG versions of the coursebook diagrams.
   Every function returns an SVG string. Labels with class "q" can be hidden
   in "label quiz" mode.
   ========================================================================== */
(function () {
  let uid = 0;
  // CSS sets text-anchor:middle, so anchors passed as attributes are converted to inline style (which wins).
  const t = (x, y, s, c = "", a = "") => {
    a = a.replace(/text-anchor="(\w+)"/, 'style="text-anchor:$1"');
    return `<text x="${x}" y="${y}" class="${c}" ${a}>${s}</text>`;
  };
  const l = (x1, y1, x2, y2, c = "b") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}"/>`;
  const glow = (x, y, r = 17) => `<circle cx="${x}" cy="${y}" r="${r}" class="hlc"/>`;

  function svg(vb, body, defs = "") {
    const id = "m" + (++uid);
    const d = `<defs>
      <marker id="${id}a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="arrowhead"/></marker>
      <marker id="${id}c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="arrowhead cy"/></marker>
      <marker id="${id}p" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="arrowhead pk"/></marker>
      ${defs}</defs>`;
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" role="img">${d}${body.replace(/MARK_A/g, `url(#${id}a)`).replace(/MARK_C/g, `url(#${id}c)`).replace(/MARK_P/g, `url(#${id}p)`)}</svg>`;
  }

  /* ---------- Haworth projection of glucose ----------------------------- */
  // vertices relative to origin
  const GP = { C4: [0, 50], C5: [40, 0], O: [120, 0], C1: [160, 50], C2: [120, 92], C3: [40, 92] };
  const GNUM = { C1: [145, 50], C2: [113, 79], C3: [47, 79], C4: [15, 50], C5: [55, 16] };

  function glucose(ox, oy, o = {}) {
    const anomer = o.anomer || "a"; // a | b
    const omit = o.omit || [];
    const hl = o.hl || [];
    const showH = o.H !== false;
    const P = {};
    for (const k in GP) P[k] = [ox + GP[k][0], oy + GP[k][1]];
    let s = "";
    // ring bonds
    s += l(P.C4[0], P.C4[1], P.C5[0], P.C5[1]);
    s += l(P.C5[0], P.C5[1], P.O[0] - 11, P.O[1]);
    s += l(P.O[0] + 9, P.O[1] + 7, P.C1[0], P.C1[1]);
    s += l(P.C1[0], P.C1[1], P.C2[0], P.C2[1], "b bf");
    s += l(P.C2[0], P.C2[1], P.C3[0], P.C3[1], "b bf");
    s += l(P.C3[0], P.C3[1], P.C4[0], P.C4[1], "b bf");
    s += t(P.O[0], P.O[1], "O", "o atom");
    if (o.numbers !== false) for (const k in GNUM) s += t(ox + GNUM[k][0], oy + GNUM[k][1], k.slice(1), "n");

    const subs = [
      ["C5", "u", "⁶CH₂OH"], ["C5", "d", "H"],
      ["C4", "u", "H"], ["C4", "d", "OH"],
      ["C3", "u", "OH"], ["C3", "d", "H"],
      ["C2", "u", "H"], ["C2", "d", "OH"],
      ["C1", "u", anomer === "a" ? "H" : "OH"], ["C1", "d", anomer === "a" ? "OH" : "H"],
    ];
    for (const [c, d, lab] of subs) {
      const key = c + d;
      if (omit.includes(key)) continue;
      if (lab === "H" && !showH) continue;
      const [x, y] = P[c];
      const len = lab === "H" ? 20 : 24;
      const y2 = d === "u" ? y - len : y + len;
      const ly = d === "u" ? y2 - 11 : y2 + 12;
      s += l(x, y, x, y2, lab === "H" ? "b thin" : "b");
      if (hl.includes(key)) s += glow(x, ly);
      const cls = lab === "H" ? "hh" : (lab.includes("OH") ? "oh q" : "q");
      s += t(x, ly, lab, cls);
    }
    return s;
  }

  /* ---------- Haworth projection of fructose (as drawn in Fig 2.5b) ----- */
  const FP = { C2: [0, 45], C3: [28, 0], C4: [92, 0], C5: [120, 45], O: [60, 82] };
  function fructose(ox, oy, o = {}) {
    const omit = o.omit || [];
    const hl = o.hl || [];
    const P = {};
    for (const k in FP) P[k] = [ox + FP[k][0], oy + FP[k][1]];
    let s = "";
    s += l(P.C2[0], P.C2[1], P.C3[0], P.C3[1]);
    s += l(P.C3[0], P.C3[1], P.C4[0], P.C4[1]);
    s += l(P.C4[0], P.C4[1], P.C5[0], P.C5[1]);
    s += l(P.C5[0], P.C5[1], ox + 70, oy + 75.7, "b bf");
    s += l(ox + 50, oy + 75.7, P.C2[0], P.C2[1], "b bf");
    s += t(P.O[0], P.O[1] + 2, "O", "o atom");
    if (o.numbers !== false) {
      s += t(ox + 13, oy + 58, "2", "n"); s += t(ox + 42, oy + 13, "3", "n");
      s += t(ox + 87, oy + 13, "4", "n"); s += t(ox + 106, oy + 44, "5", "n");
    }
    const subs = [["C2", "u", "¹CH₂OH"], ["C2", "d", "OH"], ["C3", "d", "OH"], ["C4", "u", "OH"], ["C5", "d", "⁶CH₂OH"]];
    for (const [c, d, lab] of subs) {
      const key = c + d;
      if (omit.includes(key)) continue;
      const [x, y] = P[c];
      const y2 = d === "u" ? y - 24 : y + 24;
      let ly = d === "u" ? y2 - 11 : y2 + 12;
      let lx = x;
      if (key === "C5d") lx = x + 18;
      if (key === "C2u") lx = x - 20;
      s += l(x, y, x, y2);
      if (hl.includes(key)) s += glow(lx, ly);
      s += t(lx, ly, lab, lab.includes("CH₂") ? "q" : "oh q");
    }
    return s;
  }

  const bridge = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2, my = Math.max(y1, y2) + 40;
    return `<path d="M${x1},${y1} L${mx - 7},${my - 9}" class="b bond-gly"/><path d="M${mx + 7},${my - 9} L${x2},${y2}" class="b bond-gly"/>` +
      `<ellipse cx="${mx}" cy="${my}" rx="19" ry="14" class="glyc"/>` + t(mx, my + 1, "O", "o atom");
  };

  /* ---------- Rounded box with multi-line text --------------------------- */
  function box(x, y, w, h, lines, cls = "bx") {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" class="${cls}"/>`;
    const lh = 18, start = y + h / 2 - ((lines.length - 1) * lh) / 2;
    lines.forEach((ln, i) => (s += t(x + w / 2, start + i * lh, ln, "bxt q")));
    return s;
  }
  const arrow = (x1, y1, x2, y2, c = "ar", m = "MARK_A") => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${c}" marker-end="${m}"/>`;

  /* ======================================================================
     FIGURE BUILDERS
     ====================================================================== */
  const F = {};

  F.buildingBlocks = () => {
    let s = "";
    const simple = [[10, 30, 150, "monosaccharides"], [176, 30, 130, "organic bases"], [322, 30, 120, "amino acids"], [458, 30, 172, "fatty acids & glycerol"]];
    simple.forEach(([x, y, w, n]) => (s += box(x, y, w, 46, [n], "bx simple")));
    s += box(176, 130, 130, 46, ["nucleotides"], "bx simple");
    const comp = [[10, 240, 150, "polysaccharides"], [176, 240, 130, "nucleic acids"], [322, 240, 120, "proteins"], [470, 240, 148, "lipids"]];
    comp.forEach(([x, y, w, n]) => (s += box(x, y, w, 50, [n], "bx complex")));
    s += arrow(85, 78, 85, 234, "ar cy", "MARK_C");
    s += arrow(241, 78, 241, 124, "ar cy", "MARK_C");
    s += `<path d="M85,100 C 130,100 200,96 226,124" class="ar cy dash" marker-end="MARK_C"/>`;
    s += t(150, 92, "sugar", "n");
    s += arrow(241, 178, 241, 234, "ar cy", "MARK_C");
    s += arrow(382, 78, 382, 234, "ar cy", "MARK_C");
    s += arrow(544, 78, 544, 234, "ar cy", "MARK_C");
    s += t(395, 160, "condensation", "n", `transform="rotate(-90 395 160)"`);
    s += t(557, 160, "not a polymer", "n", `transform="rotate(-90 557 160)"`);
    s += `<rect x="170" y="310" width="16" height="16" rx="4" class="bx simple"/>` + t(194, 319, "simple biological molecules", "lg", `text-anchor="start"`);
    s += `<rect x="390" y="310" width="16" height="16" rx="4" class="bx complex"/>` + t(414, 319, "complex molecules", "lg", `text-anchor="start"`);
    return svg("0 0 640 340", s);
  };

  F.condensation = () => {
    let s = "";
    s += box(70, 40, 140, 56, ["monomer"], "bx simple");
    s += l(210, 68, 232, 68) + t(252, 68, "OH", "oh q");
    s += `<rect x="236" y="48" width="78" height="40" rx="14" class="water"/>`;
    s += t(298, 68, "H", "hh q") + t(318, 68, "O", "o atom") + l(332, 68, 356, 68);
    s += box(356, 40, 140, 56, ["monomer"], "bx simple");
    s += t(275, 108, "→ H₂O", "wt");
    s += arrow(250, 132, 250, 184, "ar cy", "MARK_C") + t(240, 152, "condensation", "lbl cyt q", `text-anchor="end"`) + t(240, 170, "(−H₂O)", "n", `text-anchor="end"`);
    s += arrow(320, 184, 320, 132, "ar pk", "MARK_P") + t(332, 152, "hydrolysis", "lbl pkt q", `text-anchor="start"`) + t(332, 170, "(+H₂O)", "n", `text-anchor="start"`);
    s += box(90, 206, 140, 56, ["monomer"], "bx complex");
    s += l(230, 234, 268, 234, "b bond-gly") + `<ellipse cx="285" cy="234" rx="17" ry="13" class="glyc"/>` + t(285, 235, "O", "o atom") + l(302, 234, 340, 234, "b bond-gly");
    s += box(340, 206, 140, 56, ["monomer"], "bx complex");
    s += t(540, 234, "+ H₂O", "wt big");
    s += t(285, 290, "covalent bond (e.g. glycosidic, peptide, ester)", "lbl q");
    return svg("0 0 640 310", s);
  };

  F.glucoseChain = () => {
    let s = "";
    const x = 210;
    const rows = [60, 120, 180, 240, 300];
    // C1
    s += t(x, 18, "H", "hh") + l(x, 28, x, 48, "b thin");
    s += t(x, 60, "C", "atom") + t(x - 16, 46, "1", "n");
    s += l(x + 12, 55, x + 52, 55) + l(x + 12, 65, x + 52, 65) + t(x + 64, 60, "O", "o atom");
    // C2..C5
    const sides = [["H", "OH"], ["HO", "H"], ["H", "OH"], ["H", "OH"]];
    sides.forEach(([L, R], i) => {
      const y = rows[i + 1];
      s += l(x, y - 48, x, y - 12);
      s += t(x, y, "C", "atom") + t(x - 16, y - 14, String(i + 2), "n");
      s += l(x - 12, y, x - 44, y) + l(x + 12, y, x + 44, y);
      const lc = L === "H" ? "hh" : "oh q", rc = R === "H" ? "hh" : "oh q";
      if (L !== "H") s += glow(x - 64, y, 19);
      if (R !== "H") s += glow(x + 64, y, 19);
      s += t(x - 64, y, L, lc) + t(x + 64, y, R, rc);
    });
    s += l(x, 312, x, 344) + glow(x + 22, 358, 16) + t(x, 358, "⁶CH₂OH", "q") ;
    // ring closure annotation
    s += `<path d="M ${x + 88},300 C 360,290 400,80 ${x + 22},76" class="ar pk dash" marker-end="MARK_P"/>`;
    s += t(470, 120, "Ring closes:", "lbl pkt");
    s += t(470, 142, "O on C5 bonds to C1", "lbl q");
    s += t(470, 210, "5 × –OH (hydroxyl)", "lbl cyt");
    s += t(470, 232, "glowing in the diagram", "n");
    s += t(470, 300, "C₆H₁₂O₆ · hexose", "lbl");
    return svg("0 0 640 390", s);
  };

  F.alphaBeta = () => {
    let s = "";
    s += t(140, 22, "α-glucose", "title cyt q");
    s += t(460, 22, "β-glucose", "title vit q");
    s += glucose(60, 92, { anomer: "a", hl: ["C1d"] });
    s += glucose(380, 92, { anomer: "b", hl: ["C1u"] });
    s += `<line x1="20" y1="142" x2="250" y2="142" class="plane"/><line x1="340" y1="142" x2="570" y2="142" class="plane"/>`;
    s += t(255, 210, "–OH on C1", "n", `text-anchor="start"`) + t(255, 226, "BELOW ring", "lbl cyt", `text-anchor="start"`);
    s += t(578, 70, "–OH on C1", "n", `text-anchor="end"`) + t(578, 86, "ABOVE ring", "lbl vit", `text-anchor="end"`);
    s += t(320, 292, "Same formula C₆H₁₂O₆ → isomers  ·  ring = 5 C + 1 O  ·  C6 outside ring", "n");
    return svg("0 0 640 310", s);
  };

  F.maltose = () => {
    let s = "";
    s += t(150, 16, "α-glucose", "lbl cyt q") + t(410, 16, "α-glucose", "lbl cyt q");
    s += glucose(70, 70, { anomer: "a", H: false, hl: ["C1d"] });
    s += glucose(330, 70, { anomer: "a", H: false, hl: ["C4d"] });
    s += `<rect x="208" y="140" width="144" height="34" rx="16" class="water"/>` + t(280, 196, "H₂O removed", "wt");
    s += arrow(270, 214, 270, 262, "ar cy", "MARK_C") + t(258, 232, "condensation", "lbl cyt q", `text-anchor="end"`) + t(258, 250, "(−H₂O)", "n", `text-anchor="end"`);
    s += arrow(330, 262, 330, 214, "ar pk", "MARK_P") + t(342, 232, "hydrolysis", "lbl pkt q", `text-anchor="start"`) + t(342, 250, "(+H₂O)", "n", `text-anchor="start"`);
    s += glucose(110, 310, { anomer: "a", H: false, omit: ["C1d"] });
    s += glucose(330, 310, { anomer: "a", H: false, omit: ["C4d"] });
    s += bridge(270, 360, 330, 360);
    s += t(340, 432, "1,4 glycosidic bond", "lbl pkt q");
    s += t(340, 456, "maltose", "title q");
    return svg("0 0 620 470", s);
  };

  F.sucrose = () => {
    let s = "";
    s += t(150, 16, "α-glucose", "lbl cyt q") + t(395, 16, "β-fructose", "lbl vit q");
    s += glucose(70, 70, { anomer: "a", H: false, hl: ["C1d"] });
    s += fructose(335, 75, { hl: ["C2d"] });
    s += `<rect x="208" y="140" width="148" height="34" rx="16" class="water"/>` + t(282, 196, "H₂O removed", "wt");
    s += arrow(270, 214, 270, 262, "ar cy", "MARK_C") + t(258, 232, "condensation", "lbl cyt q", `text-anchor="end"`) + t(258, 250, "(−H₂O)", "n", `text-anchor="end"`);
    s += arrow(330, 262, 330, 214, "ar pk", "MARK_P") + t(342, 232, "hydrolysis", "lbl pkt q", `text-anchor="start"`) + t(342, 250, "(+H₂O)", "n", `text-anchor="start"`);
    s += glucose(110, 310, { anomer: "a", H: false, omit: ["C1d"] });
    s += fructose(335, 315, { omit: ["C2d"] });
    s += bridge(270, 360, 335, 360);
    s += t(350, 432, "1,2 glycosidic bond", "lbl pkt q");
    s += t(350, 456, "sucrose (non-reducing)", "title q");
    return svg("0 0 620 470", s);
  };

  F.benedict = () => {
    let s = "";
    s += t(320, 26, "reducing sugar + Cu²⁺ (blue)  →  oxidised sugar + Cu⁺ (red-brown)", "lbl");
    s += arrow(70, 64, 590, 64, "ar cy", "MARK_C") + t(320, 52, "increasing concentration of reducing sugar", "n");
    const tubes = [["#2f7cff", "blue", "none"], ["#2fc26a", "green", "trace"], ["#f4d23c", "yellow", "low"], ["#ff9a2e", "orange", "medium"], ["#c1361d", "brick-red", "high"]];
    tubes.forEach(([c, n, a], i) => {
      const x = 80 + i * 120;
      s += `<path d="M${x - 20},145 V250 a20,20 0 0 0 40,0 V145 Z" fill="${c}" class="liquid"/>`;
      if (i >= 2) s += `<path d="M${x - 20},${262 - i * 4} a20,20 0 0 0 40,0 Z" class="ppt" style="opacity:${0.25 + i * 0.15}"/>`;
      s += `<path d="M${x - 23},92 V250 a23,23 0 0 0 46,0 V92" class="tube"/>`;
      s += l(x - 30, 92, x + 30, 92, "b tuberim");
      s += `<ellipse cx="${x}" cy="145" rx="20" ry="4" fill="${c}" opacity=".9"/>`;
      s += t(x, 305, n, "lbl q");
      s += t(x, 326, a, "n");
    });
    s += t(320, 352, "Soluble blue copper(II) sulfate → insoluble brick-red copper(I) oxide precipitate", "n");
    return svg("0 0 640 370", s);
  };

  F.nonReducing = () => {
    let s = "";
    s += box(150, 14, 340, 54, ["1 · Sample + Benedict's reagent", "heat in a water bath"], "bx");
    s += arrow(260, 70, 170, 112, "ar") + arrow(380, 70, 470, 112, "ar");
    s += box(20, 116, 290, 54, ["Orange / red-brown precipitate", "→ REDUCING sugar present"], "bx red");
    s += box(340, 116, 280, 54, ["Stays blue", "→ no reducing sugar"], "bx blue");
    s += arrow(480, 172, 480, 204, "ar");
    s += box(340, 208, 280, 54, ["2 · FRESH sample + dilute HCl", "heat → hydrolysis"], "bx");
    s += arrow(480, 264, 480, 292, "ar");
    s += box(340, 296, 280, 54, ["3 · Neutralise with alkali", "e.g. sodium hydroxide"], "bx");
    s += arrow(480, 352, 480, 380, "ar");
    s += box(340, 384, 280, 54, ["4 · Add Benedict's reagent", "heat again"], "bx");
    s += arrow(420, 440, 190, 478, "ar") + arrow(520, 440, 520, 478, "ar");
    s += box(20, 482, 330, 58, ["Red-brown → NON-REDUCING sugar", "present (e.g. sucrose)"], "bx red");
    s += box(380, 482, 240, 58, ["Still blue →", "no sugar of any kind"], "bx blue");
    s += `<rect x="20" y="208" width="296" height="230" rx="14" class="note"/>`;
    s += t(168, 236, "WHY?", "lbl pkt");
    ["HCl hydrolyses the glycosidic", "bond → reducing monosaccharides.", "", "Benedict's reagent only works", "in ALKALINE conditions, so the", "acid must be neutralised first.", "", "Both sugars present → heavier", "precipitate in the 2nd test."]
      .forEach((ln, i) => (s += t(168, 266 + i * 19, ln, "n2")));
    return svg("0 0 640 556", s);
  };

  F.atoms = () => {
    let s = "";
    const atoms = [["C", "carbon", "black", 4, "atC"], ["N", "nitrogen", "blue", 3, "atN"], ["O", "oxygen", "red", 2, "atO"], ["H", "hydrogen", "white", 1, "atH"]];
    atoms.forEach(([sym, name, col, n, cls], i) => {
      const cx = 85 + i * 157, cy = 110;
      const start = n === 1 ? 0 : n === 2 ? -52 : n === 3 ? -90 : -45;
      const step = n === 2 ? 104 : 360 / n;
      for (let k = 0; k < n; k++) {
        const ang = ((start + k * step) * Math.PI) / 180;
        s += `<line x1="${cx + Math.cos(ang) * 28}" y1="${cy + Math.sin(ang) * 28}" x2="${cx + Math.cos(ang) * 62}" y2="${cy + Math.sin(ang) * 62}" class="stick"/>`;
      }
      s += `<circle cx="${cx}" cy="${cy}" r="30" class="${cls}"/>`;
      s += t(cx, cy + 1, sym, "atsym " + cls + "t");
      s += t(cx, 205, name, "lbl q");
      s += t(cx, 227, `${col} · ${n} bond${n > 1 ? "s" : ""}`, "n q");
    });
    return svg("0 0 640 250", s);
  };

  window.FIGURES = F;
})();
