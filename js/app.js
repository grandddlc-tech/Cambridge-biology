/* ==========================================================================
   BioGlow IMAT — app logic (vanilla JS, no build step)
   ========================================================================== */
(() => {
  "use strict";
  const D = window.BIO_DATA;
  const FIG = window.FIGURES;
  const KEY = "bioglow-imat-v1";
  const IMAT = { right: 1.5, wrong: -0.4, secPerQ: 100 }; // IMAT (MUR): +1.5 / −0.4 / 0, 60 q in 100 min
  const LETTERS = ["A", "B", "C", "D", "E"];

  const CHAPTER_LIST = [
    [1, "Cell structure"], [2, "Biological molecules"], [3, "Enzymes"], [4, "Cell membranes and transport"],
    [5, "The mitotic cell cycle"], [6, "Nucleic acids and protein synthesis"], [7, "Transport in plants"],
    [8, "Transport in mammals"], [9, "Gas exchange"], [10, "Infectious diseases"], [11, "Immunity"],
    [12, "Energy and respiration"], [13, "Photosynthesis"], [14, "Homeostasis"], [15, "Control and coordination"],
    [16, "Inheritance"], [17, "Selection and evolution"], [18, "Classification, biodiversity and conservation"], [19, "Genetic technology"],
  ];

  /* ---------------------------------------------------------------- state */
  const fresh = () => ({ reviewed: {}, tests: [], mistakes: {}, qstats: {}, cards: {}, mastered: 0 });
  let S = load();
  function load() {
    try { return Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || "{}")); }
    catch (e) { return fresh(); }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } }

  let T = null;          // active / finished test session
  let timerId = null;
  const ui = { open: new Set(["s1"]), reviewMode: "notes", fc: { i: 0, flip: false, filter: "all", order: null }, mistakeTopic: "all", resultFilter: "wrong" };

  /* -------------------------------------------------------------- helpers */
  const $ = (s, r = document) => r.querySelector(s);
  const app = $("#app");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
  const qById = (ch, id) => D.chapters[ch].questions.find((q) => q.id === id);
  function toast(msg) { const el = $("#toast"); el.textContent = msg; el.classList.add("show"); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove("show"), 2200); }

  const ring = (p, size = 54, stroke = 6, label = `${p}%`) => {
    const r = (size - stroke) / 2, c = 2 * Math.PI * r;
    return `<div class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 ${size} ${size}" style="width:${size}px;height:${size}px"><circle class="bgc" cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke-width:${stroke}"/><circle class="fg" cx="${size / 2}" cy="${size / 2}" r="${r}" style="stroke-width:${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}"/></svg><div class="lab">${label}</div></div>`;
  };

  function chapterProgress(ch) {
    const C = D.chapters[ch];
    const rev = Object.keys(S.reviewed[ch] || {}).filter((k) => S.reviewed[ch][k]).length / C.sections.length;
    const solved = C.questions.filter((q) => (S.qstats[q.id] || {}).correct > 0).length / C.questions.length;
    const known = Object.values(S.cards[ch] || {}).filter((v) => v === "known").length / C.flashcards.length;
    return Math.round((rev * 0.4 + solved * 0.4 + known * 0.2) * 100);
  }
  const mistakeCount = (ch) => Object.keys(S.mistakes[ch] || {}).length;

  /* --------------------------------------------------------------- router */
  function route() {
    clearInterval(timerId);
    closeModal();
    const p = location.hash.replace(/^#\/?/, "").split("/");
    if (p[0] === "ch" && D.chapters[p[1]]) renderChapter(+p[1], p[2] || "review");
    else renderHome();
  }
  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); });

  /* ================================================================= HOME */
  function renderHome() {
    $("#tabbar").classList.add("hidden");
    $("#topExtra").innerHTML = "";
    const tests = S.tests;
    const avg = tests.length ? Math.round(tests.reduce((a, t) => a + pct(t.c, t.n), 0) / tests.length) : 0;
    const totalMist = Object.keys(D.chapters).reduce((a, ch) => a + mistakeCount(ch), 0);

    app.innerHTML = `
      <section class="glass hero">
        <svg class="helix" viewBox="0 0 190 260" aria-hidden="true"><g>
          <path class="s1" d="M60 10 C 140 50, 140 80, 60 120 S -20 190, 60 250"/>
          <path class="s2" d="M130 10 C 50 50, 50 80, 130 120 S 210 190, 130 250"/>
          ${[30, 55, 80, 105, 140, 165, 190, 215].map((y) => `<line x1="70" x2="120" y1="${y}" y2="${y}"/>`).join("")}
        </g></svg>
        <span class="badge cyan">Cambridge AS &amp; A Level · IMAT prep</span>
        <h1 class="h-glow" style="margin-top:10px">Learn it. Test it.<br>Nail the IMAT.</h1>
        <p>Review the coursebook, practise IMAT-style questions (+1.5 / −0.4), study clean figures and fix your mistakes.</p>
        <div class="stats">
          <div class="stat"><b>${tests.length}</b><span>tests taken</span></div>
          <div class="stat"><b>${avg}%</b><span>average</span></div>
          <div class="stat"><b>${totalMist}</b><span>mistakes to fix</span></div>
        </div>
      </section>
      <div class="section-title">Choose a chapter</div>
      <div class="chapters">
        ${[...CHAPTER_LIST].sort((a, b) => (D.chapters[b[0]] ? 1 : 0) - (D.chapters[a[0]] ? 1 : 0) || a[0] - b[0]).map(([n, title]) => {
          const C = D.chapters[n];
          if (!C) return `<div class="glass chap locked"><div class="num">CHAPTER ${String(n).padStart(2, "0")}</div><h3>${title}</h3><div class="muted small">🔒 Coming soon — send the pages</div></div>`;
          const p = chapterProgress(n);
          return `<a class="glass chap" href="#/ch/${n}/review"><div class="glowline"></div>
            ${ring(p)}
            <div class="num">CHAPTER ${String(n).padStart(2, "0")}</div>
            <h3>${C.title}</h3>
            <div class="muted small">${C.pages} · ${C.sections.length} sections · ${C.questions.length} questions · ${C.figures.length} figures</div>
            <div class="row" style="margin-top:12px">
              <span class="badge cyan">Review</span><span class="badge">Test</span><span class="badge pink">Figures</span>
              ${mistakeCount(n) ? `<span class="badge amber">${mistakeCount(n)} mistakes</span>` : ""}
            </div></a>`;
        }).join("")}
      </div>`;
  }

  /* ============================================================== CHAPTER */
  const TABS = [
    ["review", "Review", '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7M8 11h7"/>'],
    ["test", "Test", '<path d="M9 11l2 2 4-4"/><rect x="4" y="3" width="16" height="18" rx="3"/>'],
    ["figures", "Figures", '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="15" r="3"/><path d="M10.5 9.5l4 4"/><rect x="2" y="2" width="20" height="20" rx="4"/>'],
    ["mistakes", "Mistakes", '<path d="M12 3l9 16H3z"/><path d="M12 10v4M12 17h.01"/>'],
    ["progress", "Progress", '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'],
  ];

  function renderChapter(ch, tab) {
    const C = D.chapters[ch];
    const tb = $("#tabbar");
    tb.classList.remove("hidden");
    const mc = mistakeCount(ch);
    tb.innerHTML = TABS.map(([id, name, icon]) => `<a href="#/ch/${ch}/${id}" class="${id === tab ? "on" : ""}"><svg viewBox="0 0 24 24">${icon}</svg>${name}${id === "mistakes" && mc ? `<span class="dot">${mc}</span>` : ""}</a>`).join("");
    $("#topExtra").innerHTML = `<span class="muted small">Ch ${ch} · ${chapterProgress(ch)}%</span>`;

    const head = `<div class="chead"><a class="back" href="#/" aria-label="Back">‹</a><div><h2>${C.title}</h2><div class="sub">Chapter ${ch} · ${C.coverage}</div></div></div>`;
    const views = { review: viewReview, test: viewTest, figures: viewFigures, mistakes: viewMistakes, progress: viewProgress };
    app.innerHTML = head + `<div id="view"></div>`;
    (views[tab] || viewReview)(ch, $("#view"));
  }

  /* --------------------------------------------------------------- REVIEW */
  function viewReview(ch, el) {
    const C = D.chapters[ch];
    const done = C.sections.filter((s) => (S.reviewed[ch] || {})[s.id]).length;
    el.innerHTML = `
      <div class="seg"><button data-m="notes" class="${ui.reviewMode === "notes" ? "on" : ""}">📖 Notes</button><button data-m="cards" class="${ui.reviewMode === "cards" ? "on" : ""}">⚡ Flashcards</button></div>
      <div id="rv"></div>`;
    el.querySelectorAll(".seg button").forEach((b) => (b.onclick = () => { ui.reviewMode = b.dataset.m; viewReview(ch, el); }));
    const rv = $("#rv", el);
    if (ui.reviewMode === "cards") return viewCards(ch, rv);

    rv.innerHTML = `
      <div class="glass card">
        <div class="row"><b>Reviewed ${done}/${C.sections.length}</b><span class="spacer"></span>
          <button class="btn sm ghost" id="expAll">Expand all</button><button class="btn sm ghost" id="colAll">Collapse</button></div>
        <div class="bar" style="margin-top:10px"><i style="width:${pct(done, C.sections.length)}%"></i></div>
      </div>
      ${C.sections.map((s) => {
        const isDone = (S.reviewed[ch] || {})[s.id];
        return `<div class="glass acc ${ui.open.has(s.id) ? "open" : ""} ${isDone ? "done" : ""}" data-id="${s.id}">
          <div class="acc-h"><span class="check" role="checkbox" aria-checked="${!!isDone}" title="Mark as reviewed"></span>
            <h3>${s.title}</h3><span class="badge tagb">${s.tag}</span><span class="chev">▾</span></div>
          <div class="acc-b"><div class="note-body">${s.html}</div>
            ${s.figs.length ? `<div class="inline-figs">${s.figs.map((f) => figThumb(ch, f, false)).join("")}</div>` : ""}
            <div class="row" style="margin-top:14px"><button class="btn sm ${isDone ? "ghost" : "primary"} markbtn">${isDone ? "✓ Reviewed" : "Mark as reviewed"}</button></div>
          </div></div>`;
      }).join("")}
      <div class="glass card row"><div><b>Ready?</b><div class="muted small">Test yourself on this chapter IMAT-style.</div></div><span class="spacer"></span><a class="btn primary" href="#/ch/${ch}/test">Start a test →</a></div>`;

    const toggleDone = (id) => {
      S.reviewed[ch] = S.reviewed[ch] || {};
      S.reviewed[ch][id] = !S.reviewed[ch][id];
      save();
      if (S.reviewed[ch][id]) toast("Section marked as reviewed ✓");
      viewReview(ch, el);
    };
    rv.querySelectorAll(".acc").forEach((a) => {
      const id = a.dataset.id;
      $(".acc-h", a).onclick = (e) => {
        if (e.target.closest(".check")) return toggleDone(id);
        ui.open.has(id) ? ui.open.delete(id) : ui.open.add(id);
        a.classList.toggle("open");
      };
      $(".markbtn", a).onclick = () => toggleDone(id);
    });
    $("#expAll", rv).onclick = () => { C.sections.forEach((s) => ui.open.add(s.id)); viewReview(ch, el); };
    $("#colAll", rv).onclick = () => { ui.open.clear(); viewReview(ch, el); };
    bindFigThumbs(ch, rv);
  }

  function viewCards(ch, el) {
    const C = D.chapters[ch];
    const st = (S.cards[ch] = S.cards[ch] || {});
    const fc = ui.fc;
    let deck = C.flashcards.filter((c) => fc.filter === "all" || st[c.id] !== "known");
    if (!fc.order || fc.order.length !== deck.length) fc.order = deck.map((_, i) => i);
    const known = C.flashcards.filter((c) => st[c.id] === "known").length;
    if (!deck.length) {
      el.innerHTML = `<div class="glass card empty"><div class="big">🎉</div><b>All cards known!</b><p>You marked every key word as known.</p><button class="btn primary" id="showAll">Show all cards</button></div>`;
      $("#showAll", el).onclick = () => { fc.filter = "all"; fc.i = 0; fc.order = null; viewCards(ch, el); };
      return;
    }
    fc.i = Math.min(fc.i, deck.length - 1);
    const card = deck[fc.order[fc.i]];
    el.innerHTML = `
      <div class="row" style="margin-bottom:10px">
        <span class="chip ${fc.filter === "all" ? "on" : ""}" data-f="all">All (${C.flashcards.length})</span>
        <span class="chip ${fc.filter === "learn" ? "on" : ""}" data-f="learn">Still learning (${C.flashcards.length - known})</span>
        <span class="spacer"></span><button class="btn sm ghost" id="shuf">🔀 Shuffle</button>
      </div>
      <div class="bar"><i style="width:${pct(known, C.flashcards.length)}%"></i></div>
      <p class="muted small" style="margin:6px 0 0">${known}/${C.flashcards.length} known · card ${fc.i + 1}/${deck.length}</p>
      <div class="fc-wrap"><div class="fc ${fc.flip ? "flip" : ""}" id="fc">
        <div class="fc-face fc-front"><span class="badge cyan" style="margin-bottom:12px">KEY WORD</span><h3>${esc(card.front)}</h3><span class="fc-hint">tap to flip</span></div>
        <div class="fc-face fc-back"><div>${esc(card.back)}</div><span class="fc-hint">tap to flip back</span></div>
      </div></div>
      <div class="row" style="justify-content:center">
        <button class="btn" id="prev">‹</button>
        <button class="btn danger" id="learn">Still learning</button>
        <button class="btn primary" id="known">Got it ✓</button>
        <button class="btn" id="next">›</button>
      </div>`;
    const go = (d) => { fc.i = (fc.i + d + deck.length) % deck.length; fc.flip = false; viewCards(ch, el); };
    $("#fc", el).onclick = () => { fc.flip = !fc.flip; $("#fc", el).classList.toggle("flip"); };
    $("#prev", el).onclick = () => go(-1);
    $("#next", el).onclick = () => go(1);
    $("#known", el).onclick = () => { st[card.id] = "known"; save(); if (fc.filter === "learn") { fc.order = null; fc.flip = false; viewCards(ch, el); } else go(1); };
    $("#learn", el).onclick = () => { st[card.id] = "learning"; save(); go(1); };
    $("#shuf", el).onclick = () => { fc.order = shuffle(deck.map((_, i) => i)); fc.i = 0; fc.flip = false; viewCards(ch, el); toast("Shuffled"); };
    el.querySelectorAll("[data-f]").forEach((c) => (c.onclick = () => { fc.filter = c.dataset.f; fc.i = 0; fc.order = null; fc.flip = false; viewCards(ch, el); }));
  }

  /* ----------------------------------------------------------------- TEST */
  const setup = { n: 20, mode: "exam", timer: true, topics: null };

  function viewTest(ch, el) {
    if (T && T.ch === ch && !T.done) return runTest(el);
    if (T && T.ch === ch && T.done) return viewResults(el);
    const C = D.chapters[ch];
    if (!setup.topics || setup.ch !== ch) { setup.topics = new Set(Object.keys(C.topics)); setup.ch = ch; }
    const pool = C.questions.filter((q) => setup.topics.has(q.topic));
    const nOpts = [10, 15, 20, "all"];
    el.innerHTML = `
      <div class="glass card">
        <h3 class="h-glow" style="font-size:22px">IMAT-style test</h3>
        <p class="muted small" style="margin-top:0">${C.questions.length} questions in the bank for this chapter · 5 options (A–E) · one correct answer.</p>
        <div class="setup-grid">
          <div class="opt-group"><label class="lbl">Number of questions</label><div class="row">
            ${nOpts.map((n) => `<span class="chip ${setup.n === n ? "on" : ""}" data-n="${n}">${n === "all" ? `All (${pool.length})` : n}</span>`).join("")}</div></div>
          <div class="opt-group"><label class="lbl">Mode</label><div class="row">
            <span class="chip ${setup.mode === "exam" ? "on" : ""}" data-mode="exam">🎯 Exam — results at the end</span>
            <span class="chip ${setup.mode === "practice" ? "on" : ""}" data-mode="practice">💡 Practice — instant feedback</span></div></div>
          <div class="opt-group"><label class="lbl">Timer (IMAT pace: 100 s / question)</label><div class="row">
            <span class="chip ${setup.timer ? "on" : ""}" data-t="1">⏱ On</span><span class="chip ${!setup.timer ? "on" : ""}" data-t="0">Off</span></div></div>
          <div class="opt-group"><label class="lbl">Topics</label><div class="row">
            ${Object.entries(C.topics).map(([k, v]) => `<span class="chip ${setup.topics.has(k) ? "on" : ""}" data-topic="${k}">${v} <span class="muted">${C.questions.filter((q) => q.topic === k).length}</span></span>`).join("")}</div></div>
        </div>
        <button class="btn primary block" id="start" style="margin-top:18px" ${pool.length ? "" : "disabled"}>Start test · ${Math.min(setup.n === "all" ? pool.length : setup.n, pool.length)} questions</button>
      </div>
      <div class="glass card">
        <b>How IMAT scoring works</b>
        <div class="kpis" style="grid-template-columns:repeat(3,1fr)">
          <div class="kpi g"><b>+1.5</b><span>correct</span></div><div class="kpi r"><b>−0.4</b><span>wrong</span></div><div class="kpi y"><b>0</b><span>blank</span></div>
        </div>
        <p class="muted small" style="margin-bottom:0">Strategy: a blind guess among 5 loses on average (0.2×1.5 − 0.8×0.4 = −0.02). Guess only if you can eliminate at least one option. Wrong and skipped questions are saved to <b>Mistakes</b>.</p>
      </div>`;
    el.querySelectorAll("[data-n]").forEach((c) => (c.onclick = () => { setup.n = c.dataset.n === "all" ? "all" : +c.dataset.n; viewTest(ch, el); }));
    el.querySelectorAll("[data-mode]").forEach((c) => (c.onclick = () => { setup.mode = c.dataset.mode; viewTest(ch, el); }));
    el.querySelectorAll("[data-t]").forEach((c) => (c.onclick = () => { setup.timer = c.dataset.t === "1"; viewTest(ch, el); }));
    el.querySelectorAll("[data-topic]").forEach((c) => (c.onclick = () => { const k = c.dataset.topic; setup.topics.has(k) ? setup.topics.delete(k) : setup.topics.add(k); viewTest(ch, el); }));
    $("#start", el).onclick = () => {
      const n = setup.n === "all" ? pool.length : Math.min(setup.n, pool.length);
      startTest(ch, shuffle(pool).slice(0, n), { mode: setup.mode, timer: setup.timer, source: "test" });
    };
  }

  function startTest(ch, qs, { mode, timer, source }) {
    T = {
      ch, mode, source, cur: 0, done: false, start: Date.now(),
      qs: qs.map((q) => ({ id: q.id, order: q.fixed ? [0, 1, 2, 3, 4] : shuffle([0, 1, 2, 3, 4]) })),
      ans: qs.map(() => null), flags: qs.map(() => false), locked: qs.map(() => false),
    };
    T.deadline = timer ? T.start + qs.length * IMAT.secPerQ * 1000 : null;
    if (location.hash !== `#/ch/${ch}/test`) location.hash = `#/ch/${ch}/test`;
    else route();
  }

  function runTest(el) {
    const ch = T.ch, C = D.chapters[ch];
    const i = T.cur, item = T.qs[i], q = qById(ch, item.id);
    const answered = T.ans.filter((a) => a !== null).length;
    const practice = T.mode === "practice";
    const locked = T.locked[i];
    el.innerHTML = `
      <div class="glass card">
        <div class="qhead">
          <span class="badge ${practice ? "pink" : "cyan"}">${T.source === "mistakes" ? "Mistakes practice" : practice ? "Practice" : "Exam"}</span>
          <b>Q ${i + 1}/${T.qs.length}</b>
          <span class="spacer"></span>
          ${T.deadline ? `<span class="timer" id="timer">--:--</span>` : ""}
          <button class="btn sm violet" id="finish">Finish</button>
        </div>
        <div class="bar"><i style="width:${pct(answered, T.qs.length)}%"></i></div>
        <div class="qnav" id="qnav" style="margin-top:10px">${T.qs.map((it, k) => {
          let cls = "qdot";
          if (practice && T.locked[k]) cls += T.ans[k] === qById(ch, it.id).a ? " ok" : " bad";
          else if (T.ans[k] !== null) cls += " ans";
          if (k === i) cls += " cur";
          if (T.flags[k]) cls += " flag";
          return `<button class="${cls}" data-k="${k}">${T.flags[k] ? "⚑" : k + 1}</button>`;
        }).join("")}</div>
      </div>
      <div class="glass card">
        <div class="row" style="margin-bottom:6px"><span class="badge">${C.topics[q.topic]}</span></div>
        <div class="qtext">${esc(q.q)}</div>
        <div class="opts">${item.order.map((oi, pos) => {
          let cls = "opt";
          if (T.ans[i] === oi) cls += " sel";
          if (practice && locked) { if (oi === q.a) cls += " correct"; else if (T.ans[i] === oi) cls += " wrong"; }
          return `<button class="${cls}" data-oi="${oi}" ${practice && locked ? "disabled" : ""}><span class="L">${LETTERS[pos]}</span><span>${esc(q.o[oi])}</span></button>`;
        }).join("")}</div>
        ${practice && locked ? explainBox(q, T.ans[i]) : ""}
        <div class="qfoot">
          <button class="btn" id="prev" ${i === 0 ? "disabled" : ""}>‹ Prev</button>
          ${!practice ? `<button class="btn ghost" id="flag">${T.flags[i] ? "⚑ Unflag" : "⚑ Flag"}</button><button class="btn ghost" id="clear" ${T.ans[i] === null ? "disabled" : ""}>Clear</button>` : ""}
          <span class="spacer"></span>
          ${i < T.qs.length - 1 ? `<button class="btn primary" id="next">Next ›</button>` : `<button class="btn violet" id="finish2">Finish ✓</button>`}
        </div>
        <p class="scoring" style="margin:12px 0 0">Tip: keys A–E or 1–5 to answer, ← → to move.</p>
      </div>`;

    el.querySelectorAll(".opt").forEach((b) => (b.onclick = () => choose(+b.dataset.oi)));
    el.querySelectorAll(".qdot").forEach((b) => (b.onclick = () => { T.cur = +b.dataset.k; runTest(el); }));
    $("#prev", el).onclick = () => { T.cur--; runTest(el); };
    const nx = $("#next", el); if (nx) nx.onclick = () => { T.cur++; runTest(el); window.scrollTo({ top: 0, behavior: "smooth" }); };
    const fl = $("#flag", el); if (fl) fl.onclick = () => { T.flags[i] = !T.flags[i]; runTest(el); };
    const cl = $("#clear", el); if (cl) cl.onclick = () => { T.ans[i] = null; runTest(el); };
    $("#finish", el).onclick = confirmFinish;
    const f2 = $("#finish2", el); if (f2) f2.onclick = confirmFinish;
    const cur = $(".qdot.cur", el); if (cur) cur.scrollIntoView({ block: "nearest", inline: "center" });

    function choose(oi) {
      if (practice) { if (locked) return; T.ans[i] = oi; T.locked[i] = true; }
      else T.ans[i] = T.ans[i] === oi ? null : oi;
      runTest(el);
    }
    function confirmFinish() {
      const blank = T.ans.filter((a) => a === null).length;
      if (blank && !confirm(`${blank} question(s) unanswered — they score 0. Finish anyway?`)) return;
      finishTest();
    }
    document.onkeydown = (e) => {
      if (!T || T.done || !$("#qnav")) return;
      const k = e.key.toUpperCase();
      let pos = LETTERS.indexOf(k); if (pos < 0 && /^[1-5]$/.test(k)) pos = +k - 1;
      if (pos >= 0) choose(item.order[pos]);
      else if (e.key === "ArrowRight" && T.cur < T.qs.length - 1) { T.cur++; runTest(el); }
      else if (e.key === "ArrowLeft" && T.cur > 0) { T.cur--; runTest(el); }
    };
    tick();
    clearInterval(timerId);
    if (T.deadline) timerId = setInterval(tick, 1000);
  }

  function tick() {
    if (!T || !T.deadline || T.done) return;
    const left = (T.deadline - Date.now()) / 1000;
    const tEl = $("#timer");
    if (tEl) { tEl.textContent = fmtTime(left); tEl.classList.toggle("low", left < 60); }
    if (left <= 0) { clearInterval(timerId); toast("⏰ Time's up!"); finishTest(); }
  }

  function explainBox(q, chosen) {
    const ok = chosen === q.a;
    return `<div class="explain"><b style="color:${ok ? "var(--ok)" : "var(--red)"}">${ok ? "✓ Correct" : chosen === null ? "Skipped" : "✗ Not quite"}</b> — correct answer: <b>${esc(q.o[q.a])}</b><div style="margin-top:6px">${esc(q.e)}</div><div class="tipline">💡 ${esc(q.tip)}</div></div>`;
  }

  function finishTest() {
    clearInterval(timerId);
    document.onkeydown = null;
    const ch = T.ch, C = D.chapters[ch];
    let c = 0, w = 0, b = 0; const per = {};
    S.mistakes[ch] = S.mistakes[ch] || {};
    T.qs.forEach((it, k) => {
      const q = qById(ch, it.id), a = T.ans[k];
      per[q.topic] = per[q.topic] || [0, 0]; per[q.topic][1]++;
      const st = (S.qstats[q.id] = S.qstats[q.id] || { seen: 0, correct: 0 });
      st.seen++;
      if (a === q.a) {
        c++; per[q.topic][0]++; st.correct++;
        if (T.source === "mistakes" && S.mistakes[ch][q.id]) { delete S.mistakes[ch][q.id]; S.mastered++; }
      } else {
        a === null ? b++ : w++;
        const m = S.mistakes[ch][q.id] || { times: 0 };
        m.times++; m.last = a; m.date = Date.now();
        S.mistakes[ch][q.id] = m;
      }
    });
    const score = +(c * IMAT.right + w * IMAT.wrong).toFixed(2);
    T.result = { c, w, b, n: T.qs.length, score, max: T.qs.length * IMAT.right, per, secs: Math.round((Date.now() - T.start) / 1000) };
    S.tests.push({ ch, date: Date.now(), mode: T.mode, source: T.source, ...T.result });
    save();
    T.done = true;
    ui.resultFilter = w + b ? "wrong" : "all";
    route();
    window.scrollTo(0, 0);
  }

  function viewResults(el) {
    const ch = T.ch, C = D.chapters[ch], R = T.result;
    const p = pct(R.c, R.n);
    const msg = p >= 85 ? "Outstanding! 🔥" : p >= 70 ? "Great work! ⚡" : p >= 50 ? "Good — keep pushing 💪" : "Review & retry 📚";
    const r = 74, circ = 2 * Math.PI * r;
    const list = T.qs.map((it, k) => ({ it, k, q: qById(ch, it.id), a: T.ans[k] }))
      .filter((x) => ui.resultFilter === "all" || x.a !== x.q.a);
    el.innerHTML = `
      <div class="glass result-hero">
        <div class="big-ring"><svg viewBox="0 0 170 170"><circle cx="85" cy="85" r="${r}" stroke="rgba(255,255,255,.08)"/><circle cx="85" cy="85" r="${r}" stroke="url(#gr)" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ * (1 - p / 100)}" style="filter:drop-shadow(0 0 8px var(--cyan))"/></svg>
          <div class="lab"><div><b class="h-glow">${p}%</b><span class="muted small">${R.c}/${R.n} correct</span></div></div></div>
        <h2>${msg}</h2>
        <p class="muted" style="margin:4px 0 0">IMAT score <b style="color:var(--cyan)">${R.score}</b> / ${R.max} · time ${fmtTime(R.secs)}</p>
        <div class="kpis">
          <div class="kpi g"><b>${R.c}</b><span>correct +${(R.c * 1.5).toFixed(1)}</span></div>
          <div class="kpi r"><b>${R.w}</b><span>wrong −${(R.w * 0.4).toFixed(1)}</span></div>
          <div class="kpi y"><b>${R.b}</b><span>blank 0</span></div>
          <div class="kpi c"><b>${R.score}</b><span>IMAT points</span></div>
        </div>
        <div class="row" style="justify-content:center;margin-top:16px">
          ${R.w + R.b ? `<a class="btn violet" href="#/ch/${ch}/mistakes">Go to mistakes (${R.w + R.b})</a>` : ""}
          <button class="btn primary" id="again">New test</button>
        </div>
      </div>
      <div class="glass card"><b>By topic</b>
        ${Object.entries(R.per).map(([k, [cc, tt]]) => `<div class="topic-row"><div class="row"><span>${C.topics[k]}</span><span class="muted">${cc}/${tt}</span></div><div class="bar"><i style="width:${pct(cc, tt)}%"></i></div></div>`).join("")}
      </div>
      <div class="row" style="margin:16px 0 10px"><b>Answer review</b><span class="spacer"></span>
        <span class="chip ${ui.resultFilter === "wrong" ? "on" : ""}" data-rf="wrong">Wrong & blank</span><span class="chip ${ui.resultFilter === "all" ? "on" : ""}" data-rf="all">All</span></div>
      ${list.length ? list.map(({ k, q, a }) => reviewItem(ch, q, a, k + 1)).join("") : `<div class="glass card empty"><div class="big">🏆</div>No mistakes in this test!</div>`}`;
    $("#again", el).onclick = () => { T = null; route(); };
    el.querySelectorAll("[data-rf]").forEach((c) => (c.onclick = () => { ui.resultFilter = c.dataset.rf; viewResults(el); }));
  }

  function reviewItem(ch, q, a, num, extra = "") {
    const C = D.chapters[ch];
    const st = a === q.a ? "ok" : a === null ? "blank" : "bad";
    return `<div class="rev-item ${st}">
      <div class="row"><span class="badge">${num ? "Q" + num + " · " : ""}${C.topics[q.topic]}</span>${extra}</div>
      <div class="q">${esc(q.q)}</div>
      ${st !== "ok" ? `<div class="ans-line u">✗ ${a === null ? "Skipped" : "Your answer: " + esc(q.o[a])}</div>` : ""}
      <div class="ans-line c">✓ ${esc(q.o[q.a])}</div>
      <div class="muted small" style="margin-top:6px">${esc(q.e)}</div>
      <div class="small" style="color:var(--cyan);margin-top:6px;font-weight:600">💡 ${esc(q.tip)}</div>
    </div>`;
  }

  /* -------------------------------------------------------------- FIGURES */
  function figThumb(ch, id, card = true) {
    const f = D.chapters[ch].figures.find((x) => x.id === id);
    if (!f || !FIG[id]) return "";
    return `<div class="glass fig-card" data-fig="${id}" ${card ? "" : 'style="box-shadow:none"'}>
      <div class="fig">${FIG[id]()}</div><h4>${esc(f.title)}</h4><div class="muted small">${card ? esc(f.caption) : "Tap to enlarge"}</div></div>`;
  }
  function bindFigThumbs(ch, root) { root.querySelectorAll("[data-fig]").forEach((c) => (c.onclick = () => openFigure(ch, c.dataset.fig))); }

  function viewFigures(ch, el) {
    const C = D.chapters[ch];
    el.innerHTML = `
      <div class="glass card row"><div><b>Figures · ${C.figures.length}</b><div class="muted small">Redrawn clean and scalable. Tap to enlarge, zoom, and try <b>Label quiz</b> (labels hidden — tap to reveal).</div></div></div>
      <div class="fig-grid">${C.figures.map((f) => figThumb(ch, f.id)).join("")}</div>`;
    bindFigThumbs(ch, el);
  }

  function openFigure(ch, id) {
    const f = D.chapters[ch].figures.find((x) => x.id === id);
    const m = $("#modal");
    let z = 1;
    m.innerHTML = `<div class="glass modal-box">
      <div class="modal-head"><h3>${esc(f.title)}</h3>
        <button class="btn sm" id="zo" aria-label="Zoom out">−</button><button class="btn sm" id="zi" aria-label="Zoom in">+</button>
        <button class="btn sm" id="qz">🙈 Label quiz</button><button class="btn sm ghost" id="xx" aria-label="Close">✕</button></div>
      <div class="zoomwrap"><div class="fig" id="bigfig">${FIG[id]()}</div></div>
      <p style="margin:12px 0 0">${esc(f.caption)}</p>
      <ul class="points">${f.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>`;
    m.classList.remove("hidden");
    const big = $("#bigfig", m);
    const setZ = () => { big.style.width = z * 100 + "%"; };
    $("#zi", m).onclick = () => { z = Math.min(3, z + 0.5); setZ(); };
    $("#zo", m).onclick = () => { z = Math.max(1, z - 0.5); setZ(); };
    $("#qz", m).onclick = (e) => { big.classList.toggle("quiz"); big.querySelectorAll("text.q").forEach((t) => t.classList.remove("show")); e.target.textContent = big.classList.contains("quiz") ? "👁 Show labels" : "🙈 Label quiz"; };
    big.onclick = (e) => { const tx = e.target.closest("text.q"); if (tx && big.classList.contains("quiz")) tx.classList.toggle("show"); };
    $("#xx", m).onclick = closeModal;
    m.onclick = (e) => { if (e.target === m) closeModal(); };
  }
  function closeModal() { const m = $("#modal"); m.classList.add("hidden"); m.innerHTML = ""; }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  /* ------------------------------------------------------------- MISTAKES */
  function viewMistakes(ch, el) {
    const C = D.chapters[ch];
    const M = S.mistakes[ch] || {};
    const ids = Object.keys(M).sort((a, b) => M[b].times - M[a].times || M[b].date - M[a].date);
    if (!ids.length) {
      el.innerHTML = `<div class="glass card empty"><div class="big">✨</div><h3>No mistakes saved</h3><p>Wrong and skipped answers from your tests appear here with explanations and key notes.${S.mastered ? `<br>You have mastered <b>${S.mastered}</b> mistake(s) so far.` : ""}</p><a class="btn primary" href="#/ch/${ch}/test">Take a test</a></div>`;
      return;
    }
    const topicsHere = [...new Set(ids.map((id) => qById(ch, id).topic))];
    if (ui.mistakeTopic !== "all" && !topicsHere.includes(ui.mistakeTopic)) ui.mistakeTopic = "all";
    const shown = ids.filter((id) => ui.mistakeTopic === "all" || qById(ch, id).topic === ui.mistakeTopic);
    const tips = [...new Set(ids.map((id) => qById(ch, id).tip))];
    el.innerHTML = `
      <div class="glass card">
        <div class="row"><div><h3 style="margin:0">${ids.length} question(s) to fix</h3><div class="muted small">Answer them correctly in Mistakes practice to clear them · mastered so far: ${S.mastered}</div></div>
          <span class="spacer"></span><button class="btn violet" id="pm">Practise mistakes</button></div>
      </div>
      <div class="glass card">
        <b>📌 Key notes from your mistakes</b>
        <ul class="points">${tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>
      <div class="row" style="margin:6px 0 12px">
        <span class="chip ${ui.mistakeTopic === "all" ? "on" : ""}" data-mt="all">All (${ids.length})</span>
        ${topicsHere.map((k) => `<span class="chip ${ui.mistakeTopic === k ? "on" : ""}" data-mt="${k}">${C.topics[k]}</span>`).join("")}
      </div>
      ${shown.map((id) => reviewItem(ch, qById(ch, id), M[id].last, 0, `<span class="badge pink">✗ ×${M[id].times}</span><span class="spacer"></span><button class="btn sm ghost" data-done="${id}">Mastered ✓</button>`)).join("")}`;
    $("#pm", el).onclick = () => startTest(ch, shuffle(ids.map((id) => qById(ch, id))), { mode: "practice", timer: false, source: "mistakes" });
    el.querySelectorAll("[data-mt]").forEach((c) => (c.onclick = () => { ui.mistakeTopic = c.dataset.mt; viewMistakes(ch, el); }));
    el.querySelectorAll("[data-done]").forEach((b) => (b.onclick = () => { delete S.mistakes[ch][b.dataset.done]; S.mastered++; save(); toast("Removed from mistakes ✓"); renderChapter(ch, "mistakes"); }));
  }

  /* ------------------------------------------------------------- PROGRESS */
  function viewProgress(ch, el) {
    const C = D.chapters[ch];
    const tests = S.tests.filter((t) => t.ch === ch);
    const avg = tests.length ? Math.round(tests.reduce((a, t) => a + pct(t.c, t.n), 0) / tests.length) : 0;
    const best = tests.length ? Math.max(...tests.map((t) => pct(t.c, t.n))) : 0;
    const bestImat = tests.length ? Math.max(...tests.map((t) => t.score)) : 0;
    const rev = C.sections.filter((s) => (S.reviewed[ch] || {})[s.id]).length;
    const known = Object.values(S.cards[ch] || {}).filter((v) => v === "known").length;
    const seen = C.questions.filter((q) => S.qstats[q.id]).length;
    const last = tests.slice(-10);
    const topicStats = Object.entries(C.topics).map(([k, name]) => {
      const qs = C.questions.filter((q) => q.topic === k);
      let s = 0, c = 0; qs.forEach((q) => { const st = S.qstats[q.id]; if (st) { s += st.seen; c += st.correct; } });
      return { k, name, acc: pct(c, s), s, cover: pct(qs.filter((q) => S.qstats[q.id]).length, qs.length) };
    });
    const weakest = topicStats.filter((t) => t.s).sort((a, b) => a.acc - b.acc)[0];

    el.innerHTML = `
      <div class="glass card" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
        ${ring(chapterProgress(ch), 92, 9)}
        <div style="flex:1;min-width:200px"><h3 style="margin:0">Chapter mastery</h3>
          <div class="muted small">40% notes reviewed · 40% questions solved · 20% flashcards known</div>
          ${weakest ? `<div class="small" style="margin-top:8px">Focus next: <b style="color:var(--pink)">${weakest.name}</b> (${weakest.acc}% accuracy)</div>` : ""}</div>
      </div>
      <div class="prog-grid">
        <div class="glass card"><div class="muted small">Tests taken</div><h2>${tests.length}</h2></div>
        <div class="glass card"><div class="muted small">Average · Best</div><h2>${avg}% <span class="muted" style="font-size:16px">· ${best}%</span></h2></div>
        <div class="glass card"><div class="muted small">Best IMAT points</div><h2 style="color:var(--cyan)">${bestImat}</h2></div>
        <div class="glass card"><div class="muted small">Mistakes open · mastered</div><h2>${mistakeCount(ch)} <span class="muted" style="font-size:16px">· ${S.mastered}</span></h2></div>
      </div>
      <div class="glass card">
        <div class="topic-row"><div class="row"><span>📖 Notes reviewed</span><span class="muted">${rev}/${C.sections.length}</span></div><div class="bar"><i style="width:${pct(rev, C.sections.length)}%"></i></div></div>
        <div class="topic-row"><div class="row"><span>⚡ Flashcards known</span><span class="muted">${known}/${C.flashcards.length}</span></div><div class="bar"><i style="width:${pct(known, C.flashcards.length)}%"></i></div></div>
        <div class="topic-row"><div class="row"><span>🎯 Question bank seen</span><span class="muted">${seen}/${C.questions.length}</span></div><div class="bar"><i style="width:${pct(seen, C.questions.length)}%"></i></div></div>
      </div>
      <div class="glass card"><b>Last ${last.length || ""} tests (% correct)</b>
        ${last.length ? `<div class="chart">${last.map((t) => `<div class="col"><span>${pct(t.c, t.n)}</span><i style="height:${Math.max(3, pct(t.c, t.n))}%"></i></div>`).join("")}</div>` : `<p class="muted small">No tests yet.</p>`}
      </div>
      <div class="glass card"><b>Accuracy by topic</b>
        ${topicStats.map((t) => `<div class="topic-row"><div class="row"><span>${t.name}</span><span class="muted">${t.s ? t.acc + "%" : "—"} · seen ${t.cover}%</span></div><div class="bar"><i style="width:${t.acc}%"></i></div></div>`).join("")}
      </div>
      <div class="glass card"><b>History</b>
        ${tests.length ? tests.slice().reverse().slice(0, 15).map((t) => `<div class="hist-item"><span class="badge ${t.source === "mistakes" ? "pink" : t.mode === "practice" ? "" : "cyan"}">${t.source === "mistakes" ? "Mistakes" : t.mode === "practice" ? "Practice" : "Exam"}</span><span>${new Date(t.date).toLocaleDateString()} ${new Date(t.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span><span class="spacer"></span><b>${t.c}/${t.n}</b><span class="muted">${t.score} pts</span></div>`).join("") : `<p class="muted small">Your test history will appear here.</p>`}
      </div>
      <div class="glass card"><b>Backup</b><p class="muted small" style="margin-top:4px">Progress is saved on this device. Export a backup to move it to another phone or browser.</p>
        <div class="row"><button class="btn sm" id="exp">⬇ Export</button><label class="btn sm">⬆ Import<input type="file" id="imp" accept="application/json" hidden></label><span class="spacer"></span><button class="btn sm danger" id="rst">Reset all</button></div>
      </div>`;
    $("#exp", el).onclick = () => {
      const name = `bioglow-progress-${new Date().toISOString().slice(0, 10)}.json`;
      if (window.AndroidBridge) return window.AndroidBridge.saveFile(name, JSON.stringify(S, null, 2));
      const blob = new Blob([JSON.stringify(S, null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    };
    $("#imp", el).onchange = (e) => {
      const file = e.target.files[0]; if (!file) return;
      file.text().then((txt) => { try { S = Object.assign(fresh(), JSON.parse(txt)); save(); toast("Progress imported ✓"); route(); } catch (err) { toast("Invalid backup file"); } });
    };
    $("#rst", el).onclick = () => { if (confirm("Delete ALL progress, tests and mistakes?")) { S = fresh(); save(); T = null; toast("Progress reset"); route(); } };
  }

  /* ----------------------------------------------------------------- boot */
  document.body.insertAdjacentHTML("afterbegin", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="gr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3ee6d0"/><stop offset=".55" stop-color="#4da3ff"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs></svg>`);
  route();
})();
