import React from 'react'
import type { DesignStyle } from '@/data/designPrompts'

interface StyleThumbnailProps {
  style: DesignStyle
  onPreview?: (style: DesignStyle) => void
}

/** visualTone → 背景色映射 */
const TONE_BG: Record<string, string> = {
  '极简': '#ffffff',
  '编辑': '#fafaf8',
  '科技': '#0f1117',
  '数据': '#f0f2f5',
  '温暖': '#fdf8f3',
  '代码': '#0f1115',
}

/** visualTone → 文字色 */
const TONE_TEXT: Record<string, string> = {
  '极简': '#1a1a1a',
  '编辑': '#222222',
  '科技': '#e8eaed',
  '数据': '#1f2937',
  '温暖': '#3d3929',
  '代码': '#d4d4d8',
}

/** visualTone → 次要文字色 */
const TONE_SUBTEXT: Record<string, string> = {
  '极简': '#999999',
  '编辑': '#666666',
  '科技': '#8a8f98',
  '数据': '#6b7280',
  '温暖': '#8b8570',
  '代码': '#71717a',
}

/** 根据 visualTone 返回字体族 */
const TONE_FONT: Record<string, string> = {
  '极简': 'system-ui, sans-serif',
  '编辑': 'Georgia, "Times New Roman", serif',
  '科技': 'system-ui, sans-serif',
  '数据': 'system-ui, sans-serif',
  '温暖': '"Noto Serif SC", Georgia, serif',
  '代码': '"Courier New", monospace',
}

/** 根据 visualTone 返回圆角 */
const TONE_RADIUS: Record<string, string> = {
  '极简': '4px',
  '编辑': '2px',
  '科技': '10px',
  '数据': '6px',
  '温暖': '14px',
  '代码': '6px',
}

export function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/**
 * 生成风格的微型 HTML 预览片段。
 * 优先使用 style.previewHtml（若有），否则根据元数据自动生成。
 * 每个风格使用独有的 name + accent + description，确保缩略图互不相同。
 */
export function generateFallbackHtml(s: DesignStyle): string {
  const bg = TONE_BG[s.visualTone] || '#fff'
  const text = TONE_TEXT[s.visualTone] || '#1a1a1a'
  const sub = TONE_SUBTEXT[s.visualTone] || '#999'
  const font = TONE_FONT[s.visualTone] || 'sans-serif'
  const radius = TONE_RADIUS[s.visualTone] || '6px'
  const isDark = ['科技', '代码'].includes(s.visualTone)
  const border = isDark ? 'rgba(255,255,255,0.08)' : '#e5e5e5'
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : '#fff'

  // 取风格名中较短的部分作为标题（去掉品牌后缀），并防止 XSS
  const title = escapeHtml(s.name.split(/·|·/)[0].trim())
  const rawDesc = s.description.length > 14 ? s.description.slice(0, 14) + '…' : s.description
  const desc = escapeHtml(rawDesc)

  const cardBorder = `1px solid ${border}`

  if (s.outputType === '幻灯片') {
    return `<div style="font-family:${font};background:${bg};color:${text};padding:14px;height:100%;display:flex;flex-direction:column;">
      <div style="height:3px;width:28%;background:${s.accent};border-radius:2px;margin-bottom:12px;"></div>
      <div style="font-size:14px;font-weight:700;margin-bottom:4px;line-height:1.2;">${title}</div>
      <div style="font-size:7px;color:${sub};margin-bottom:auto;">${desc}</div>
      <div style="display:flex;gap:4px;align-items:flex-end;margin-top:8px;">
        <div style="width:20%;height:10px;background:${s.accent};border-radius:1px;opacity:0.6;"></div>
        <div style="width:14%;height:6px;background:${s.accent};border-radius:1px;opacity:0.3;"></div>
        <div style="width:18%;height:8px;background:${s.accent};border-radius:1px;opacity:0.4;"></div>
      </div>
      <div style="display:flex;gap:3px;justify-content:flex-end;margin-top:6px;">
        <div style="width:4px;height:4px;border-radius:50%;background:${s.accent};"></div>
        <div style="width:4px;height:4px;border-radius:50%;background:${sub};opacity:0.3;"></div>
        <div style="width:4px;height:4px;border-radius:50%;background:${sub};opacity:0.3;"></div>
      </div>
    </div>`
  }

  if (s.outputType === '卡片') {
    return `<div style="font-family:${font};background:${bg};color:${text};padding:12px;height:100%;display:flex;flex-direction:column;">
      <div style="height:3px;width:100%;background:${s.accent};border-radius:2px;margin-bottom:8px;opacity:0.8;"></div>
      <div style="font-size:12px;font-weight:700;margin-bottom:3px;">${title}</div>
      <div style="font-size:6px;color:${sub};margin-bottom:6px;line-height:1.4;">${desc}</div>
      <div style="display:flex;gap:4px;margin-top:auto;">
        <div style="background:${s.accent};color:#fff;font-size:5px;padding:2px 5px;border-radius:3px;font-weight:600;">标签A</div>
        <div style="background:${isDark ? 'rgba(255,255,255,0.08)' : '#f1f1f1'};color:${text};font-size:5px;padding:2px 5px;border-radius:3px;">标签B</div>
      </div>
    </div>`
  }

  if (s.outputType === '仪表盘') {
    return `<div style="font-family:${font};background:${bg};color:${text};padding:8px;height:100%;display:flex;flex-direction:column;gap:5px;">
      <div style="font-size:7px;font-weight:700;padding:2px 0;border-bottom:1px solid ${border};">${title}</div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;flex:1;">
        <div style="background:${cardBg};border:${cardBorder};border-radius:${radius};padding:4px;display:flex;flex-direction:column;gap:2px;">
          <div style="height:2px;width:50%;background:${sub};border-radius:1px;opacity:0.3;"></div>
          <div style="font-size:10px;font-weight:700;color:${s.accent};">128</div>
        </div>
        <div style="background:${cardBg};border:${cardBorder};border-radius:${radius};padding:4px;display:flex;flex-direction:column;gap:2px;">
          <div style="height:2px;width:50%;background:${sub};border-radius:1px;opacity:0.3;"></div>
          <div style="font-size:10px;font-weight:700;color:${s.accent};">56%</div>
        </div>
        <div style="background:${cardBg};border:${cardBorder};border-radius:${radius};padding:4px;display:flex;flex-direction:column;gap:2px;">
          <div style="height:2px;width:50%;background:${sub};border-radius:1px;opacity:0.3;"></div>
          <div style="font-size:10px;font-weight:700;color:${s.accent};">3.2k</div>
        </div>
      </div>
      <div style="display:flex;gap:3px;align-items:flex-end;height:24px;">
        <div style="width:12%;height:30%;background:${s.accent};border-radius:1px;opacity:0.3;"></div>
        <div style="width:12%;height:55%;background:${s.accent};border-radius:1px;opacity:0.5;"></div>
        <div style="width:12%;height:40%;background:${s.accent};border-radius:1px;opacity:0.4;"></div>
        <div style="width:12%;height:80%;background:${s.accent};border-radius:1px;opacity:0.7;"></div>
        <div style="width:12%;height:65%;background:${s.accent};border-radius:1px;opacity:0.6;"></div>
        <div style="width:12%;height:95%;background:${s.accent};border-radius:1px;opacity:0.8;"></div>
        <div style="width:12%;height:50%;background:${s.accent};border-radius:1px;opacity:0.5;"></div>
      </div>
    </div>`
  }

  if (s.outputType === '报告') {
    return `<div style="font-family:${font};background:${bg};color:${text};padding:10px;height:100%;display:flex;flex-direction:column;gap:5px;">
      <div style="font-size:5px;font-weight:600;color:${s.accent};text-transform:uppercase;letter-spacing:1px;">${s.category.split('/')[0] || 'REPORT'}</div>
      <div style="font-size:11px;font-weight:700;line-height:1.2;">${title}</div>
      <div style="height:1px;background:${border};"></div>
      <div style="font-size:6px;color:${sub};line-height:1.4;">${desc}</div>
      <div style="display:flex;gap:4px;margin-top:auto;">
        <div style="font-size:10px;font-weight:800;color:${s.accent};">42%</div>
        <div style="font-size:10px;font-weight:800;color:${s.accent};opacity:0.6;">¥3.2M</div>
      </div>
    </div>`
  }

  if (s.outputType === '文档') {
    return `<div style="font-family:${font};background:${bg};color:${text};padding:12px 14px;height:100%;display:flex;flex-direction:column;gap:6px;">
      <div style="font-size:12px;font-weight:700;line-height:1.3;">${title}</div>
      <div style="font-size:6px;color:${sub};">${desc}</div>
      <div style="height:1px;background:${border};"></div>
      <div style="display:flex;flex-direction:column;gap:3px;flex:1;">
        <div style="height:2px;width:95%;background:${sub};border-radius:1px;opacity:0.15;"></div>
        <div style="height:2px;width:88%;background:${sub};border-radius:1px;opacity:0.15;"></div>
        <div style="height:2px;width:92%;background:${sub};border-radius:1px;opacity:0.12;"></div>
        <div style="height:2px;width:60%;background:${sub};border-radius:1px;opacity:0.1;"></div>
      </div>
    </div>`
  }

  // 默认：长页
  return `<div style="font-family:${font};background:${bg};color:${text};padding:12px;height:100%;display:flex;flex-direction:column;">
    <div style="height:3px;width:100%;background:${s.accent};border-radius:2px;margin-bottom:8px;opacity:0.8;"></div>
    <div style="font-size:11px;font-weight:700;margin-bottom:2px;line-height:1.2;">${title}</div>
    <div style="font-size:6px;color:${sub};margin-bottom:8px;line-height:1.4;">${desc}</div>
    <div style="display:flex;flex-direction:column;gap:3px;flex:1;">
      <div style="height:2px;width:95%;background:${sub};border-radius:1px;opacity:0.15;"></div>
      <div style="height:2px;width:88%;background:${sub};border-radius:1px;opacity:0.15;"></div>
      <div style="height:2px;width:92%;background:${sub};border-radius:1px;opacity:0.12;"></div>
      <div style="height:2px;width:70%;background:${sub};border-radius:1px;opacity:0.1;"></div>
    </div>
    <div style="display:flex;gap:4px;margin-top:8px;">
      <div style="background:${s.accent};color:#fff;font-size:5px;padding:2px 8px;border-radius:${radius};font-weight:600;">操作</div>
      <div style="border:1px solid ${border};font-size:5px;padding:2px 8px;border-radius:${radius};color:${sub};">详情</div>
    </div>
  </div>`
}

export const StyleThumbnail = React.memo(
  function StyleThumbnail({ style, onPreview }: StyleThumbnailProps) {
    const html = style.previewHtml || generateFallbackHtml(style)

    return (
      <div className="group/thumb relative w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md" style={{ aspectRatio: '4/3' }}>
        {/* 缩放容器：在固定区域内渲染真实 HTML 并缩放 */}
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            width: 320,
            height: 240,
            transform: 'scale(0.5)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        >
          <div
            dangerouslySetInnerHTML={{ __html: html }}
            style={{ width: '100%', height: '100%', overflow: 'hidden' }}
          />
        </div>
        {/* hover 遮罩 + 预览按钮 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/60 opacity-0 backdrop-blur-sm transition-opacity group-hover/thumb:opacity-100">
          {onPreview && (
            <button
              onClick={(e) => { e.stopPropagation(); onPreview(style) }}
              className="flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white shadow backdrop-blur transition-colors hover:bg-white/30 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
              预览风格
            </button>
          )}
        </div>
      </div>
    )
  },
  (prev, next) => {
    return (
      prev.style.id === next.style.id &&
      prev.style.name === next.style.name &&
      prev.style.accent === next.style.accent &&
      prev.style.description === next.style.description &&
      prev.style.style === next.style.style &&
      prev.style.visualTone === next.style.visualTone &&
      prev.onPreview === next.onPreview
    )
  }
)
