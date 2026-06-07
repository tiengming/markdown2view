export const DEMO_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>功能全集：排版组件指南</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&family=Manrope:wght@300;400;500;700;800&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --blue: #2563eb;
    --blue-light: #dbeafe;
    --blue-mid: #93c5fd;
    --blue-dark: #1e40af;
    --blue-xdark: #1e3a8a;
    --navy: #0f172a;
    --navy-mid: #1e293b;
    --navy-light: #334155;
    --slate: #475569;
    --slate-light: #94a3b8;
    --white: #ffffff;
    --off-white: #f8fafc;
    --accent-gold: #f59e0b;
    --accent-teal: #0d9488;
    --accent-rose: #e11d48;
    --grid: 8px;
    --font-cn: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    --font-en: 'Manrope', sans-serif;
  }

  body {
    background: #e2e8f0;
    font-family: var(--font-cn);
    margin: 0;
    padding: 32px 0;
  }

  .slide {
    width: min(100vw, 960px);
    aspect-ratio: 16 / 9;
    overflow: hidden;
    margin: 0 auto 24px;
    position: relative;
    border-radius: 4px;
    box-shadow: 0 4px 32px rgba(15,23,42,0.18);
  }

  /* ─── SLIDE 1: COVER ─── */
  .slide-cover {
    background: var(--navy);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 64px;
  }
  .slide-cover::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 80% 60% at 50% 50%, rgba(37,99,235,0.22) 0%, transparent 70%);
  }
  .cover-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: var(--font-en);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--blue-mid);
    border: 1px solid rgba(147,197,253,0.3);
    border-radius: 100px;
    padding: 6px 16px;
    margin-bottom: 32px;
    position: relative;
  }
  .cover-badge::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--blue);
    border-radius: 50%;
    display: block;
  }
  .cover-title {
    font-family: var(--font-cn);
    font-size: 56px;
    font-weight: 900;
    color: var(--white);
    line-height: 1.15;
    letter-spacing: -0.02em;
    position: relative;
    margin-bottom: 16px;
  }
  .cover-title span {
    color: var(--blue);
  }
  .cover-subtitle {
    font-size: 17px;
    font-weight: 400;
    color: var(--slate-light);
    line-height: 1.7;
    max-width: 560px;
    position: relative;
    margin-bottom: 40px;
  }
  .cover-chips {
    display: flex;
    gap: 8px;
    position: relative;
  }
  .chip {
    font-family: var(--font-en);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 6px 16px;
    border-radius: 100px;
    background: rgba(37,99,235,0.16);
    border: 1px solid rgba(37,99,235,0.32);
    color: var(--blue-mid);
  }
  .slide-num {
    position: absolute;
    bottom: 24px;
    right: 32px;
    font-family: var(--font-en);
    font-size: 12px;
    font-weight: 500;
    color: var(--slate-light);
    letter-spacing: 0.08em;
  }

  /* ─── SLIDE 2: SECTION INTRO ─── */
  .slide-section {
    background: var(--navy-mid);
    display: flex;
    align-items: center;
    padding: 0 96px;
    gap: 64px;
  }
  .section-num {
    font-family: var(--font-en);
    font-size: 96px;
    font-weight: 800;
    color: rgba(37,99,235,0.22);
    line-height: 1;
    flex-shrink: 0;
    letter-spacing: -0.04em;
  }
  .section-content {}
  .section-label {
    font-family: var(--font-en);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 16px;
  }
  .section-title {
    font-size: 44px;
    font-weight: 800;
    color: var(--white);
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }
  .section-desc {
    font-size: 16px;
    font-weight: 400;
    color: var(--slate-light);
    line-height: 1.8;
  }

  /* ─── SLIDE 3: CONTENT (LEFT + RIGHT) ─── */
  .slide-content {
    background: var(--white);
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }
  .content-left {
    background: var(--navy);
    padding: 56px 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
  }
  .content-left::after {
    content: '';
    position: absolute;
    right: 0; top: 40px; bottom: 40px;
    width: 1px;
    background: rgba(37,99,235,0.3);
  }
  .content-right {
    background: var(--white);
    padding: 48px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }
  .content-tag {
    font-family: var(--font-en);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 12px;
  }
  .content-heading {
    font-size: 32px;
    font-weight: 800;
    color: var(--white);
    line-height: 1.25;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }
  .content-body {
    font-size: 14px;
    line-height: 1.8;
    color: var(--slate-light);
  }
  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 16px;
    border: 1px solid rgba(37,99,235,0.12);
    border-radius: 8px;
    background: var(--off-white);
  }
  .feature-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--blue);
    flex-shrink: 0;
    margin-top: 6px;
  }
  .feature-dot.gold { background: var(--accent-gold); }
  .feature-dot.teal { background: var(--accent-teal); }
  .feature-dot.rose { background: var(--accent-rose); }
  .feature-title {
    font-size: 14px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 2px;
  }
  .feature-desc {
    font-size: 12px;
    color: var(--slate);
    line-height: 1.6;
  }

  /* ─── SLIDE 4: DARK LEFT PANEL IMAGE ─── */
  .slide-visual {
    background: var(--navy);
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    overflow: hidden;
  }
  .visual-left {
    position: relative;
    overflow: hidden;
    background: var(--navy-mid);
  }
  .visual-mockup {
    position: absolute;
    inset: 24px;
    background: var(--navy);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 20px;
    overflow: hidden;
  }
  .mockup-bar {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
  }
  .mockup-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
  }
  .mockup-code-line {
    height: 8px;
    border-radius: 4px;
    background: rgba(255,255,255,0.06);
    margin-bottom: 8px;
  }
  .mockup-code-line.highlight {
    background: rgba(37,99,235,0.28);
  }
  .mockup-code-line.blue {
    background: rgba(37,99,235,0.5);
  }
  .visual-right {
    padding: 48px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  /* ─── SLIDE 5: THREE COLUMN ─── */
  .slide-three {
    background: var(--off-white);
    padding: 56px 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 32px;
  }
  .slide-three-header {
    display: flex;
    align-items: baseline;
    gap: 16px;
  }
  .three-col {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }
  .three-card {
    background: var(--white);
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: 12px;
    padding: 24px 20px;
    position: relative;
    overflow: hidden;
  }
  .three-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
  }
  .three-card.c1::before { background: var(--blue); }
  .three-card.c2::before { background: var(--accent-teal); }
  .three-card.c3::before { background: var(--accent-gold); }
  .card-icon {
    font-size: 24px;
    margin-bottom: 12px;
    display: block;
  }
  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 8px;
  }
  .card-text {
    font-size: 12px;
    color: var(--slate);
    line-height: 1.7;
  }
  .card-tag {
    margin-top: 12px;
    display: inline-block;
    font-family: var(--font-en);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    padding: 3px 10px;
    border-radius: 100px;
  }
  .c1 .card-tag { background: var(--blue-light); color: var(--blue-dark); }
  .c2 .card-tag { background: #ccfbf1; color: #0f766e; }
  .c3 .card-tag { background: #fef3c7; color: #92400e; }

  /* ─── SLIDE 6: STYLES ─── */
  .slide-styles {
    background: var(--navy);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 56px 80px;
    gap: 0;
  }
  .styles-header {
    margin-bottom: 40px;
  }
  .styles-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .style-item {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 16px 20px;
  }
  .style-label {
    font-family: var(--font-en);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--slate-light);
    margin-bottom: 8px;
  }
  .style-preview {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.5;
  }
  .grad-text {
    background: linear-gradient(90deg, var(--blue), #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .pill-text {
    background: rgba(37,99,235,0.18);
    border-radius: 100px;
    padding: 2px 12px;
    color: var(--blue-mid);
    font-size: 14px;
  }
  .indigo-text {
    color: #a5b4fc;
    font-weight: 700;
  }
  .soft-text {
    color: #818cf8;
  }

  /* ─── SLIDE 7: COMPONENTS GRID ─── */
  .slide-comp {
    background: var(--white);
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    overflow: hidden;
  }
  .comp-left {
    background: var(--blue);
    padding: 56px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .comp-right {
    padding: 40px 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    overflow: hidden;
  }
  .comp-num {
    font-family: var(--font-en);
    font-size: 80px;
    font-weight: 800;
    color: rgba(255,255,255,0.15);
    line-height: 1;
    letter-spacing: -0.04em;
    margin-bottom: 16px;
  }
  .comp-heading {
    font-size: 28px;
    font-weight: 800;
    color: var(--white);
    line-height: 1.25;
    margin-bottom: 12px;
  }
  .comp-sub {
    font-size: 13px;
    color: rgba(255,255,255,0.65);
    line-height: 1.7;
  }
  .comp-card {
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: 8px;
    padding: 12px 16px;
    background: var(--off-white);
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }
  .comp-index {
    font-family: var(--font-en);
    font-size: 11px;
    font-weight: 700;
    color: var(--blue);
    background: var(--blue-light);
    border-radius: 4px;
    padding: 2px 6px;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .comp-name {
    font-size: 13px;
    font-weight: 700;
    color: var(--navy);
    margin-bottom: 2px;
  }
  .comp-desc-sm {
    font-size: 11px;
    color: var(--slate);
    line-height: 1.6;
  }

  /* ─── SLIDE 8: LAYOUT DEMOS ─── */
  .slide-layout {
    background: var(--off-white);
    padding: 48px 64px;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .layout-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .layout-box {
    background: var(--white);
    border: 1px solid rgba(15,23,42,0.08);
    border-radius: 10px;
    padding: 20px;
  }
  .lbox-label {
    font-family: var(--font-en);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--slate);
    margin-bottom: 12px;
  }
  .timeline-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 10px;
  }
  .tl-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
    background: var(--blue);
    flex-shrink: 0;
    margin-top: 4px;
  }
  .tl-date {
    font-family: var(--font-en);
    font-size: 11px;
    font-weight: 700;
    color: var(--blue);
    margin-bottom: 2px;
  }
  .tl-text {
    font-size: 12px;
    color: var(--navy);
    font-weight: 600;
  }
  .tl-sub {
    font-size: 11px;
    color: var(--slate);
  }
  .step-row {
    display: flex;
    gap: 0;
  }
  .step-item {
    flex: 1;
    text-align: center;
    position: relative;
  }
  .step-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: 0;
    top: 14px;
    width: calc(50% - 14px);
    height: 2px;
    background: rgba(37,99,235,0.2);
    transform: translateX(100%);
  }
  .step-item:not(:first-child)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 14px;
    width: calc(50% - 14px);
    height: 2px;
    background: rgba(37,99,235,0.2);
    transform: translateX(-100%);
  }
  .step-circle {
    width: 28px; height: 28px;
    border-radius: 50%;
    background: var(--blue);
    color: var(--white);
    font-size: 12px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 8px;
  }
  .step-circle.inactive {
    background: rgba(37,99,235,0.15);
    color: var(--blue);
  }
  .step-label {
    font-size: 11px;
    color: var(--navy);
    font-weight: 600;
  }
  .step-sub {
    font-size: 10px;
    color: var(--slate);
    margin-top: 2px;
  }
  .compare-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .compare-side {
    border-radius: 6px;
    padding: 12px;
  }
  .compare-side.before {
    background: rgba(226,29,72,0.06);
    border: 1px solid rgba(226,29,72,0.15);
  }
  .compare-side.after {
    background: rgba(13,148,136,0.06);
    border: 1px solid rgba(13,148,136,0.15);
  }
  .compare-label {
    font-family: var(--font-en);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    margin-bottom: 6px;
  }
  .compare-side.before .compare-label { color: var(--accent-rose); }
  .compare-side.after .compare-label { color: var(--accent-teal); }
  .compare-text {
    font-size: 11px;
    color: var(--slate);
    line-height: 1.6;
  }

  /* ─── SLIDE 9: MISC / BADGES / CODE ─── */
  .slide-misc {
    background: var(--navy);
    display: grid;
    grid-template-columns: 0.9fr 1.1fr;
    overflow: hidden;
  }
  .misc-left {
    padding: 48px 40px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    justify-content: center;
    border-right: 1px solid rgba(255,255,255,0.06);
  }
  .misc-right {
    padding: 40px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
  }
  .badge-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .badge {
    font-family: var(--font-en);
    font-size: 11px;
    font-weight: 700;
    padding: 4px 12px;
    border-radius: 100px;
    letter-spacing: 0.05em;
  }
  .badge.accent { background: rgba(37,99,235,0.2); color: var(--blue-mid); border: 1px solid rgba(37,99,235,0.3); }
  .badge.green { background: rgba(16,185,129,0.16); color: #6ee7b7; border: 1px solid rgba(16,185,129,0.25); }
  .badge.amber { background: rgba(245,158,11,0.16); color: #fcd34d; border: 1px solid rgba(245,158,11,0.25); }
  .badge.dark { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.12); }
  .badge.red { background: rgba(226,29,72,0.16); color: #fca5a5; border: 1px solid rgba(226,29,72,0.25); }
  .code-block {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 16px 20px;
    font-family: 'Courier New', monospace;
    font-size: 11px;
    line-height: 1.7;
    color: rgba(255,255,255,0.55);
    overflow: hidden;
  }
  .code-kw { color: #93c5fd; }
  .code-fn { color: #c4b5fd; }
  .code-str { color: #86efac; }
  .code-comment { color: rgba(255,255,255,0.3); }
  .statement-box {
    background: rgba(37,99,235,0.12);
    border-left: 3px solid var(--blue);
    border-radius: 0 8px 8px 0;
    padding: 16px 20px;
    font-size: 16px;
    font-weight: 600;
    color: var(--white);
    line-height: 1.6;
  }
  .task-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 0;
    font-size: 13px;
    color: rgba(255,255,255,0.7);
  }
  .task-check {
    width: 16px; height: 16px;
    border-radius: 4px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
  }
  .task-check.done { background: var(--blue); color: var(--white); }
  .task-check.todo { border: 1.5px solid rgba(255,255,255,0.2); }

  /* ─── SLIDE 10: CLOSING ─── */
  .slide-close {
    background: var(--navy);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 64px;
    position: relative;
    overflow: hidden;
  }
  .slide-close::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    border-radius: 50%;
    border: 1px solid rgba(37,99,235,0.1);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
  .slide-close::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    border-radius: 50%;
    border: 1px solid rgba(37,99,235,0.15);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
  .close-inner {
    position: relative;
    z-index: 1;
  }
  .close-icon {
    width: 56px; height: 56px;
    background: rgba(37,99,235,0.16);
    border: 1px solid rgba(37,99,235,0.3);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 26px;
  }
  .close-title {
    font-size: 40px;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.02em;
    margin-bottom: 16px;
  }
  .close-sub {
    font-size: 15px;
    color: var(--slate-light);
    line-height: 1.8;
    max-width: 440px;
    margin: 0 auto 32px;
  }
  .engage-row {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .engage-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 16px 24px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    font-size: 22px;
  }
  .engage-btn span {
    font-size: 11px;
    color: var(--slate-light);
    font-family: var(--font-en);
    font-weight: 600;
    letter-spacing: 0.05em;
  }

  .heading-tag {
    font-family: var(--font-en);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 12px;
  }
  .heading-main {
    font-size: 36px;
    font-weight: 800;
    color: var(--navy);
    letter-spacing: -0.02em;
    line-height: 1.2;
  }
  .heading-main.white { color: var(--white); }
  .divider {
    width: 40px; height: 3px;
    background: var(--blue);
    border-radius: 2px;
    margin-top: 12px;
  }
  .divider.white { background: rgba(255,255,255,0.3); }

  @media print {
    body { background: white; padding: 0; }
    .slide {
      margin: 0;
      page-break-after: always;
      box-shadow: none;
      width: 960px;
      border-radius: 0;
    }
    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  }
</style>
</head>
<body>

<!-- SLIDE 1: COVER -->
<section class="slide slide-cover">
  <div class="cover-badge">GUIDE · DA02</div>
  <h1 class="cover-title">功能全集<br><span>排版组件指南</span></h1>
  <p class="cover-subtitle">这是一份包含所有可用 Markdown 指令及扩展标签的完整演示稿，助你快速掌握每一个排版组件的用法与效果。</p>
  <div class="cover-chips">
    <span class="chip">图片并排</span>
    <span class="chip">窗口滚动</span>
    <span class="chip">渐变文字</span>
  </div>
  <span class="slide-num">01 / 11</span>
</section>

<!-- SLIDE 2: SECTION 01 INTRO -->
<section class="slide slide-section">
  <div class="section-num">01</div>
  <div class="section-content">
    <div class="section-label">IMAGES · 图片增强特性</div>
    <h2 class="section-title">图片增强<br>特性</h2>
    <p class="section-desc">解决了长图刷屏和多图堆叠的问题。<br>支持限定窗口高度、横向并排滑动与自动轮播三大核心能力。</p>
  </div>
  <span class="slide-num">02 / 11</span>
</section>

<!-- SLIDE 3: IMAGE FEATURES -->
<section class="slide slide-content">
  <div class="content-left">
    <div class="content-tag">IMAGES · 三种模式</div>
    <h2 class="content-heading">灵活的<br>图片展示方式</h2>
    <p class="content-body">针对不同阅读场景，提供三种图片排版策略，让文章结构更清晰，阅读体验更流畅。</p>
  </div>
  <div class="content-right">
    <div class="feature-item">
      <div class="feature-dot"></div>
      <div>
        <div class="feature-title">窗口化限高滚动</div>
        <div class="feature-desc">使用 <code style="font-size:11px;background:rgba(37,99,235,0.1);padding:1px 6px;border-radius:4px;color:#2563eb;">[100% 250px]</code> 语法限制图片显示高度，避免长图刷屏，读者可手动滚动查看完整图片。</div>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature-dot gold"></div>
      <div>
        <div class="feature-title">横向并排滑动</div>
        <div class="feature-desc">使用尖括号 <code style="font-size:11px;background:rgba(245,158,11,0.1);padding:1px 6px;border-radius:4px;color:#b45309;">&lt; ![](), ![]() &gt;</code> 语法，多张图片横向铺开展示，适合产品对比或系列图集。</div>
      </div>
    </div>
    <div class="feature-item">
      <div class="feature-dot teal"></div>
      <div>
        <div class="feature-title">自动轮播 Slider</div>
        <div class="feature-desc">使用 <code style="font-size:11px;background:rgba(13,148,136,0.1);padding:1px 6px;border-radius:4px;color:#0f766e;">&lt;slider&gt;</code> 标签，最多支持 5 张图片，默认间隔 3 秒，支持 4 种轮播类型及自定义宽高。</div>
      </div>
    </div>
  </div>
  <span class="slide-num">03 / 11</span>
</section>

<!-- SLIDE 4: SECTION 02 INTRO -->
<section class="slide slide-section">
  <div class="section-num">02</div>
  <div class="section-content">
    <div class="section-label">STYLES · 行内修饰与文字</div>
    <h2 class="section-title">渐变与<br>强调语法</h2>
    <p class="section-desc">提供渐变背景、胶囊文字、靛青强调、柔光重点等多种行内文字修饰风格，兼容所有经典 Markdown 语法。</p>
  </div>
  <span class="slide-num">04 / 11</span>
</section>

<!-- SLIDE 5: STYLES SHOWCASE -->
<section class="slide slide-styles">
  <div class="styles-header">
    <div class="heading-tag">STYLES · 行内修饰语法</div>
    <h2 class="heading-main white">六种文字修饰效果</h2>
    <div class="divider white"></div>
  </div>
  <div class="styles-grid">
    <div class="style-item">
      <div class="style-label">渐变背景 ==文字==</div>
      <div class="style-preview"><span class="grad-text">linear-gradient 渐变背景文字</span></div>
    </div>
    <div class="style-item">
      <div class="style-label">胶囊文字 !!文字!!</div>
      <div class="style-preview"><span class="pill-text">超圆角胶囊背景文字</span></div>
    </div>
    <div class="style-item">
      <div class="style-label">靛青强调 ^^文字^^</div>
      <div class="style-preview"><span class="indigo-text">Indigo 加重强调文字</span></div>
    </div>
    <div class="style-item">
      <div class="style-label">柔光重点 ::文字::</div>
      <div class="style-preview"><span class="soft-text">柔光蓝紫色文字重点</span></div>
    </div>
    <div class="style-item">
      <div class="style-label">下标 H~2~O · 上标 m^2^</div>
      <div class="style-preview" style="color:rgba(255,255,255,0.75);">H<sub>2</sub>O &nbsp;·&nbsp; m<sup>2</sup></div>
    </div>
    <div class="style-item">
      <div class="style-label">经典修饰</div>
      <div class="style-preview" style="color:rgba(255,255,255,0.75);font-size:13px;">
        <strong style="color:white;">粗体</strong> &nbsp;
        <u>下划线</u> &nbsp;
        <s>删除线</s> &nbsp;
        <em>斜体</em>
      </div>
    </div>
  </div>
  <span class="slide-num">05 / 11</span>
</section>

<!-- SLIDE 6: SECTION 04 COMPONENTS -->
<section class="slide slide-comp">
  <div class="comp-left">
    <div class="comp-num">04</div>
    <h2 class="comp-heading">核心交互<br>组件</h2>
    <p class="comp-sub">COMPONENTS · 卡片与布局<br><br>多种开箱即用的交互组件，涵盖公告卡片、提示框、步骤流与案例展示。</p>
  </div>
  <div class="comp-right">
    <div class="comp-card">
      <div class="comp-index">01</div>
      <div>
        <div class="comp-name">Breaking 重大更新卡片</div>
        <div class="comp-desc-sm">适合文章开头，展示最重要的核心结论或更新摘要，支持 badge、title、chips 等属性。</div>
      </div>
    </div>
    <div class="comp-card">
      <div class="comp-index">02</div>
      <div>
        <div class="comp-name">Callout 提示与建议</div>
        <div class="comp-desc-sm">使用 [TIP] 或 [NOTE] 标记，快速生成带背景色的提示框，引导读者注意关键操作。</div>
      </div>
    </div>
    <div class="comp-card">
      <div class="comp-index">03</div>
      <div>
        <div class="comp-name">Steps 横向 / 纵向步骤流</div>
        <div class="comp-desc-sm">支持 direction 属性切换横纵方向，active 属性高亮当前步骤，适合流程引导场景。</div>
      </div>
    </div>
    <div class="comp-card">
      <div class="comp-index">04</div>
      <div>
        <div class="comp-name">Case Flow 实践案例流</div>
        <div class="comp-desc-sm">以编号标签 [案例 01] 形式展示系列实践案例，视觉层次清晰，适合方法论内容。</div>
      </div>
    </div>
  </div>
  <span class="slide-num">06 / 11</span>
</section>

<!-- SLIDE 7: LAYOUT SECTION -->
<section class="slide slide-section">
  <div class="section-num">05</div>
  <div class="section-content">
    <div class="section-label">LAYOUT · 布局演示</div>
    <h2 class="section-title">对比布局<br>与引导组件</h2>
    <p class="section-desc">Before / After 对比、时间线 Timeline、行动召唤 CTA，让文章的叙事结构更有张力，引导读者走向结论。</p>
  </div>
  <span class="slide-num">07 / 11</span>
</section>

<!-- SLIDE 8: LAYOUT DEMOS -->
<section class="slide slide-layout">
  <div>
    <div class="heading-tag">LAYOUT · 组件效果预览</div>
    <h2 class="heading-main" style="font-size:28px;">四种布局组件一览</h2>
  </div>
  <div class="layout-row">
    <div class="layout-box">
      <div class="lbox-label">Timeline 时间线</div>
      <div class="timeline-row">
        <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;gap:0;">
          <div class="tl-dot"></div>
          <div style="width:1.5px;height:20px;background:rgba(37,99,235,0.2);margin-top:2px;"></div>
        </div>
        <div><div class="tl-date">2024.01</div><div class="tl-text">项目启动</div><div class="tl-sub">完成团队组建和需求分析</div></div>
      </div>
      <div class="timeline-row">
        <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;gap:0;">
          <div class="tl-dot"></div>
          <div style="width:1.5px;height:20px;background:rgba(37,99,235,0.2);margin-top:2px;"></div>
        </div>
        <div><div class="tl-date">2024.06</div><div class="tl-text">一期上线</div><div class="tl-sub">核心功能发布，用户突破1万</div></div>
      </div>
      <div class="timeline-row">
        <div style="width:10px;height:10px;border-radius:50%;background:var(--blue);flex-shrink:0;margin-top:4px;"></div>
        <div><div class="tl-date">2025.01</div><div class="tl-text">二期迭代</div><div class="tl-sub">新增AI辅助功能，用户突破10万</div></div>
      </div>
    </div>
    <div class="layout-box">
      <div class="lbox-label">Before / After 对比</div>
      <div class="compare-box">
        <div class="compare-side before">
          <div class="compare-label">BEFORE</div>
          <div class="compare-text">回味过去——图片各自为阵，排版散乱，视觉体验割裂。</div>
        </div>
        <div class="compare-side after">
          <div class="compare-label">AFTER</div>
          <div class="compare-text">展望未来——窗口化图片，并排展示，阅读流畅清晰。</div>
        </div>
      </div>
    </div>
  </div>
  <div class="layout-row">
    <div class="layout-box" style="grid-column: 1 / -1;">
      <div class="lbox-label">Steps 横向步骤流 — HOW IT WORKS</div>
      <div class="step-row" style="margin-top:8px;">
        <div class="step-item">
          <div class="step-circle">1</div>
          <div class="step-label">输入</div>
          <div class="step-sub">往知识库里喂东西</div>
        </div>
        <div class="step-item">
          <div class="step-circle">2</div>
          <div class="step-label">管理</div>
          <div class="step-sub">让知识库有序运转</div>
        </div>
        <div class="step-item">
          <div class="step-circle inactive">3</div>
          <div class="step-label">输出</div>
          <div class="step-sub">从知识库取素材做东西</div>
        </div>
      </div>
    </div>
  </div>
  <span class="slide-num">08 / 11</span>
</section>

<!-- SLIDE 9: BADGES + TASK LIST -->
<section class="slide slide-misc">
  <div class="misc-left" style="justify-content:center;gap:32px;">
    <div>
      <div class="heading-tag">MISC · 标签与任务</div>
      <h2 class="heading-main white" style="font-size:30px;margin-bottom:8px;">彩色标签 &amp; 任务列表</h2>
      <div class="divider white"></div>
    </div>
    <div>
      <div class="style-label" style="color:var(--slate-light);font-size:10px;letter-spacing:0.15em;font-family:var(--font-en);font-weight:700;text-transform:uppercase;margin-bottom:12px;">任务列表 Task List</div>
      <div class="task-item" style="font-size:15px;padding:10px 0;">
        <div class="task-check done" style="width:18px;height:18px;font-size:11px;">✓</div>
        <span style="color:rgba(255,255,255,0.85);">已完成任务</span>
      </div>
      <div class="task-item" style="font-size:15px;padding:10px 0;">
        <div class="task-check todo" style="width:18px;height:18px;"></div>
        <span style="color:rgba(255,255,255,0.55);">未完成任务</span>
      </div>
    </div>
  </div>
  <div class="misc-right" style="justify-content:center;gap:28px;">
    <div>
      <div class="style-label" style="color:var(--slate-light);font-size:10px;letter-spacing:0.15em;font-family:var(--font-en);font-weight:700;text-transform:uppercase;margin-bottom:14px;">彩色标签 Badges · tone 属性切换</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div>
          <div style="font-size:10px;color:var(--slate-light);font-family:var(--font-en);margin-bottom:6px;">tone="accent"</div>
          <div class="badge-row">
            <span class="badge accent">Vue</span>
            <span class="badge accent">TypeScript</span>
            <span class="badge accent">Vite</span>
            <span class="badge accent">Tailwind</span>
          </div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--slate-light);font-family:var(--font-en);margin-bottom:6px;">tone="green"</div>
          <div class="badge-row">
            <span class="badge green">React</span>
            <span class="badge green">Next.js</span>
            <span class="badge green">Tailwind</span>
            <span class="badge green">Prisma</span>
          </div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--slate-light);font-family:var(--font-en);margin-bottom:6px;">tone="yellow"</div>
          <div class="badge-row">
            <span class="badge amber">Python</span>
            <span class="badge amber">Django</span>
            <span class="badge amber">PostgreSQL</span>
            <span class="badge amber">Redis</span>
          </div>
        </div>
        <div>
          <div style="font-size:10px;color:var(--slate-light);font-family:var(--font-en);margin-bottom:6px;">tone="dark" &amp; 自定义</div>
          <div class="badge-row">
            <span class="badge dark">Docker</span>
            <span class="badge dark">Kubernetes</span>
            <span class="badge dark">AWS</span>
            <span class="badge red">自定义红底白字</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <span class="slide-num">09 / 11</span>
</section>

<!-- SLIDE 10: CODE + STATEMENT + KATEX -->
<section class="slide slide-misc">
  <div class="misc-left" style="justify-content:center;gap:28px;">
    <div>
      <div class="heading-tag">MISC · 代码与公式</div>
      <h2 class="heading-main white" style="font-size:30px;margin-bottom:8px;">代码块 &amp; KaTeX</h2>
      <div class="divider white"></div>
    </div>
    <div>
      <div class="style-label" style="color:var(--slate-light);font-size:10px;letter-spacing:0.15em;font-family:var(--font-en);font-weight:700;text-transform:uppercase;margin-bottom:10px;">数学公式 KaTeX</div>
      <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:16px 20px;font-size:13px;color:rgba(255,255,255,0.6);line-height:2;">
        行内公式：当 <em>a ≠ 0</em> 时，<em>ax² + bx + c = 0</em> 的解为：<br>
        <span style="color:rgba(255,255,255,0.92);font-size:16px;font-weight:500;">x = (−b ± √(b²−4ac)) / 2a</span><br>
        块级公式：<span style="color:rgba(255,255,255,0.92);font-size:15px;">∫₀^∞ e^(−x²) dx = √π / 2</span>
      </div>
    </div>
    <div>
      <div class="style-label" style="color:var(--slate-light);font-size:10px;letter-spacing:0.15em;font-family:var(--font-en);font-weight:700;text-transform:uppercase;margin-bottom:10px;">居中强调语 Statement</div>
      <div class="statement-box" style="font-size:14px;">这是一段居中的强调文字，适合用来突出核心观点或结论。</div>
    </div>
  </div>
  <div class="misc-right" style="justify-content:center;gap:20px;">
    <div>
      <div class="style-label" style="color:var(--slate-light);font-size:10px;letter-spacing:0.15em;font-family:var(--font-en);font-weight:700;text-transform:uppercase;margin-bottom:10px;">代码块 Code Block</div>
      <div class="code-block" style="font-size:12px;line-height:1.75;">
        <span class="code-comment">// 一个简单的 Vue 组件示例</span><br>
        <span class="code-kw">import</span> { ref } <span class="code-kw">from</span> <span class="code-str">'vue'</span><br>
        <br>
        <span class="code-kw">const</span> count = <span class="code-fn">ref</span>(<span class="code-str">0</span>)<br>
        <br>
        <span class="code-kw">function</span> <span class="code-fn">increment</span>() {<br>
        &nbsp;&nbsp;count.value++<br>
        &nbsp;&nbsp;console.<span class="code-fn">log</span>(<span class="code-str">'Count:'</span>, count.value)<br>
        }
      </div>
    </div>
    <div>
      <div class="style-label" style="color:var(--slate-light);font-size:10px;letter-spacing:0.15em;font-family:var(--font-en);font-weight:700;text-transform:uppercase;margin-bottom:10px;">引导文字段 Lead</div>
      <div style="border-left:3px solid var(--blue);padding:12px 16px;background:rgba(255,255,255,0.04);border-radius:0 8px 8px 0;font-size:13px;color:rgba(255,255,255,0.65);line-height:1.8;">
        Lead 组件会生成一段带有左侧边框的引导文字，适合用来引入话题或提供背景信息。视觉效果比普通段落更突出，非常适合用作文章的引言或过渡段落。
      </div>
    </div>
  </div>
  <span class="slide-num">10 / 11</span>
</section>

<!-- SLIDE 11: CLOSING -->
<section class="slide slide-close">
  <div class="close-inner">
    <div class="close-icon">♥</div>
    <h2 class="close-title">感谢你的阅读与支持！</h2>
    <p class="close-sub">所有组件都支持公众号无损复制，你可以根据需要自由组合，打造属于自己风格的图文排版。</p>
    <div class="engage-row">
      <div class="engage-btn"><span style="font-size:26px;">❤️</span><span>点赞</span></div>
      <div class="engage-btn"><span style="font-size:26px;">⭐</span><span>收藏</span></div>
      <div class="engage-btn"><span style="font-size:26px;">💬</span><span>留言</span></div>
    </div>
  </div>
  <span class="slide-num" style="color:rgba(255,255,255,0.3);">11 / 11</span>
</section>

</body>
</html>`
