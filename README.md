# BioGlow IMAT: Cambridge Biology for IMAT

A neon-styled study app for **Cambridge International AS & A Level Biology**, aimed at the **IMAT (MUR)**.
It is plain HTML, CSS and JS with no build step. It works offline and can be installed on a phone as a PWA.

## Sections (per chapter)
- **Review**: notes for each section with key words, IMAT tips and inline figures. Includes *Mark as reviewed* and **Flashcards**.
- **Test**: IMAT-style questions with 5 options (A–E), scored +1.5 / −0.4 / 0. Choose 10/15/20/all questions, *Exam* or *Practice* mode, an optional timer (100 s per question) and a topic filter.
- **Figures**: the coursebook diagrams redrawn as clean SVG. Zoom, plus a **Label quiz** that hides labels until you tap them.
- **Mistakes**: wrong and skipped answers with explanations, a *Key notes* list, and *Practise mistakes* (answer one correctly to clear it).
- **Progress**: mastery ring, scores, chart of recent tests, accuracy by topic, history, and backup export/import.

## Content so far
- Chapter 2, *Biological molecules*, pp. 44–50 (2.1 → 2.4, Practical Activity 2.1). 9 sections, 20 flashcards, 40 questions, 9 figures.

## Adding pages / chapters
- Extend `data/ch02.js` (`sections`, `flashcards`, `questions`, `figures`).
- For a new chapter, create `data/chNN.js` setting `window.BIO_DATA.chapters[NN] = {...}` and add a `<script>` tag in `index.html`.
- New drawings go in `js/figures.js`. Bump `VERSION` in `sw.js` after changes.

## Android app (APK)
Every push builds an APK with GitHub Actions (`.github/workflows/android.yml`) and publishes it as a release.
Latest download: https://github.com/grandddlc-tech/Cambridge-biology/releases/latest/download/CambridgeBio.apk

The APK is a native WebView wrapper (`android/`) around the same web files, so content updates flow into it automatically.
The signing key is not stored in the repo. Optionally add repository secrets `KEYSTORE_BASE64`, `KEYSTORE_PASSWORD` (and `KEY_ALIAS`)
for a permanent key; otherwise a key is generated once and kept in the Actions cache.

## Run
Open `index.html`, or serve the folder (`python3 -m http.server`). To host it, enable **GitHub Pages** (Settings → Pages → deploy from branch).
Progress is stored in the browser (localStorage). Use *Progress → Backup* to move it to another device.
