export const DEMO_HTML = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>markdown2view — 纯前端排版与导出工作台</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
  --paper: #f0e8db;
  --paper-light: #f5f0e8;
  --ink: #1a1714;
  --ink-soft: #3a3530;
  --ink-muted: #6b6560;
  --ink-faint: #9b9590;
  --accent: #2c4a8c;
  --accent-warm: #8c3a20;
  --rule: rgba(26,23,20,0.12);
  --code-bg: #1e1c18;
  --code-fg: #d4c89a;

  --serif: 'Noto Serif SC', Georgia, serif;
  --sans: 'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  --mono: 'JetBrains Mono', 'Courier New', monospace;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { background: #2a2520; }

body {
  font-family: var(--sans);
  background: #2a2520;
  padding: 32px 0 64px;
  -webkit-font-smoothing: antialiased;
}

/* ── SLIDE CONTAINER ── */
.slide {
  width: min(100vw - 32px, 960px);
  aspect-ratio: 16 / 9;
  overflow: hidden;
  margin: 0 auto 20px;
  position: relative;
  background: var(--paper);
}

/* ── SHARED CHROME ── */
.header-strip {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  background: var(--accent);
}
.header-strip.warm { background: var(--accent-warm); }

.page-label {
  position: absolute;
  top: 18px; right: 28px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--ink-faint);
}

.footer-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 36px;
  border-top: 1px solid var(--rule);
  display: flex;
  align-items: center;
  padding: 0 28px;
  gap: 12px;
}
.footer-bar .brand {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--ink-faint);
  text-transform: uppercase;
}
.footer-bar .dot {
  width: 3px; height: 3px;
  border-radius: 50%;
  background: var(--ink-faint);
  opacity: 0.4;
}
.footer-bar .tagline {
  font-family: var(--sans);
  font-size: 9px;
  color: var(--ink-faint);
}

/* ── SLIDE 1: COVER ── */
.s1 { background: var(--ink); }
.s1 .header-strip { background: #c0a060; height: 3px; }

.s1-bg {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(192,160,96,0.04) 47px, rgba(192,160,96,0.04) 48px),
    repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(192,160,96,0.04) 47px, rgba(192,160,96,0.04) 48px);
}

.s1-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 56px 64px;
}

.s1-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.24em;
  color: #c0a060;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.s1-title {
  font-family: var(--serif);
  font-size: 72px;
  font-weight: 900;
  line-height: 1;
  color: #f5f0e4;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.s1-title .slash {
  color: #c0a060;
}

.s1-subtitle {
  font-family: var(--sans);
  font-size: 14px;
  font-weight: 300;
  color: rgba(245,240,228,0.6);
  letter-spacing: 0.04em;
  margin-bottom: 48px;
  max-width: 480px;
  line-height: 1.6;
}

.s1-pill-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.s1-pill {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  border: 1px solid rgba(192,160,96,0.3);
  color: #c0a060;
  padding: 4px 10px;
  border-radius: 2px;
}

.s1-right {
  position: absolute;
  right: 64px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.s1-stat {
  text-align: right;
}
.s1-stat-num {
  font-family: var(--serif);
  font-size: 40px;
  font-weight: 700;
  color: #c0a060;
  line-height: 1;
}
.s1-stat-label {
  font-family: var(--sans);
  font-size: 10px;
  color: rgba(245,240,228,0.4);
  letter-spacing: 0.08em;
  margin-top: 2px;
}

/* ── SLIDE 2: CONCEPT ── */
.s2-inner {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.s2-left {
  padding: 48px 40px 48px 48px;
  border-right: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.s2-right {
  padding: 48px 48px 48px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--paper-light);
}

.section-eyebrow {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.section-eyebrow.warm { color: var(--accent-warm); }

.section-title {
  font-family: var(--serif);
  font-size: 28px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.2;
  letter-spacing: -0.01em;
  margin-bottom: 16px;
}

.section-body {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 400;
  color: var(--ink-soft);
  line-height: 1.8;
}

.pull-quote {
  margin: 20px 0 0;
  padding-left: 16px;
  border-left: 3px solid var(--accent);
  font-family: var(--serif);
  font-size: 13px;
  font-style: italic;
  color: var(--ink-soft);
  line-height: 1.7;
}

.pull-quote.warm { border-left-color: var(--accent-warm); }

.principle-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.principle-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.principle-num {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--accent);
  min-width: 20px;
  padding-top: 2px;
  letter-spacing: 0.06em;
}

.principle-num.warm { color: var(--accent-warm); }

.principle-text {
  font-family: var(--sans);
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.6;
}

.principle-text strong {
  font-weight: 700;
  color: var(--ink);
}

/* ── SLIDE 3: BIG QUOTE ── */
.s3 { background: var(--accent); }

.s3-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 80px;
  text-align: center;
}

.s3-mark {
  font-family: var(--serif);
  font-size: 96px;
  font-weight: 900;
  color: rgba(255,255,255,0.12);
  line-height: 0.8;
  margin-bottom: 16px;
  align-self: flex-start;
  margin-left: -8px;
}

.s3-quote {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 400;
  color: rgba(255,255,255,0.95);
  line-height: 1.6;
  max-width: 720px;
}

.s3-source {
  margin-top: 32px;
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  color: rgba(255,255,255,0.45);
}

/* ── SLIDE 4: A4 MODE ── */
.s4-inner {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 280px;
}

.s4-left {
  padding: 40px 40px 40px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.s4-right {
  background: var(--ink);
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

/* A4 page visual mockup */
.a4-mockup {
  width: 120px;
  height: 170px;
  background: #fff;
  border: 1px solid rgba(26,23,20,0.15);
  box-shadow: 2px 2px 0 rgba(26,23,20,0.08);
  margin-bottom: 16px;
  padding: 12px;
  position: relative;
  flex-shrink: 0;
}

.a4-line {
  height: 6px;
  background: rgba(26,23,20,0.08);
  border-radius: 1px;
  margin-bottom: 4px;
}

.a4-line.title { height: 10px; background: rgba(44,74,140,0.2); width: 80%; margin-bottom: 8px; }
.a4-line.short { width: 60%; }
.a4-line.med { width: 75%; }

.a4-page-break {
  height: 1px;
  background: rgba(44,74,140,0.25);
  margin: 8px 0;
  position: relative;
}

.a4-page-break::after {
  content: 'PAGE 2';
  position: absolute;
  right: 0;
  top: -6px;
  font-family: var(--mono);
  font-size: 6px;
  color: var(--accent);
  letter-spacing: 0.1em;
}

.tech-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 16px;
}

.tech-tag {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.06em;
  background: rgba(44,74,140,0.08);
  color: var(--accent);
  border: 1px solid rgba(44,74,140,0.2);
  padding: 3px 8px;
  border-radius: 2px;
}

/* ── SLIDE 5: MODE 2 (Longform) ── */
.s5-inner {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 280px 1fr;
}

.s5-left {
  background: var(--ink);
  padding: 48px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.mode-badge {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  background: rgba(192,160,96,0.15);
  color: #c0a060;
  padding: 4px 8px;
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
  margin-bottom: 16px;
}

.mode-num {
  font-family: var(--serif);
  font-size: 80px;
  font-weight: 900;
  color: rgba(192,160,96,0.15);
  line-height: 1;
  margin-bottom: -8px;
}

.mode-title {
  font-family: var(--serif);
  font-size: 20px;
  font-weight: 700;
  color: #f5f0e4;
  line-height: 1.3;
}

.mode-en {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: rgba(245,240,228,0.3);
  margin-top: 6px;
}

.s5-right {
  padding: 40px 40px 40px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.feature-card {
  background: var(--paper-light);
  border: 1px solid var(--rule);
  padding: 16px;
  border-radius: 2px;
}

.feature-card-title {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 6px;
}

.feature-card-body {
  font-family: var(--sans);
  font-size: 10px;
  color: var(--ink-muted);
  line-height: 1.6;
}

.feature-highlight {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--accent);
  margin-top: 6px;
  letter-spacing: 0.04em;
}

/* ── SLIDE 6: SOCIAL CARDS ── */
.s6-inner {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 280px 1fr;
}

.s6-left {
  background: #f5efe4;
  border-right: 1px solid var(--rule);
  padding: 40px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.s6-right {
  padding: 32px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

/* Mini card previews */
.card-row {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.mini-card {
  background: #1a1714;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.mini-card.r34 { width: 72px; height: 96px; }
.mini-card.r916 { width: 54px; height: 96px; }

.mini-card-header {
  height: 40px;
  background: linear-gradient(135deg, #2c4a8c, #1a2d5a);
}

.mini-card-body {
  padding: 6px;
}

.mini-card-line {
  height: 4px;
  background: rgba(255,255,255,0.2);
  border-radius: 1px;
  margin-bottom: 3px;
}
.mini-card-line.short { width: 60%; }

.mini-card-num {
  font-family: var(--mono);
  font-size: 8px;
  color: rgba(255,255,255,0.3);
  margin-top: 4px;
}

/* ── SLIDE 7: HTML CANVAS MODE ── */
.s7 { background: #0f0e0c; }

.s7-inner {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.s7-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(44,74,140,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(44,74,140,0.06) 1px, transparent 1px);
  background-size: 40px 40px;
}

.s7-content {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.s7-left {
  padding: 48px 40px 48px 56px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.s7-right {
  padding: 32px 48px 32px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
}

.s7-eyebrow {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: rgba(44,74,140,0.8);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.s7-title {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 700;
  color: #f5f0e4;
  line-height: 1.15;
  letter-spacing: -0.01em;
  margin-bottom: 20px;
}

.s7-body {
  font-size: 11px;
  color: rgba(245,240,228,0.55);
  line-height: 1.8;
}

.code-block {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  padding: 14px 16px;
  font-family: var(--mono);
  font-size: 10px;
  line-height: 1.7;
  color: var(--code-fg);
}

.code-block .kw { color: #7ab4f5; }
.code-block .str { color: #b5c07a; }
.code-block .cm { color: #666053; }

.capability-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cap-item {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 11px;
  color: rgba(245,240,228,0.7);
}

.cap-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: rgba(44,74,140,0.8);
  flex-shrink: 0;
}

/* ── SLIDE 8: TECH STACK ── */
.s8-inner {
  position: absolute;
  inset: 0;
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
}

.s8-title-row {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule);
}

.s8-main-title {
  font-family: var(--serif);
  font-size: 32px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
}

.s8-sub {
  font-family: var(--sans);
  font-size: 11px;
  color: var(--ink-faint);
}

.stack-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  flex: 1;
  align-content: start;
}

.stack-item {
  padding: 16px 14px;
  border: 1px solid var(--rule);
  border-radius: 2px;
  background: var(--paper-light);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stack-item-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.1em;
  color: var(--ink-faint);
  text-transform: uppercase;
}

.stack-item-name {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 700;
  color: var(--ink);
  line-height: 1.3;
}

.stack-item-detail {
  font-family: var(--sans);
  font-size: 10px;
  color: var(--ink-muted);
  line-height: 1.5;
  margin-top: 2px;
}

.stack-item.accent { border-color: rgba(44,74,140,0.25); }
.stack-item.accent .stack-item-name { color: var(--accent); }

/* ── SLIDE 9: ARCHITECTURE ── */
.s9-inner {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 240px 1fr;
}

.s9-left {
  background: var(--ink);
  padding: 40px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.s9-right {
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.dir-tree {
  font-family: var(--mono);
  font-size: 9px;
  line-height: 1.9;
  color: rgba(245,240,228,0.5);
}

.dir-tree .dir-name { color: #c0a060; }
.dir-tree .hl { color: rgba(245,240,228,0.85); }

.arch-title {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.01em;
  margin-bottom: 20px;
}

/* Architecture flow boxes */
.arch-flow {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.arch-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.arch-box {
  padding: 10px 14px;
  border: 1px solid var(--rule);
  background: var(--paper-light);
  border-radius: 2px;
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 700;
  color: var(--ink);
  flex: 1;
  text-align: center;
}

.arch-box.blue {
  background: rgba(44,74,140,0.08);
  border-color: rgba(44,74,140,0.2);
  color: var(--accent);
}

.arch-box.sub {
  font-size: 9px;
  font-weight: 400;
  color: var(--ink-muted);
  padding: 6px 12px;
}

.arch-arrow {
  font-family: var(--mono);
  font-size: 14px;
  color: var(--ink-faint);
  flex-shrink: 0;
}

.arch-label {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.08em;
  color: var(--ink-faint);
  text-align: center;
  margin: 4px 0;
}

/* ── SLIDE 10: REFERENCES ── */
.s10-inner {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.ref-col {
  padding: 40px 32px;
  border-right: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ref-col:last-child { border-right: none; }

.ref-num {
  font-family: var(--serif);
  font-size: 48px;
  font-weight: 900;
  color: var(--rule);
  line-height: 1;
  margin-bottom: 12px;
}

.ref-project {
  font-family: var(--mono);
  font-size: 11px;
  font-weight: 500;
  color: var(--accent);
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}

.ref-desc {
  font-family: var(--sans);
  font-size: 10px;
  color: var(--ink-muted);
  line-height: 1.7;
}

.ref-tag {
  font-family: var(--mono);
  font-size: 8px;
  letter-spacing: 0.1em;
  color: var(--accent-warm);
  margin-top: 10px;
  text-transform: uppercase;
}

/* ── SLIDE 11: CLOSE ── */
.s11 { background: var(--ink); }

.s11-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;
  padding: 56px;
}

.s11-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.24em;
  color: rgba(192,160,96,0.5);
  text-transform: uppercase;
  margin-bottom: 24px;
}

.s11-big {
  font-family: var(--serif);
  font-size: 56px;
  font-weight: 900;
  color: #f5f0e4;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  text-align: center;
}

.s11-sub {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 300;
  color: rgba(245,240,228,0.45);
  letter-spacing: 0.08em;
  text-align: center;
  max-width: 480px;
  line-height: 1.8;
  margin-bottom: 48px;
}

.s11-badge-row {
  display: flex;
  gap: 12px;
}

.s11-badge {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  border: 1px solid rgba(192,160,96,0.3);
  color: rgba(192,160,96,0.7);
  padding: 6px 14px;
  border-radius: 2px;
}

/* ── SLIDE 12: 封底 / 感谢观看 ── */
.s12 { background: var(--ink); }
.s12 .header-strip { background: #c0a060; height: 3px; }

.s12-bg {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, transparent, transparent 47px, rgba(192,160,96,0.04) 47px, rgba(192,160,96,0.04) 48px),
    repeating-linear-gradient(90deg, transparent, transparent 47px, rgba(192,160,96,0.04) 47px, rgba(192,160,96,0.04) 48px);
}

.s12-mark {
  position: absolute;
  top: 28px; left: 48px;
  font-family: var(--serif);
  font-size: 160px;
  font-weight: 900;
  color: rgba(192,160,96,0.06);
  line-height: 0.7;
  user-select: none;
}

.s12-inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 64px;
  text-align: center;
}

.s12-eyebrow {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.26em;
  color: #c0a060;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.s12-title {
  font-family: var(--serif);
  font-size: 64px;
  font-weight: 900;
  color: #f5f0e4;
  line-height: 1;
  letter-spacing: -0.02em;
}
.s12-title .slash { color: #c0a060; }

.s12-divider {
  width: 48px;
  height: 2px;
  background: rgba(192,160,96,0.5);
  margin: 24px 0;
}

.s12-thanks {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 300;
  color: rgba(245,240,228,0.5);
  letter-spacing: 0.04em;
  line-height: 1.9;
  max-width: 540px;
  margin-bottom: 36px;
}
.s12-thanks strong { color: #c0a060; font-weight: 500; }

.s12-feedback-label {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: rgba(245,240,228,0.35);
  text-transform: uppercase;
  margin-bottom: 16px;
}

.s12-channels {
  display: flex;
  gap: 12px;
}

.s12-channel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  border: 1px solid rgba(192,160,96,0.25);
  padding: 12px 24px;
  border-radius: 2px;
  min-width: 100px;
}

.s12-channel-name {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #c0a060;
}

.s12-channel-desc {
  font-family: var(--sans);
  font-size: 9px;
  color: rgba(245,240,228,0.4);
}

/* ── PRINT ── */
@media print {
  html { background: white; }
  body { padding: 0; background: white; }
  .slide {
    width: 100%;
    aspect-ratio: 16 / 9;
    margin: 0;
    page-break-after: always;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
</head>
<body>

<!-- ── SLIDE 1: COVER ── -->
<section class="slide s1">
  <div class="header-strip" style="background:#c0a060;height:3px;"></div>
  <div class="s1-bg"></div>
  <div class="s1-content">
    <div class="s1-eyebrow">开源项目 · 技术产品</div>
    <div class="s1-title">markdown<span class="slash">/</span>view</div>
    <div class="s1-subtitle">纯前端、零后端的多场景排版与导出工作台<br>把同一份内容渲染为面向不同受众的成品形态</div>
    <div class="s1-pill-row">
      <span class="s1-pill">React 18</span>
      <span class="s1-pill">TypeScript</span>
      <span class="s1-pill">Vite</span>
      <span class="s1-pill">CodeMirror 6</span>
      <span class="s1-pill">MIT License</span>
    </div>
  </div>
  <div class="s1-right">
    <div class="s1-stat">
      <div class="s1-stat-num">4</div>
      <div class="s1-stat-label">排版模式</div>
    </div>
    <div class="s1-stat">
      <div class="s1-stat-num">0</div>
      <div class="s1-stat-label">后端依赖</div>
    </div>
    <div class="s1-stat">
      <div class="s1-stat-num">5+</div>
      <div class="s1-stat-label">导出格式</div>
    </div>
  </div>
  <div class="footer-bar" style="border-top-color:rgba(192,160,96,0.15)">
    <span class="brand" style="color:rgba(192,160,96,0.4);">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline" style="color:rgba(245,240,228,0.25);">零网络传输 · 隐私安全 · 浏览器原生能力</span>
  </div>
  <div class="page-label" style="color:rgba(192,160,96,0.3);">01 / 12</div>
</section>

<!-- ── SLIDE 2: 设计初衷 ── -->
<section class="slide">
  <div class="header-strip"></div>
  <div class="s2-inner">
    <div class="s2-left">
      <div class="section-eyebrow">设计初衷</div>
      <div class="section-title">内容一次创作<br>多端无损分发</div>
      <div class="section-body">
        免去繁琐的后端依赖与服务部署，利用浏览器原生的渲染能力、排版实测技术和沙箱机制，实现极致的内容分发与设计自由。
      </div>
      <div class="pull-quote">
        同一份 Markdown，公众号长图、A4 文档、小红书卡片、网页 PPT，一键切换，随写随导。
      </div>
    </div>
    <div class="s2-right">
      <div class="section-eyebrow">三项核心原则</div>
      <ul class="principle-list">
        <li class="principle-item">
          <span class="principle-num">01</span>
          <span class="principle-text"><strong>零服务器</strong> — 所有处理在浏览器本地完成，数据不离开设备，无隐私风险</span>
        </li>
        <li class="principle-item">
          <span class="principle-num">02</span>
          <span class="principle-text"><strong>内容优先</strong> — 写一次，适配多种成品形态；平台差异由渲染引擎透明处理</span>
        </li>
        <li class="principle-item">
          <span class="principle-num">03</span>
          <span class="principle-text"><strong>开放扩展</strong> — 基于 MIT 协议开源，自定义组件与主题可直接接入排版引擎</span>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer-bar">
    <span class="brand">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline">核心理念</span>
  </div>
  <div class="page-label">02 / 12</div>
</section>

<!-- ── SLIDE 3: BIG QUOTE ── -->
<section class="slide s3">
  <div class="s3-content">
    <div class="s3-mark">&ldquo;</div>
    <div class="s3-quote">同一份 Markdown 草稿，一键切换为公众号长图、A4 文档、社交卡片或网页 PPT —— 内容一次创作，多端无损分发</div>
    <div class="s3-source">markdown2view · 核心产品理念</div>
  </div>
  <div class="page-label" style="color:rgba(255,255,255,0.25);">03 / 12</div>
</section>

<!-- ── SLIDE 4: A4 文档模式 ── -->
<section class="slide">
  <div class="header-strip"></div>
  <div class="s4-inner">
    <div class="s4-left">
      <div class="section-eyebrow" style="margin-bottom:20px;">🖨 MODE 01 — A4 规范文档模式</div>
      <div class="section-title" style="font-size:24px;margin-bottom:16px;">纯前端智能分页<br>完美还原印刷质感</div>
      <div class="section-body" style="margin-bottom:16px;">
        内置高度实测机制，结合 ResizeObserver 及图片 load 监听，实时精确计算 A4 页面物理高度并进行平滑跨页分页，彻底解决图片被截断的痛点。
      </div>
      <div style="display:flex;gap:20px;align-items:flex-start;margin-top:8px;">
        <div class="a4-mockup">
          <div class="a4-line title"></div>
          <div class="a4-line"></div>
          <div class="a4-line med"></div>
          <div class="a4-line short"></div>
          <div class="a4-line"></div>
          <div class="a4-line med"></div>
          <div class="a4-page-break"></div>
          <div class="a4-line"></div>
          <div class="a4-line short"></div>
          <div class="a4-line med"></div>
          <div class="a4-line"></div>
        </div>
        <div>
          <ul class="principle-list" style="gap:12px;">
            <li class="principle-item">
              <span class="principle-num">①</span>
              <span class="principle-text" style="font-size:11px;"><strong>自定义页眉页脚</strong> — 页码、标题、首行缩进、字体倍率全部可调</span>
            </li>
            <li class="principle-item">
              <span class="principle-num">②</span>
              <span class="principle-text" style="font-size:11px;"><strong>浏览器打印 / PDF 导出</strong> — 调用原生打印机制，背景色保留，不依赖服务器</span>
            </li>
            <li class="principle-item">
              <span class="principle-num">③</span>
              <span class="principle-text" style="font-size:11px;"><strong>封面页等距分布</strong> — 首页仅含标题和表格时自动垂直居中排版</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="tech-tag-row">
        <span class="tech-tag">ResizeObserver</span>
        <span class="tech-tag">img.load 监听</span>
        <span class="tech-tag">@media print</span>
        <span class="tech-tag">高度实测分页算法</span>
      </div>
    </div>
    <div class="s4-right">
      <div class="mode-badge">🖨 MODE 01</div>
      <div class="mode-num">01</div>
      <div class="mode-title">A4 规范<br>文档模式</div>
      <div class="mode-en">A4 Document</div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="brand">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline">A4 文档 · 无损打印 · 前端分页</span>
  </div>
  <div class="page-label">04 / 12</div>
</section>

<!-- ── SLIDE 5: 长图文模式 ── -->
<section class="slide">
  <div class="header-strip warm"></div>
  <div class="s5-inner">
    <div class="s5-left">
      <div class="mode-badge">📝 MODE 02</div>
      <div class="mode-num">02</div>
      <div class="mode-title">长图文<br>排版模式</div>
      <div class="mode-en">WeChat Longform</div>
    </div>
    <div class="s5-right">
      <div class="section-eyebrow warm" style="margin-bottom:20px;">核心能力</div>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-card-title">公众号无损渲染</div>
          <div class="feature-card-body">支持自定义组件 steps、timeline、compare、slider，直接复用公众号排版引擎</div>
          <div class="feature-highlight">自定义 Markdown 语法扩展</div>
        </div>
        <div class="feature-card">
          <div class="feature-card-title">一键复制富文本</div>
          <div class="feature-card-body">完美兼容微信公众平台、知乎、头条等图文编辑器，保留格式无偏差</div>
          <div class="feature-highlight">clipboard API · 富文本保真</div>
        </div>
        <div class="feature-card">
          <div class="feature-card-title">万字流畅编辑</div>
          <div class="feature-card-body">输入防抖 Debounce 与状态解耦保证万字长文编辑时不卡顿</div>
          <div class="feature-highlight">CodeMirror 6 · Zustand 状态管理</div>
        </div>
        <div class="feature-card">
          <div class="feature-card-title">本地持久化</div>
          <div class="feature-card-body">Zustand persist 中间件自动将草稿写入 localStorage，关窗不丢内容</div>
          <div class="feature-highlight">零后端 · 离线可用</div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="brand">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline">长图文排版 · 公众号生态</span>
  </div>
  <div class="page-label">05 / 12</div>
</section>

<!-- ── SLIDE 6: 小红书卡片 ── -->
<section class="slide">
  <div class="header-strip" style="background:#d4547e;"></div>
  <div class="s6-inner">
    <div class="s6-left">
      <div class="mode-badge" style="background:rgba(212,84,126,0.12);color:#d4547e;border:1px solid rgba(212,84,126,0.25);">📷 MODE 03</div>
      <div class="mode-num" style="color:rgba(212,84,126,0.12);">03</div>
      <div class="mode-title">小红书<br>多页卡片</div>
      <div class="mode-en" style="color:rgba(26,23,20,0.35);">Social Cards</div>
    </div>
    <div class="s6-right">
      <div class="section-eyebrow" style="color:#d4547e;margin-bottom:16px;">生成与导出</div>
      <div class="card-row">
        <div class="mini-card r34">
          <div class="mini-card-header"></div>
          <div class="mini-card-body">
            <div class="mini-card-line"></div>
            <div class="mini-card-line short"></div>
            <div class="mini-card-line"></div>
            <div class="mini-card-num">3:4</div>
          </div>
        </div>
        <div class="mini-card r916">
          <div class="mini-card-header"></div>
          <div class="mini-card-body">
            <div class="mini-card-line"></div>
            <div class="mini-card-line short"></div>
            <div class="mini-card-num">9:16</div>
          </div>
        </div>
        <div style="flex:1;padding-left:12px;">
          <ul class="principle-list" style="gap:10px;">
            <li class="principle-item">
              <span class="principle-num" style="color:#d4547e;">①</span>
              <span class="principle-text" style="font-size:11px;"><strong>自动序号角标</strong>与作者 Logo 注入</span>
            </li>
            <li class="principle-item">
              <span class="principle-num" style="color:#d4547e;">②</span>
              <span class="principle-text" style="font-size:11px;">Frontmatter 智能生成<strong>社交文案</strong></span>
            </li>
            <li class="principle-item">
              <span class="principle-num" style="color:#d4547e;">③</span>
              <span class="principle-text" style="font-size:11px;"><strong>批量 ZIP 导出</strong>或逐张高清 PNG 下载</span>
            </li>
          </ul>
        </div>
      </div>
      <div style="margin-top:16px;padding:14px 16px;background:rgba(212,84,126,0.05);border:1px solid rgba(212,84,126,0.12);border-radius:2px;">
        <div style="font-family:var(--mono);font-size:9px;color:#d4547e;letter-spacing:0.1em;margin-bottom:6px;">EXPORT OPTIONS</div>
        <div style="font-size:11px;color:var(--ink-muted);line-height:1.7;">html2canvas 高清截图 → PNG · 批量 ZIP 打包 · 逐张下载<br>完全运行在浏览器端，零网络传输，隐私安全</div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="brand">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline">小红书卡片 · 3:4 / 9:16 · 批量导出</span>
  </div>
  <div class="page-label">06 / 12</div>
</section>

<!-- ── SLIDE 7: HTML 自由画布 ── -->
<section class="slide s7">
  <div class="s7-inner">
    <div class="s7-grid"></div>
    <div class="s7-content">
      <div class="s7-left">
        <div class="s7-eyebrow">🎨 MODE 04 — HTML 可视化自由画布</div>
        <div class="s7-title" style="color:#f5f0e4;">沙箱隔离渲染<br>网页 PPT 专属呈现</div>
        <div class="s7-body">
          内置基于 iframe 容器的隔离机制，防止样式污染，支持导入 Tailwind Play CDN 等外部样式。生成带有极致字号对比的「电子杂志风格」横向翻页网页 PPT。
        </div>
        <div class="capability-list" style="margin-top:20px;">
          <div class="cap-item"><span class="cap-dot"></span>键盘 / 手势切换幻灯片</div>
          <div class="cap-item"><span class="cap-dot"></span>WebGL 背景支持</div>
          <div class="cap-item"><span class="cap-dot" style="background:rgba(192,160,96,0.7)"></span>waitForStability 高清截图导出</div>
          <div class="cap-item"><span class="cap-dot" style="background:rgba(192,160,96,0.7)"></span>MutationObserver DOM 稳定性探测</div>
        </div>
      </div>
      <div class="s7-right">
        <div class="code-block">
<span class="cm">// 探测 DOM 稳定后截图</span>
<span class="kw">async function</span> waitForStability() {
  <span class="kw">return new</span> Promise(resolve => {
    <span class="kw">const</span> obs = <span class="kw">new</span> MutationObserver(
      debounce(() => {
        obs.disconnect();
        resolve();
      }, <span class="str">200</span>)
    );
    obs.observe(document.body, {
      subtree: <span class="str">true</span>,
      childList: <span class="str">true</span>
    });
  });
}
        </div>
        <div style="padding:12px 14px;border:1px solid rgba(255,255,255,0.08);border-radius:4px;font-family:var(--mono);font-size:9px;color:rgba(245,240,228,0.35);line-height:1.8;">
          电子杂志风格 · 瑞士国际主义风格<br>
          源自 guizang-ppt-skill 设计精髓
        </div>
      </div>
    </div>
  </div>
  <div class="page-label" style="color:rgba(245,240,228,0.2);"><span style="color:#d4c89a;">07 / 12</span></div>
</section>

<!-- ── SLIDE 8: 技术栈 ── -->
<section class="slide">
  <div class="header-strip"></div>
  <div class="s8-inner">
    <div class="s8-title-row">
      <div class="s8-main-title">技术栈全览</div>
      <div class="s8-sub">Node.js ≥ 20 · pnpm ≥ 10 · 完全运行于浏览器端</div>
    </div>
    <div class="stack-grid">
      <div class="stack-item accent">
        <div class="stack-item-label">前端框架</div>
        <div class="stack-item-name">React 18</div>
        <div class="stack-item-detail">TypeScript + Vite 构建，热更新开发体验</div>
      </div>
      <div class="stack-item accent">
        <div class="stack-item-label">编辑器内核</div>
        <div class="stack-item-name">CodeMirror 6</div>
        <div class="stack-item-detail">Markdown 语法高亮，万字流畅输入</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">状态管理</div>
        <div class="stack-item-name">Zustand</div>
        <div class="stack-item-detail">persist 中间件自动本地持久化草稿</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">样式系统</div>
        <div class="stack-item-name">Tailwind v4</div>
        <div class="stack-item-detail">+ Vanilla CSS，响应式自适应布局</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">导出技术</div>
        <div class="stack-item-name">html2canvas</div>
        <div class="stack-item-detail">+ jsPDF，纯浏览器端 PNG / PDF 导出</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">Markdown 解析</div>
        <div class="stack-item-name">自研引擎</div>
        <div class="stack-item-detail">支持 steps、timeline、slider 等自定义语法</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">分页算法</div>
        <div class="stack-item-name">ResizeObserver</div>
        <div class="stack-item-detail">实时高度实测，平滑跨页无截断</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">截图优化</div>
        <div class="stack-item-name">MutationObserver</div>
        <div class="stack-item-detail">waitForStability 替代 sleep，稳定截帧</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">沙箱隔离</div>
        <div class="stack-item-name">iframe 沙箱</div>
        <div class="stack-item-detail">防止样式污染，支持外部 CDN 资源</div>
      </div>
      <div class="stack-item">
        <div class="stack-item-label">开源协议</div>
        <div class="stack-item-name">MIT License</div>
        <div class="stack-item-detail">自由使用、修改与商业应用</div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="brand">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline">技术栈 · 零后端依赖 · 浏览器原生能力</span>
  </div>
  <div class="page-label">08 / 12</div>
</section>

<!-- ── SLIDE 9: 目录结构 ── -->
<section class="slide">
  <div class="header-strip"></div>
  <div class="s9-inner">
    <div class="s9-left">
      <div>
        <div style="font-family:var(--mono);font-size:9px;letter-spacing:0.16em;color:#c0a060;margin-bottom:12px;">SRC/ STRUCTURE</div>
        <div class="dir-tree">
<span class="dir-name">src/</span><br>
├ <span class="dir-name">engine/</span><br>
│ ├ <span class="hl">utils/</span>  markdownParser<br>
│ ├ <span class="hl">editor-components/</span><br>
│ └ composables/<br>
├ <span class="dir-name">components/</span><br>
│ ├ editor/  CodeMirror<br>
│ └ ui/  Toast / Button<br>
├ <span class="dir-name">modes/</span><br>
│ ├ <span class="hl">article/</span><br>
│ ├ <span class="hl">document/</span><br>
│ ├ <span class="hl">card/</span><br>
│ └ <span class="hl">html/</span><br>
├ lib/  store / exportImage<br>
├ data/  demo + prompts<br>
├ <span class="hl">App.tsx</span>  模式切换入口<br>
└ main.tsx
        </div>
      </div>
      <div style="font-family:var(--mono);font-size:8px;color:rgba(192,160,96,0.3);letter-spacing:0.1em;margin-top:16px;">框架无关渲染引擎</div>
    </div>
    <div class="s9-right">
      <div class="arch-title">架构分层</div>
      <div class="arch-flow">
        <div class="arch-label">输入层</div>
        <div class="arch-row">
          <div class="arch-box blue">Markdown 编辑器<br><span style="font-size:9px;font-weight:400;">CodeMirror 6</span></div>
          <div class="arch-arrow">→</div>
          <div class="arch-box blue">HTML 画布<br><span style="font-size:9px;font-weight:400;">自由输入</span></div>
        </div>
        <div class="arch-label">引擎层</div>
        <div class="arch-row">
          <div class="arch-box" style="flex:1;">自定义 Markdown 解析器</div>
          <div class="arch-arrow" style="opacity:0;"></div>
          <div class="arch-box" style="flex:1;">iframe 沙箱渲染器</div>
        </div>
        <div class="arch-label">渲染层 — 四种模式</div>
        <div class="arch-row" style="flex-wrap:wrap;gap:6px;">
          <div class="arch-box sub">📝 长图文</div>
          <div class="arch-box sub">🖨 A4 文档</div>
          <div class="arch-box sub">📷 社交卡片</div>
          <div class="arch-box sub">🎨 自由画布</div>
        </div>
        <div class="arch-label">导出层</div>
        <div class="arch-row">
          <div class="arch-box sub">复制富文本</div>
          <div class="arch-box sub">PNG 截图</div>
          <div class="arch-box sub">PDF 打印</div>
          <div class="arch-box sub">ZIP 批量</div>
        </div>
      </div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="brand">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline">项目架构 · 模块分层</span>
  </div>
  <div class="page-label">09 / 12</div>
</section>

<!-- ── SLIDE 10: 开源致敬 ── -->
<section class="slide">
  <div class="header-strip"></div>
  <div style="position:absolute;top:0;left:0;right:0;padding:32px 48px 0;display:flex;align-items:baseline;gap:16px;border-bottom:1px solid var(--rule);padding-bottom:20px;">
    <div class="section-eyebrow" style="margin:0;">开源参考与设计致敬</div>
  </div>
  <div class="s10-inner" style="top:72px;position:absolute;bottom:36px;left:0;right:0;">
    <div class="ref-col">
      <div class="ref-num">01</div>
      <div class="ref-project">r-markdown</div>
      <div class="ref-desc">
        移植了微信公众号渲染引擎的核心解析逻辑、多款排版组件以及主题配色方案。长图文模式的技术基础来源于此。
      </div>
      <div class="ref-tag">RobocopMao · 渲染引擎</div>
    </div>
    <div class="ref-col">
      <div class="ref-num">02</div>
      <div class="ref-project">html-anything</div>
      <div class="ref-desc">
        启发了 HTML 可视化画布中基于 iframe 容器的安全隔离设计与导图规范，奠定沙箱架构基础。
      </div>
      <div class="ref-tag">nexu-io · 沙箱隔离设计</div>
    </div>
    <div class="ref-col">
      <div class="ref-num">03</div>
      <div class="ref-project">guizang-ppt-skill</div>
      <div class="ref-desc">
        自由画布中「电子杂志」「瑞士国际主义」的风格参考，以及网页 PPT 主题节奏、标准图片比例、版式校验等经验启发。
      </div>
      <div class="ref-tag" style="color:var(--ink-faint);">op7418 · AGPL-3.0 · 仅设计经验转译</div>
    </div>
  </div>
  <div class="footer-bar">
    <span class="brand">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline">致敬开源社区 · 站在巨人肩膀上</span>
  </div>
  <div class="page-label">10 / 12</div>
</section>

<!-- ── SLIDE 11: CLOSE ── -->
<section class="slide s11">
  <div class="header-strip" style="background:#c0a060;height:3px;"></div>
  <div class="s11-inner">
    <div class="s11-label">快速开始</div>
    <div class="s11-big">pnpm install<br>&amp;&amp; pnpm dev</div>
    <div class="s11-sub">
      Node.js ≥ 20 · pnpm ≥ 10<br>
      默认启动于 http://localhost:5173 · 热更新开发环境
    </div>
    <div class="s11-badge-row">
      <span class="s11-badge">MIT License</span>
      <span class="s11-badge">零后端</span>
      <span class="s11-badge">4 种排版模式</span>
      <span class="s11-badge">浏览器原生导出</span>
    </div>
  </div>
  <div class="footer-bar" style="border-top-color:rgba(192,160,96,0.15)">
    <span class="brand" style="color:rgba(192,160,96,0.4);">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline" style="color:rgba(245,240,228,0.25);">开源 · 纯前端 · 极致排版自由度</span>
  </div>
  <div class="page-label" style="color:rgba(192,160,96,0.3);">11 / 12</div>
</section>

<!-- ── SLIDE 12: 感谢观看 + 欢迎反馈 ── -->
<section class="slide s12">
  <div class="header-strip" style="background:#c0a060;height:3px;"></div>
  <div class="s12-bg"></div>
  <div class="s12-mark">&rdquo;</div>
  <div class="s12-inner">
    <div class="s12-eyebrow">Thank You for Watching</div>
    <div class="s12-title">感谢观看<span class="slash">.</span></div>
    <div class="s12-divider"></div>
    <div class="s12-thanks">
      本项目站在众多开源项目的肩膀上 —— 致敬 <strong>r-markdown</strong>、<strong>html-anything</strong>、<strong>guizang-ppt-skill</strong> 以及每一位开源贡献者。<br>markdown2view 基于 MIT 协议开源，期待与你一同打磨。
    </div>
    <div class="s12-feedback-label">欢迎反馈与共建</div>
    <div class="s12-channels">
      <div class="s12-channel">
        <div class="s12-channel-name">Issue</div>
        <div class="s12-channel-desc">提交问题与建议</div>
      </div>
      <div class="s12-channel">
        <div class="s12-channel-name">Pull Request</div>
        <div class="s12-channel-desc">贡献代码与组件</div>
      </div>
      <div class="s12-channel">
        <div class="s12-channel-name">Star</div>
        <div class="s12-channel-desc">支持项目持续迭代</div>
      </div>
    </div>
  </div>
  <div class="footer-bar" style="border-top-color:rgba(192,160,96,0.15)">
    <span class="brand" style="color:rgba(192,160,96,0.4);">markdown2view</span>
    <span class="dot"></span>
    <span class="tagline" style="color:rgba(245,240,228,0.25);">感谢观看 · 欢迎 Issue / PR / Star 共建</span>
  </div>
  <div class="page-label" style="color:rgba(192,160,96,0.3);">12 / 12</div>
</section>

</body>
</html>
`;
