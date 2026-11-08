/* ==========================================================================
   Chapter 2 — Biological molecules
   Source: Cambridge International AS & A Level Biology Coursebook, pp. 44–50
   (Sections 2.1 → 2.4, up to and including Practical Activity 2.1 / Question 2)

   To extend this chapter when new pages arrive: add objects to `sections`,
   `flashcards`, `questions` and (if needed) `figures`. Keep ids unique.
   ========================================================================== */
window.BIO_DATA = window.BIO_DATA || { chapters: {} };

window.BIO_DATA.chapters[2] = {
  id: 2,
  title: "Biological molecules",
  pages: "pp. 44–50",
  coverage: "2.1 Biochemistry → 2.4 Carbohydrates (monosaccharides, disaccharides, Benedict's tests)",
  accent: "#3ee6d0",

  topics: {
    basics: "Building blocks & polymers",
    mono: "Monosaccharides",
    ring: "Ring structures & isomers",
    di: "Disaccharides & glycosidic bond",
    tests: "Benedict's tests",
    models: "Atoms & molecular models",
  },

  /* ---------------------------------------------------------------- REVIEW */
  sections: [
    {
      id: "s1",
      title: "Learning intentions & Before you start",
      tag: "Intro",
      figs: ["atoms"],
      html: `
<p>In this chapter you learn how to:</p>
<ul>
  <li>describe how <b class="kw">large biological molecules</b> are made from smaller molecules</li>
  <li>describe the structure of <b>carbohydrates, lipids and proteins</b> and how structure relates to function</li>
  <li>describe and carry out <b>biochemical tests</b> for carbohydrates, lipids and proteins</li>
  <li>explain key <b>properties of water</b> that make life possible</li>
</ul>
<h4>Building molecular models</h4>
<p>Atoms are joined by <b class="kw">covalent bonds</b>. Each atom always forms a fixed number of bonds:</p>
<div class="chip-row">
  <span class="atom-chip c">C = 4 bonds</span>
  <span class="atom-chip n">N = 3 bonds</span>
  <span class="atom-chip o">O = 2 bonds</span>
  <span class="atom-chip h">H = 1 bond</span>
</div>
<p>Model colours: <b>black</b> = carbon, <b>white</b> = hydrogen, <b>red</b> = oxygen, <b>blue</b> = nitrogen. Sticks represent covalent bonds (a double bond = 2 sticks).</p>
<p>Practise with: methane CH<sub>4</sub>, water H<sub>2</sub>O, ethanol C<sub>2</sub>H<sub>5</sub>OH, propane C<sub>3</sub>H<sub>8</sub>, ammonia NH<sub>3</sub>, ethanoic acid CH<sub>3</sub>COOH.</p>
<div class="tip"><b>IMAT trick:</b> number of covalent bonds in a molecule = (sum of every atom's valency) ÷ 2. Ethanoic acid: (2×4 + 4×1 + 2×2) ÷ 2 = <b>8</b> bonds (counting C=O as 2).</div>`
    },
    {
      id: "s2",
      title: "2.1 Biochemistry",
      tag: "2.1",
      figs: [],
      html: `
<p><b class="kw">Biochemistry</b> studies the chemical reactions of biological molecules.</p>
<p><b class="kw">Metabolism</b> = the <b>sum total of all biochemical reactions</b> in the body.</p>
<p>Underlying simplicity: only <b>20 common amino acids</b> are used to make proteins, although millions are theoretically possible. A <b>limited variety of molecules</b> makes metabolism <b>easier to control</b>.</p>
<p>Key theme of the chapter: a close link between the <b>structure</b> of a molecule and its <b>function</b>.</p>`
    },
    {
      id: "s3",
      title: "2.2 The building blocks of life",
      tag: "2.2",
      figs: ["buildingBlocks"],
      html: `
<p>The four most common elements in living organisms, <b>in order of abundance</b>:</p>
<div class="big-order">H &gt; C &gt; O &gt; N</div>
<p>Together they make up <b>more than 99%</b> of the atoms in all living things.</p>
<p><b>Carbon</b> is especially important: carbon atoms join together to form <b>long chains or rings</b> — the <b>skeletons</b> of <b class="kw">organic molecules</b> (molecules that contain carbon). Other atoms with different functions attach to these skeletons.</p>
<p>Before life evolved there was probably a period of <b>chemical evolution</b>: simple carbon-based molecules formed from even simpler ones. These simple biological molecules are <b>limited in variety</b> and act as <b>building blocks</b> for larger, complex molecules.</p>
<table class="mini">
<tr><th>Simple (building block)</th><th>→ Complex molecule</th></tr>
<tr><td>monosaccharides</td><td>polysaccharides</td></tr>
<tr><td>organic bases (+ sugar + phosphate) → nucleotides</td><td>nucleic acids</td></tr>
<tr><td>amino acids</td><td>proteins</td></tr>
<tr><td>fatty acids + glycerol</td><td>lipids</td></tr>
</table>`
    },
    {
      id: "s4",
      title: "2.3 Monomers, polymers & macromolecules",
      tag: "2.3",
      figs: ["condensation"],
      html: `
<p>A <b class="kw">macromolecule</b> is a giant molecule. There are <b>three</b> types in living organisms:</p>
<ul>
  <li><b>polysaccharides</b></li>
  <li><b>proteins</b> (polypeptides)</li>
  <li><b>nucleic acids</b> (polynucleotides)</li>
</ul>
<p>'Poly' = many. Macromolecules are <b class="kw">polymers</b>: made of many repeating subunits that are similar or identical — the <b class="kw">monomers</b> ('mono' = one).</p>
<p>Monomers are joined by <b class="kw">covalent bonds</b> (atoms share electrons; relatively strong). Examples in this chapter: <b>glycosidic bond</b>, <b>ester bond</b>, <b>peptide bond</b>.</p>
<div class="two-col">
  <div class="pill-card cyan"><h5>Condensation</h5><p>joins two molecules by <b>removing</b> a water molecule. Repeated many times → polymer.</p></div>
  <div class="pill-card pink"><h5>Hydrolysis</h5><p>breaks a bond by <b>adding</b> a water molecule. Splits polymer → monomers.</p></div>
</div>
<p>Monomers: <b>monosaccharides</b> (→ polysaccharides), <b>amino acids</b> (→ proteins), <b>nucleotides</b> (→ nucleic acids).</p>
<div class="warn"><b>Trap:</b> <b>organic bases are NOT monomers</b> (they are part of nucleotides) and <b>lipids are NOT polymers</b> (fatty acids + glycerol are not repeating monomers).</div>
<p>Natural polymers: <b>cellulose, rubber</b>. Industrial polymers: <b>polyester, polythene, PVC, nylon</b> — all carbon-based monomers joined end to end.</p>`
    },
    {
      id: "s5",
      title: "2.4 Carbohydrates & monosaccharides",
      tag: "2.4",
      figs: ["glucoseChain"],
      html: `
<p>All carbohydrates contain <b>C, H and O</b>. 'Hydrate' refers to water: H and O are present in a <b>2 : 1 ratio</b>, as in water.</p>
<div class="formula">General formula: C<sub>x</sub>(H<sub>2</sub>O)<sub>y</sub></div>
<p>Three groups: <b>monosaccharides, disaccharides, polysaccharides</b> ('saccharide' = sugar).</p>
<h4>Monosaccharides</h4>
<p><b class="kw">Monosaccharides</b> are sugars: they <b>dissolve easily in water</b> to form <b>sweet</b> solutions. A single sugar unit with formula <b>(CH<sub>2</sub>O)<sub>n</sub></b>.</p>
<table class="mini">
<tr><th>Type</th><th>Carbons</th><th>Formula</th><th>Examples</th></tr>
<tr><td>triose</td><td>3C</td><td>C<sub>3</sub>H<sub>6</sub>O<sub>3</sub></td><td>—</td></tr>
<tr><td>pentose</td><td>5C</td><td>C<sub>5</sub>H<sub>10</sub>O<sub>5</sub></td><td>ribose, deoxyribose</td></tr>
<tr><td>hexose</td><td>6C</td><td>C<sub>6</sub>H<sub>12</sub>O<sub>6</sub></td><td>glucose, fructose, galactose</td></tr>
</table>
<p>The names of all sugars end in <b>-ose</b>.</p>
<h4>Molecular vs structural formula</h4>
<p><b>Molecular formula</b> (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>) only counts atoms. The <b>structural formula</b> shows how the atoms are arranged. Glucose (most common monosaccharide, a hexose) has <b>five –OH (hydroxyl) groups</b>.</p>
<div class="tip"><b>Question 1:</b> triose = C<sub>3</sub>H<sub>6</sub>O<sub>3</sub>; pentose = C<sub>5</sub>H<sub>10</sub>O<sub>5</sub>. Rule: (CH<sub>2</sub>O)<sub>n</sub> → C<sub>n</sub>H<sub>2n</sub>O<sub>n</sub>.</div>`
    },
    {
      id: "s6",
      title: "Ring structures: α- and β-glucose",
      tag: "2.4",
      figs: ["alphaBeta"],
      html: `
<p>In pentoses and hexoses the carbon chain is long enough to <b>close up into a more stable ring</b>.</p>
<p>In glucose: <b>carbon 1 joins to the oxygen on carbon 5</b>. So the ring <b>contains an oxygen</b>, and <b>carbon 6 is not part of the ring</b> (it sticks out as CH<sub>2</sub>OH).</p>
<div class="two-col">
  <div class="pill-card cyan"><h5>α-glucose</h5><p>–OH on <b>C1 below</b> the plane of the ring</p></div>
  <div class="pill-card violet"><h5>β-glucose</h5><p>–OH on <b>C1 above</b> the plane of the ring</p></div>
</div>
<p>Two forms of the same chemical = <b class="kw">isomers</b> (same molecular formula, different structure). The α/β variety has big biological consequences: <b>starch, glycogen and cellulose</b>.</p>
<div class="tip"><b>Memory:</b> <b>α</b> = "<b>A</b>way / below", <b>β</b> = "<b>B</b>e above". Only the C1 –OH differs.</div>`
    },
    {
      id: "s7",
      title: "Functions of monosaccharides",
      tag: "2.4",
      figs: [],
      html: `
<h4>1 · Source of energy in respiration</h4>
<p>Due to the <b>large number of carbon–hydrogen bonds</b>. Breaking them releases a lot of energy, transferred to make <b>ATP</b> (adenosine triphosphate) from <b>ADP</b> (adenosine diphosphate) + phosphate. Most important monosaccharide in energy metabolism: <b>glucose</b>.</p>
<h4>2 · Building blocks for larger molecules</h4>
<table class="mini">
<tr><th>Monosaccharide</th><th>Used to make</th></tr>
<tr><td>glucose (hexose)</td><td>polysaccharides starch, glycogen, cellulose</td></tr>
<tr><td>ribose (pentose)</td><td>RNA and ATP</td></tr>
<tr><td>deoxyribose (pentose)</td><td>DNA</td></tr>
</table>`
    },
    {
      id: "s8",
      title: "Disaccharides & the glycosidic bond",
      tag: "2.4",
      figs: ["maltose", "sucrose"],
      html: `
<p><b class="kw">Disaccharides</b> are sugars made of <b>two monosaccharides</b> joined by a <b>glycosidic bond</b> ('di' = two).</p>
<table class="mini">
<tr><th>Disaccharide</th><th>Monomers</th><th>Notes</th></tr>
<tr><td><b>maltose</b></td><td>α-glucose + α-glucose</td><td>1,4 glycosidic bond</td></tr>
<tr><td><b>sucrose</b></td><td>α-glucose + β-fructose</td><td>transport sugar in plants; table sugar; <b>non-reducing</b></td></tr>
<tr><td><b>lactose</b></td><td>glucose + galactose</td><td>milk sugar; important in the diet of young mammals</td></tr>
</table>
<h4>How the bond forms (condensation)</h4>
<p>Two hydroxyl (–OH) groups line up. One combines with a <b>hydrogen atom</b> from the other to form <b>water</b>. This leaves an <b>oxygen 'bridge'</b> holding the two molecules together = the <b class="kw">glycosidic bond</b> (a C–O–C covalent link).</p>
<p>Maltose: bond between <b>C1 and C4</b> of neighbouring glucose molecules (can repeat → polysaccharide). Note that <b>fructose has a different (5-membered) ring</b> from glucose.</p>
<p>Many disaccharides are possible in theory (many –OH groups), but the <b>shape of the enzyme</b> controlling the reaction determines which –OH groups line up, so only a few are common in nature.</p>
<p><b>Hydrolysis</b> (adding water) happens during <b>digestion</b> of disaccharides and polysaccharides → monosaccharides.</p>`
    },
    {
      id: "s9",
      title: "Practical 2.1: Testing for sugars",
      tag: "Practical",
      figs: ["benedict", "nonReducing"],
      html: `
<h4>1 · Reducing sugars — Benedict's test</h4>
<p><b class="kw">Reducing sugars</b> can carry out <b>reduction</b>; in the process they are <b>oxidised</b>. They include <b>all monosaccharides</b> and <b>some disaccharides</b> (e.g. maltose, lactose). The only common <b>non-reducing</b> sugar is <b>sucrose</b>.</p>
<p><b>Benedict's reagent</b> = <b>copper(II) sulfate in an alkaline solution</b> (blue).</p>
<div class="formula">reducing sugar + Cu<sup>2+</sup> (blue) → oxidised sugar + Cu<sup>+</sup> (red-brown)</div>
<p>Soluble blue copper(II) sulfate is reduced to <b>insoluble brick-red copper(I) oxide</b> precipitate.</p>
<p><b>Procedure:</b> add Benedict's reagent, <b>heat in a water bath</b>. If reducing sugar is present: <b>blue → green → yellow → orange → red-brown</b>.</p>
<h4>Semi-quantitative use</h4>
<p>With <b>excess</b> Benedict's reagent, the colour intensity is related to the <b>concentration</b> of reducing sugar. Estimate concentration by:</p>
<ul>
<li>comparing with <b>colour standards</b> (known concentrations)</li>
<li>measuring the <b>time for the first colour change</b></li>
<li>using a <b>colorimeter</b> (more precise for small differences)</li>
</ul>
<h4>2 · Non-reducing sugars (e.g. sucrose)</h4>
<ol>
<li>Benedict's test → negative (stays blue).</li>
<li><b>Fresh sample</b> + <b>hydrochloric acid</b>, heat → <b>hydrolysis</b> into monosaccharides (reducing).</li>
<li><b>Neutralise</b> with an alkali, e.g. <b>sodium hydroxide</b> (Benedict's needs <b>alkaline</b> conditions).</li>
<li>Add Benedict's, heat. <b>Red</b> → non-reducing sugar present. Still blue → <b>no sugar of any kind</b>.</li>
</ol>
<p>If both reducing and non-reducing sugars are present, the precipitate after hydrolysis is <b>heavier</b> than in the first test.</p>
<div class="tip"><b>Q2a:</b> excess reagent so that <b>all</b> the sugar can react — Cu<sup>2+</sup> is never limiting, so the amount of precipitate/colour depends only on sugar concentration.<br><b>Q2b:</b> make a dilution series of known concentrations, do Benedict's on each under identical conditions (volume, temperature, time) → colour standards; test the unknown and match its colour (or use a colorimeter / time to first colour change).</div>`
    }
  ],

  /* ------------------------------------------------------------- FLASHCARDS */
  flashcards: [
    { id: "k1", front: "Macromolecule", back: "A large molecule such as a polysaccharide, protein or nucleic acid." },
    { id: "k2", front: "Polymer", back: "A giant molecule made from many similar repeating subunits (monomers) joined together in a chain, e.g. polysaccharides, proteins, nucleic acids." },
    { id: "k3", front: "Monomer", back: "A relatively simple molecule used as a basic building block for a polymer; joined by covalent bonds usually by condensation. E.g. monosaccharides, amino acids, nucleotides." },
    { id: "k4", front: "Condensation reaction", back: "A chemical reaction joining two molecules together by removal of a water molecule." },
    { id: "k5", front: "Hydrolysis", back: "A reaction in which a chemical bond is broken by the addition of a water molecule; used to break complex molecules into simpler ones." },
    { id: "k6", front: "Monosaccharide", back: "A molecule consisting of a single sugar unit, general formula (CH₂O)ₙ." },
    { id: "k7", front: "Disaccharide", back: "A sugar molecule consisting of two monosaccharides joined together by a glycosidic bond." },
    { id: "k8", front: "Glycosidic bond", back: "A C–O–C link between two sugar molecules, formed by a condensation reaction; it is a covalent bond." },
    { id: "k9", front: "Benedict's test", back: "Test for reducing sugars: heat with Benedict's reagent; a change from clear blue to a yellow, red or brown precipitate shows a reducing sugar such as glucose." },
    { id: "k10", front: "Metabolism", back: "The sum total of all the biochemical reactions in the body." },
    { id: "k11", front: "Isomers", back: "Two forms of the same chemical — same molecular formula, different structure (e.g. α- and β-glucose)." },
    { id: "k12", front: "α- vs β-glucose", back: "α: –OH on C1 below the ring. β: –OH on C1 above the ring." },
    { id: "k13", front: "Glucose ring formation", back: "C1 joins to the oxygen on C5; the ring contains O; C6 is outside the ring." },
    { id: "k14", front: "Maltose / Sucrose / Lactose", back: "Maltose = glucose + glucose; Sucrose = glucose + fructose; Lactose = glucose + galactose." },
    { id: "k15", front: "Reducing sugar", back: "A sugar that can reduce Cu²⁺ to Cu⁺ (and is itself oxidised). All monosaccharides + some disaccharides. Sucrose is the common non-reducing sugar." },
    { id: "k16", front: "Benedict's reagent", back: "Copper(II) sulfate in alkaline solution — blue. Reduced to brick-red copper(I) oxide precipitate." },
    { id: "k17", front: "Non-reducing sugar test", back: "Negative Benedict's → fresh sample + HCl, heat (hydrolysis) → neutralise with NaOH → Benedict's again → red = non-reducing sugar." },
    { id: "k18", front: "4 most abundant elements", back: "Hydrogen > carbon > oxygen > nitrogen — over 99% of atoms in living things." },
    { id: "k19", front: "Carbohydrate general formula", back: "Cₓ(H₂O)ᵧ — H and O in a 2 : 1 ratio as in water." },
    { id: "k20", front: "Triose / Pentose / Hexose", back: "3C: C₃H₆O₃ · 5C: C₅H₁₀O₅ (ribose, deoxyribose) · 6C: C₆H₁₂O₆ (glucose, fructose, galactose)." }
  ],

  /* -------------------------------------------------------------- QUESTIONS
     IMAT (MUR) style: 5 options A–E, one correct.  `a` = index of correct.
     `fixed: true` keeps the option order (for statement-combination items). */
  questions: [
    {
      id: "c2q1", topic: "basics",
      q: "Which of the following lists the four most common elements in living organisms in decreasing order of abundance (by number of atoms)?",
      o: ["Carbon, hydrogen, oxygen, nitrogen", "Hydrogen, carbon, oxygen, nitrogen", "Oxygen, carbon, hydrogen, nitrogen", "Hydrogen, oxygen, carbon, nitrogen", "Carbon, oxygen, nitrogen, hydrogen"],
      a: 1,
      e: "By number of atoms the order is H > C > O > N, together over 99% of atoms in living things. (By mass oxygen would be first — the question is about atoms.)",
      tip: "Atoms: H > C > O > N (remember 'HCON')."
    },
    {
      id: "c2q2", topic: "basics",
      q: "Which of the following is NOT a polymer?",
      o: ["Glycogen", "DNA", "Triglyceride (lipid)", "Haemoglobin", "Cellulose"],
      a: 2,
      e: "Lipids are made from fatty acids and glycerol, which are not repeating monomers, so lipids are not polymers. Glycogen and cellulose are polysaccharides, DNA is a polynucleotide and haemoglobin is a protein.",
      tip: "Lipids are big molecules but NOT polymers."
    },
    {
      id: "c2q3", topic: "basics",
      q: "Which statement correctly describes a condensation reaction between two monomers?",
      o: ["A water molecule is added and a covalent bond is broken", "A water molecule is removed and a hydrogen bond is formed", "A water molecule is removed and a covalent bond is formed", "A water molecule is added and a covalent bond is formed", "Carbon dioxide is removed and a covalent bond is formed"],
      a: 2,
      e: "Condensation joins two molecules by removing water; the link formed (glycosidic, peptide, ester) is a covalent bond. Adding water to break a bond is hydrolysis.",
      tip: "Condensation = −H₂O, makes a covalent bond. Hydrolysis = +H₂O, breaks it."
    },
    {
      id: "c2q4", topic: "mono",
      q: "Using the general formula of monosaccharides, what is the molecular formula of a pentose?",
      o: ["C₅H₁₂O₅", "C₅H₁₀O₄", "C₅H₁₀O₅", "C₅H₅O₁₀", "C₆H₁₀O₅"],
      a: 2,
      e: "Monosaccharides are (CH₂O)ₙ → CₙH₂ₙOₙ. For n = 5: C₅H₁₀O₅ (e.g. ribose). C₆H₁₀O₅ is a glucose residue in a polysaccharide.",
      tip: "(CH₂O)ₙ → CₙH₂ₙOₙ."
    },
    {
      id: "c2q5", topic: "mono",
      q: "A tetrose is a monosaccharide with four carbon atoms. What is its molecular formula?",
      o: ["C₄H₄O₄", "C₄H₈O₄", "C₄H₁₀O₄", "C₄H₈O₂", "C₄H₆O₃"],
      a: 1,
      e: "Applying (CH₂O)ₙ with n = 4 gives C₄H₈O₄. IMAT likes to test the rule on a sugar that is not in the textbook list.",
      tip: "Apply the rule to any n, not just 3, 5 and 6."
    },
    {
      id: "c2q6", topic: "mono",
      q: "How many hydroxyl (–OH) groups are present in the straight-chain form of glucose?",
      o: ["3", "4", "5", "6", "12"],
      a: 2,
      e: "Carbons 2, 3, 4, 5 each carry one –OH and carbon 6 is CH₂OH: five hydroxyl groups. Carbon 1 is an aldehyde group (C=O), not an –OH.",
      tip: "Straight-chain glucose: 5 –OH + 1 C=O on C1."
    },
    {
      id: "c2q7", topic: "ring",
      q: "When glucose forms a ring structure, which of the following occurs?",
      o: ["Carbon 1 bonds to the oxygen on carbon 6, so all six carbons are in the ring", "Carbon 1 bonds to the oxygen on carbon 5; carbon 6 is outside the ring", "Carbon 2 bonds to the oxygen on carbon 5; the ring has no oxygen", "Carbon 1 bonds directly to carbon 5; the ring contains six carbons", "Carbon 4 bonds to the oxygen on carbon 1; carbon 6 is outside the ring"],
      a: 1,
      e: "C1 joins to the O on C5, so the six-membered ring contains five carbons and one oxygen; C6 sticks out as CH₂OH.",
      tip: "Glucose ring: C1–O–C5; ring has an O; C6 outside."
    },
    {
      id: "c2q8", topic: "ring",
      q: "α-glucose and β-glucose differ in the:",
      o: ["number of carbon atoms in the molecule", "position of the –OH group on carbon 4", "position of the –OH group on carbon 1 relative to the plane of the ring", "presence of an oxygen atom in the ring", "molecular formula"],
      a: 2,
      e: "They are isomers with the same formula C₆H₁₂O₆. In α-glucose the C1 –OH is below the ring; in β-glucose it is above.",
      tip: "α = C1 –OH below; β = C1 –OH above."
    },
    {
      id: "c2q9", topic: "ring",
      q: "Which statement about α-glucose and β-glucose is correct?",
      o: ["They are isomers: same molecular formula but different structures", "They have different molecular formulae but the same structure", "β-glucose is a pentose and α-glucose is a hexose", "Only α-glucose is a monosaccharide", "They differ in the position of carbon 6, which is inside the ring in β-glucose"],
      a: 0,
      e: "Isomers are two forms of the same chemical: same molecular formula, different arrangement. The α/β difference is the orientation of the –OH on C1.",
      tip: "Isomer = same formula, different structure."
    },
    {
      id: "c2q10", topic: "di",
      q: "Complete hydrolysis of maltose produces:",
      o: ["one glucose and one fructose", "one glucose and one galactose", "two molecules of α-glucose", "two molecules of β-glucose", "one α-glucose and one β-fructose"],
      a: 2,
      e: "Maltose is formed from two α-glucose molecules joined by a 1,4 glycosidic bond; hydrolysis (adding water) releases both glucose molecules.",
      tip: "Maltose = α-glucose + α-glucose (1,4)."
    },
    {
      id: "c2q11", topic: "di",
      q: "Sucrose is formed by a condensation reaction between:",
      o: ["α-glucose and α-glucose", "α-glucose and β-fructose", "β-glucose and galactose", "glucose and galactose", "fructose and galactose"],
      a: 1,
      e: "Sucrose = α-glucose + β-fructose. The glycosidic bond links C1 of glucose to C2 of fructose. Glucose + galactose is lactose.",
      tip: "Sucrose = α-glucose + β-fructose."
    },
    {
      id: "c2q12", topic: "di",
      q: "Which disaccharide is the main sugar found in milk, important in the diet of young mammals?",
      o: ["Sucrose", "Maltose", "Lactose", "Cellobiose", "Fructose"],
      a: 2,
      e: "Lactose (glucose + galactose) is milk sugar. Sucrose is the plant transport sugar; fructose is a monosaccharide, not a disaccharide.",
      tip: "Lactose = milk = glucose + galactose."
    },
    {
      id: "c2q13", topic: "di",
      q: "The glycosidic bond is best described as:",
      o: ["a C–N–C hydrogen bond formed by hydrolysis", "a C–O–C covalent bond formed by condensation", "a C–O–C ionic bond formed by condensation", "a C–C covalent bond formed by hydrolysis", "a C–O–C hydrogen bond formed by condensation"],
      a: 1,
      e: "Glycosidic bond: a C–O–C link (an oxygen bridge) between two sugars, formed by condensation; it is covalent.",
      tip: "Glycosidic = C–O–C, covalent, made by condensation."
    },
    {
      id: "c2q14", topic: "di",
      q: "In theory many different disaccharides could form from two monosaccharides, but only a few are common in nature. The main reason is that:",
      o: ["only one –OH group exists on each monosaccharide", "the shape of the enzyme controlling the reaction determines which –OH groups line up", "glycosidic bonds can only form between carbon 1 and carbon 4", "most disaccharides are immediately hydrolysed by water", "only reducing sugars can form glycosidic bonds"],
      a: 1,
      e: "Monosaccharides have many –OH groups, so many links are possible; the enzyme's shape decides which two –OH groups come alongside each other. Sucrose (1→2) shows bonds are not only 1,4.",
      tip: "Enzyme shape decides which –OH groups react."
    },
    {
      id: "c2q15", topic: "di",
      q: "What is the molecular formula of maltose?",
      o: ["C₁₂H₂₄O₁₂", "C₁₂H₂₂O₁₁", "C₁₂H₂₀O₁₀", "C₆H₁₂O₆", "C₁₂H₂₂O₁₂"],
      a: 1,
      e: "2 × C₆H₁₂O₆ = C₁₂H₂₄O₁₂; condensation removes H₂O → C₁₂H₂₂O₁₁. The same formula applies to sucrose and lactose.",
      tip: "Disaccharide of two hexoses = C₁₂H₂₂O₁₁ (subtract one H₂O)."
    },
    {
      id: "c2q16", topic: "di",
      q: "A chain of 100 glucose molecules is assembled by condensation reactions. How many water molecules are released?",
      o: ["50", "98", "99", "100", "101"],
      a: 2,
      e: "Each glycosidic bond releases one water molecule. A linear chain of n monomers has n − 1 bonds → 99 water molecules.",
      tip: "n monomers in a chain → n − 1 bonds → n − 1 H₂O."
    },
    {
      id: "c2q17", topic: "tests",
      q: "Benedict's reagent consists of:",
      o: ["copper(I) oxide in an acidic solution", "copper(II) sulfate in an alkaline solution", "iodine in potassium iodide solution", "copper(II) sulfate in an acidic solution", "sodium hydroxide and hydrochloric acid"],
      a: 1,
      e: "Benedict's reagent is copper(II) sulfate in alkaline solution and is blue. Copper(I) oxide is the brick-red product. Iodine in KI is the starch test.",
      tip: "Benedict's = Cu(II) sulfate + ALKALI (blue)."
    },
    {
      id: "c2q18", topic: "tests",
      q: "During a positive Benedict's test, which of the following occurs?",
      o: ["The sugar is reduced and Cu⁺ is oxidised to Cu²⁺", "The sugar is oxidised and Cu²⁺ is reduced to Cu⁺", "The sugar is hydrolysed and Cu²⁺ forms a blue precipitate", "Both the sugar and Cu²⁺ are oxidised", "The sugar is oxidised and Cu²⁺ is reduced to copper metal"],
      a: 1,
      e: "A reducing sugar reduces Cu²⁺ (soluble, blue) to Cu⁺, which forms brick-red insoluble copper(I) oxide; the sugar itself is oxidised.",
      tip: "Reducing sugar is OXIDISED; Cu²⁺ → Cu⁺ (copper(I) oxide)."
    },
    {
      id: "c2q19", topic: "tests",
      q: "Which of the following sugars would give a NEGATIVE result with Benedict's reagent without prior acid hydrolysis?",
      o: ["Glucose", "Fructose", "Maltose", "Sucrose", "Lactose"],
      a: 3,
      e: "All monosaccharides (glucose, fructose) and some disaccharides (maltose, lactose) are reducing. Sucrose is the only common non-reducing sugar.",
      tip: "Sucrose = the non-reducing sugar."
    },
    {
      id: "c2q20", topic: "tests",
      q: "What is the correct sequence of steps to test a solution for a non-reducing sugar after it has given a negative Benedict's test?",
      o: ["Add NaOH → heat with HCl → add Benedict's and heat", "Heat with HCl → add Benedict's and heat → add NaOH", "Heat a fresh sample with HCl → neutralise with NaOH → add Benedict's and heat", "Add Benedict's to the same tube → add HCl → heat", "Heat with NaOH → neutralise with HCl → add Benedict's and heat"],
      a: 2,
      fixed: false,
      e: "Use a fresh sample, hydrolyse with hydrochloric acid and heat, then neutralise with an alkali such as sodium hydroxide (Benedict's only works in alkaline conditions), then repeat Benedict's test.",
      tip: "Fresh sample → HCl + heat → NaOH → Benedict's."
    },
    {
      id: "c2q21", topic: "tests",
      q: "In the test for non-reducing sugars, why must the solution be neutralised with sodium hydroxide after heating with hydrochloric acid?",
      o: ["To hydrolyse the glycosidic bond", "Because Benedict's reagent needs alkaline conditions to work", "To oxidise the monosaccharides formed", "To dissolve the copper(I) oxide precipitate", "To convert reducing sugars into non-reducing sugars"],
      a: 1,
      e: "HCl does the hydrolysis. Benedict's reagent is alkaline and needs alkaline conditions to work, so the acid must be neutralised first.",
      tip: "Neutralise because Benedict's needs ALKALINE conditions."
    },
    {
      id: "c2q22", topic: "tests",
      q: "Why must excess Benedict's reagent be used when estimating the concentration of a reducing sugar?",
      o: ["So that the solution stays blue", "So that all of the sugar can react, making the colour depend only on sugar concentration", "To speed up the hydrolysis of sucrose", "So that copper(I) oxide dissolves", "To lower the temperature needed for the reaction"],
      a: 1,
      e: "With excess reagent, Cu²⁺ is never limiting; all the reducing sugar reacts, so the intensity of the colour/precipitate is related to the concentration of sugar.",
      tip: "Excess reagent → sugar is limiting → colour ∝ concentration."
    },
    {
      id: "c2q23", topic: "tests",
      q: "Equal volumes of two solutions, X and Y, are heated with excess Benedict's reagent for the same time. X turns green and Y turns orange-red. Which conclusion is valid?",
      o: ["X contains a non-reducing sugar and Y a reducing sugar", "Y has a higher concentration of reducing sugar than X", "X has a higher concentration of reducing sugar than Y", "Neither solution contains a reducing sugar", "Y contains sucrose only"],
      a: 1,
      e: "The colour series blue → green → yellow → orange → red-brown shows increasing reducing-sugar concentration. Green means a small amount, orange-red a larger amount.",
      tip: "Blue → green → yellow → orange → brick-red = more reducing sugar."
    },
    {
      id: "c2q24", topic: "tests",
      q: "A solution contains both glucose and sucrose. Compared with the first Benedict's test, what is observed after acid hydrolysis, neutralisation and a second Benedict's test?",
      o: ["No precipitate in either test", "A precipitate only in the second test", "A precipitate in both tests, heavier in the second test", "A precipitate in both tests, lighter in the second test", "A blue precipitate in the second test"],
      a: 2,
      e: "Glucose gives a positive first test. Hydrolysis of sucrose releases glucose and fructose, adding more reducing sugar, so the second precipitate is heavier.",
      tip: "Reducing + non-reducing present → heavier precipitate after hydrolysis."
    },
    {
      id: "c2q25", topic: "tests",
      q: "Which method allows the most precise measurement of small differences in colour in a semi-quantitative Benedict's test?",
      o: ["Comparing by eye against colour standards", "Using a colorimeter", "Adding more hydrochloric acid", "Measuring the pH of the solution", "Heating the tubes for longer"],
      a: 1,
      e: "A colorimeter measures colour (absorbance/transmission) objectively and can detect small differences more precisely than the eye.",
      tip: "Colorimeter = most precise; colour standards / time to first colour change also work."
    },
    {
      id: "c2q26", topic: "tests",
      q: "In a semi-quantitative Benedict's test, the time taken for the first colour change is measured. Which relationship is expected?",
      o: ["Higher sugar concentration → longer time", "Higher sugar concentration → shorter time", "Time is independent of sugar concentration", "Only non-reducing sugars change colour", "Time depends only on the volume of Benedict's reagent"],
      a: 1,
      e: "More reducing sugar reduces Cu²⁺ faster, so the first visible colour change appears sooner.",
      tip: "More sugar → faster colour change."
    },
    {
      id: "c2q27", topic: "basics",
      q: "Which pair correctly matches a type of covalent bond with the molecule in which it links the subunits?",
      o: ["Peptide bond – polysaccharide", "Glycosidic bond – protein", "Ester bond – lipid", "Glycosidic bond – nucleic acid", "Peptide bond – lipid"],
      a: 2,
      e: "Glycosidic bonds link sugars (polysaccharides), peptide bonds link amino acids (proteins) and ester bonds link fatty acids to glycerol (lipids).",
      tip: "Glycosidic–sugars, peptide–proteins, ester–lipids."
    },
    {
      id: "c2q28", topic: "basics",
      q: "Which of the following is a monomer used to build a biological polymer?",
      o: ["An organic base", "A fatty acid", "Glycerol", "A nucleotide", "A triglyceride"],
      a: 3,
      e: "Nucleotides are the monomers of nucleic acids. Organic bases are only part of nucleotides, and fatty acids and glycerol form lipids, which are not polymers.",
      tip: "Monomers: monosaccharides, amino acids, nucleotides — NOT organic bases."
    },
    {
      id: "c2q29", topic: "mono",
      q: "Which of the following contains only hexose sugars?",
      o: ["Glucose, ribose, fructose", "Glucose, fructose, galactose", "Deoxyribose, ribose, glucose", "Sucrose, glucose, fructose", "Galactose, maltose, glucose"],
      a: 1,
      e: "Glucose, fructose and galactose are hexoses (6C). Ribose and deoxyribose are pentoses; sucrose and maltose are disaccharides.",
      tip: "Hexoses: glucose, fructose, galactose. Pentoses: ribose, deoxyribose."
    },
    {
      id: "c2q30", topic: "mono",
      q: "Which molecular formula could NOT belong to a carbohydrate of general formula Cₓ(H₂O)ᵧ?",
      o: ["C₃H₆O₃", "C₅H₁₀O₅", "C₁₂H₂₂O₁₁", "C₂H₆O", "C₆H₁₂O₆"],
      a: 3,
      e: "Carbohydrates have H : O = 2 : 1. C₂H₆O (ethanol) has H : O = 6 : 1, so it does not fit. C₁₂H₂₂O₁₁ = C₁₂(H₂O)₁₁ fits.",
      tip: "Check H : O = 2 : 1."
    },
    {
      id: "c2q31", topic: "mono",
      q: "Monosaccharides such as glucose are good respiratory substrates mainly because they:",
      o: ["contain many carbon–hydrogen bonds that release a lot of energy when broken", "contain phosphate groups that are transferred directly to ADP", "are insoluble and can be stored in large amounts", "contain nitrogen needed for ATP", "form glycosidic bonds that store energy"],
      a: 0,
      e: "The large number of C–H bonds can be broken to release a lot of energy, which is transferred to make ATP from ADP + phosphate during respiration.",
      tip: "Energy source because of many C–H bonds → ATP from ADP + Pi."
    },
    {
      id: "c2q32", topic: "mono",
      q: "Which pair correctly matches a monosaccharide with a molecule built from it?",
      o: ["Deoxyribose – RNA", "Ribose – ATP", "Glucose – DNA", "Fructose – glycogen", "Galactose – cellulose"],
      a: 1,
      e: "Ribose is used to make RNA and ATP; deoxyribose is used to make DNA; glucose is used to make starch, glycogen and cellulose.",
      tip: "Ribose → RNA + ATP; deoxyribose → DNA; glucose → starch, glycogen, cellulose."
    },
    {
      id: "c2q33", topic: "basics",
      q: "Only 20 common amino acids are used to make proteins, although millions are theoretically possible. According to the coursebook, an advantage of this limited variety is that it:",
      o: ["makes proteins more soluble", "makes metabolism easier to control", "prevents hydrolysis of proteins", "removes the need for enzymes", "allows proteins to become polymers"],
      a: 1,
      e: "Having a limited variety of building-block molecules makes it easier to control metabolism — the 'underlying simplicity' of biochemistry.",
      tip: "Limited variety → metabolism easier to control."
    },
    {
      id: "c2q34", topic: "tests", fixed: true,
      q: "Which of the following statements is/are correct?\n1. All monosaccharides are reducing sugars.\n2. All disaccharides are reducing sugars.\n3. Sucrose is the transport sugar in plants.",
      o: ["1 only", "2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
      a: 2,
      e: "1 is correct. 2 is wrong — sucrose is a non-reducing disaccharide. 3 is correct — sucrose is transported in plants.",
      tip: "Only SOME disaccharides are reducing."
    },
    {
      id: "c2q35", topic: "di", fixed: true,
      q: "Which of the following statements about hydrolysis is/are correct?\n1. A water molecule is used to break a covalent bond.\n2. It occurs during the digestion of disaccharides and polysaccharides.\n3. It forms glycosidic bonds between monosaccharides.",
      o: ["1 only", "1 and 2 only", "2 and 3 only", "3 only", "1, 2 and 3"],
      a: 1,
      e: "Hydrolysis adds water to break bonds (1) and happens in digestion (2). Glycosidic bonds are formed by condensation, not hydrolysis (3 is wrong).",
      tip: "Hydrolysis breaks; condensation makes."
    },
    {
      id: "c2q36", topic: "models",
      q: "A student builds a ball-and-stick model of ethanoic acid, CH₃COOH, using one stick per covalent bond (a double bond counts as two sticks). How many sticks are needed?",
      o: ["6", "7", "8", "9", "10"],
      a: 2,
      e: "Sum of valencies: 2 C × 4 + 4 H × 1 + 2 O × 2 = 16; each bond uses two 'valencies' → 16 ÷ 2 = 8 (3 C–H, 1 C–C, 1 C=O counted as 2, 1 C–O, 1 O–H).",
      tip: "Bonds = Σ valencies ÷ 2 (C 4, N 3, O 2, H 1)."
    },
    {
      id: "c2q37", topic: "models",
      q: "In a molecular model kit, which combination of colour and number of bonds is correct?",
      o: ["Nitrogen – blue – 3 bonds", "Oxygen – white – 2 bonds", "Carbon – red – 4 bonds", "Hydrogen – black – 1 bond", "Nitrogen – blue – 4 bonds"],
      a: 0,
      e: "Black = carbon (4 bonds), white = hydrogen (1), red = oxygen (2), blue = nitrogen (3).",
      tip: "C black 4 · H white 1 · O red 2 · N blue 3."
    },
    {
      id: "c2q38", topic: "models",
      q: "How many covalent bonds are present in one molecule of propane, C₃H₈?",
      o: ["8", "9", "10", "11", "12"],
      a: 2,
      e: "2 C–C bonds + 8 C–H bonds = 10. Check: (3 × 4 + 8 × 1) ÷ 2 = 10.",
      tip: "Count C–C + C–H, or use Σ valencies ÷ 2."
    },
    {
      id: "c2q39", topic: "basics",
      q: "Why is carbon particularly important in biological molecules?",
      o: ["It is the most abundant atom in living organisms", "Carbon atoms can join together to form long chains or rings that act as molecular skeletons", "It forms only single bonds, making molecules stable", "It is the only element that forms covalent bonds", "It can form ionic bonds with hydrogen"],
      a: 1,
      e: "Carbon atoms bond to each other to form chains and rings — the skeletons of organic molecules — with other atoms attached. Hydrogen, not carbon, is the most abundant atom.",
      tip: "Carbon = skeleton (chains & rings). Most abundant atom = hydrogen."
    },
    {
      id: "c2q40", topic: "ring", fixed: true,
      q: "Which of the following statements about the ring form of glucose is/are correct?\n1. The ring contains one oxygen atom.\n2. Carbon 6 is part of the ring.\n3. In β-glucose the –OH group on carbon 1 is above the plane of the ring.",
      o: ["1 only", "2 only", "1 and 3 only", "2 and 3 only", "1, 2 and 3"],
      a: 2,
      e: "1 is correct (C1–O–C5). 2 is wrong: C6 lies outside the ring as CH₂OH. 3 is correct: β = C1 –OH above.",
      tip: "Ring = 5 C + 1 O; C6 outside."
    }
  ],

  /* ---------------------------------------------------------------- FIGURES
     ids refer to drawings in js/figures.js */
  figures: [
    { id: "buildingBlocks", title: "Fig 2.2 · The building blocks of life", caption: "Simple biological molecules (violet) join together to form larger, more complex molecules (cyan).", points: ["Monosaccharides → polysaccharides", "Organic bases + sugar → nucleotides → nucleic acids", "Amino acids → proteins", "Fatty acids & glycerol → lipids (not polymers)"] },
    { id: "condensation", title: "Condensation & hydrolysis", caption: "Two monomers are joined by removing water (condensation) and separated again by adding water (hydrolysis).", points: ["Condensation: −H₂O, covalent bond formed", "Hydrolysis: +H₂O, covalent bond broken", "Repeating condensation builds a polymer"] },
    { id: "glucoseChain", title: "Fig 2.3 · Straight-chain glucose", caption: "Structural formula of glucose with carbon atoms numbered. –OH = hydroxyl group; there are five in glucose.", points: ["C₆H₁₂O₆, a hexose", "C1 carries the C=O (aldehyde) group", "C1 bonds to the O on C5 when the ring forms"] },
    { id: "alphaBeta", title: "Fig 2.4 · α-glucose and β-glucose", caption: "Ring forms of glucose. The only difference is the position of the –OH on carbon 1.", points: ["α: C1 –OH below the plane of the ring", "β: C1 –OH above the plane of the ring", "Ring contains O; C6 (CH₂OH) is outside"] },
    { id: "maltose", title: "Fig 2.5a · Formation of maltose", caption: "Two α-glucose molecules join by condensation to form maltose with a 1,4 glycosidic bond. Hydrolysis reverses it.", points: ["–OH on C1 + –OH on C4 → H₂O removed", "Oxygen bridge = glycosidic bond (C–O–C)", "Repeating this forms a polysaccharide"] },
    { id: "sucrose", title: "Fig 2.5b · Formation of sucrose", caption: "Sucrose is made from an α-glucose and a β-fructose molecule (1,2 glycosidic bond).", points: ["Fructose has a 5-membered ring", "Bond between C1 of glucose and C2 of fructose", "Sucrose is non-reducing"] },
    { id: "benedict", title: "Benedict's test colour scale", caption: "With excess reagent, colour shows the concentration of reducing sugar.", points: ["Blue Cu²⁺ (soluble) → brick-red Cu₂O (insoluble)", "Heat in a water bath", "Semi-quantitative: standards, timing, colorimeter"] },
    { id: "nonReducing", title: "Test for non-reducing sugars", caption: "Flowchart of Practical Activity 2.1.", points: ["Fresh sample + HCl, heat → hydrolysis", "Neutralise with NaOH (alkaline needed)", "Red → non-reducing sugar; blue → no sugar"] },
    { id: "atoms", title: "Atoms & covalent bonds (model kit)", caption: "Number of covalent bonds each atom forms, with model-kit colours.", points: ["C black 4 · N blue 3 · O red 2 · H white 1", "Double bond = 2 sticks", "Bonds = Σ valencies ÷ 2"] }
  ]
};
