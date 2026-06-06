import { create } from 'zustand'
import { THEMES, makeColors, type ThemeColors } from '@engine'
import { DEMO_CONTENT } from '@/data/demoContent'
import {
  DEFAULT_DOCUMENT_SETTINGS,
  type DocumentSettings,
} from '@/modes/document/documentModel'

// 渲染场景：通用 Markdown 渲染内核 + 不同交付场景适配。
export type RenderMode = 'article' | 'document' | 'card' | 'html'
export type InputType = 'markdown' | 'html'
export type PlatformPreset = 'longform' | 'xiaohongshu'

const MD_STORAGE_KEY = 'm2v-markdown'
const THEME_STORAGE_KEY = 'm2v-theme'
const HTML_STORAGE_KEY = 'm2v-html'
const DOCUMENT_SETTINGS_STORAGE_KEY = 'm2v-document-settings'
const MODE_STORAGE_KEY = 'm2v-mode'

function loadMarkdown(): string {
  if (typeof localStorage === 'undefined') return DEMO_CONTENT
  return localStorage.getItem(MD_STORAGE_KEY) ?? DEMO_CONTENT
}

function loadHtml(): string {
  if (typeof localStorage === 'undefined') return ''
  return localStorage.getItem(HTML_STORAGE_KEY) ?? ''
}

function loadMode(): RenderMode {
  if (typeof localStorage === 'undefined') return 'document'
  const saved = localStorage.getItem(MODE_STORAGE_KEY)
  if (saved && ['article', 'document', 'card', 'html'].includes(saved)) {
    return saved as RenderMode
  }
  return 'document'
}

function loadTheme(): { accent: string; dark: string } {
  const fallback = THEMES[3] // 默认绿色
  if (typeof localStorage === 'undefined') return fallback
  const saved = localStorage.getItem(THEME_STORAGE_KEY)
  if (!saved) return fallback
  try {
    const t = JSON.parse(saved)
    if (t.accent && t.dark) return { accent: t.accent, dark: t.dark }
  } catch {
    /* ignore */
  }
  return fallback
}

function loadDocumentSettings(): DocumentSettings {
  if (typeof localStorage === 'undefined') return DEFAULT_DOCUMENT_SETTINGS
  const saved = localStorage.getItem(DOCUMENT_SETTINGS_STORAGE_KEY)
  if (!saved) return DEFAULT_DOCUMENT_SETTINGS
  try {
    const parsed = JSON.parse(saved)
    return { ...DEFAULT_DOCUMENT_SETTINGS, ...parsed }
  } catch {
    return DEFAULT_DOCUMENT_SETTINGS
  }
}

interface AppState {
  markdown: string
  html: string
  mode: RenderMode
  inputType: InputType
  platform: PlatformPreset
  documentSettings: DocumentSettings
  accent: string
  accentDark: string
  colors: ThemeColors
  setMarkdown: (md: string) => void
  setHtml: (html: string) => void
  setMode: (mode: RenderMode) => void
  setInputType: (type: InputType) => void
  setPlatform: (platform: PlatformPreset) => void
  updateDocumentSettings: (patch: Partial<DocumentSettings>) => void
  setTheme: (accent: string, dark: string) => void
}

function applyCssVars(accent: string, dark: string) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.style.setProperty('--accent', accent)
  root.style.setProperty('--accent-dark', dark)
}

const initTheme = loadTheme()
const initDocumentSettings = loadDocumentSettings()
applyCssVars(initTheme.accent, initTheme.dark)

export const useStore = create<AppState>((set) => ({
  markdown: loadMarkdown(),
  html: loadHtml(),
  mode: loadMode(),
  inputType: loadMode() === 'html' ? 'html' : 'markdown',
  platform: loadMode() === 'card' ? 'xiaohongshu' : 'longform',
  documentSettings: initDocumentSettings,
  accent: initTheme.accent,
  accentDark: initTheme.dark,
  colors: makeColors(initTheme.accent, initTheme.dark),
  setMarkdown: (md) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(MD_STORAGE_KEY, md)
    set({ markdown: md })
  },
  setHtml: (html) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(HTML_STORAGE_KEY, html)
    set({ html })
  },
  setMode: (mode) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(MODE_STORAGE_KEY, mode)
    set({
      mode,
      inputType: mode === 'html' ? 'html' : 'markdown',
      platform: mode === 'card' ? 'xiaohongshu' : 'longform',
    })
  },
  setInputType: (inputType) => set({ inputType }),
  setPlatform: (platform) => set({ platform }),
  updateDocumentSettings: (patch) =>
    set((state) => {
      const next = { ...state.documentSettings, ...patch }
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(DOCUMENT_SETTINGS_STORAGE_KEY, JSON.stringify(next))
      }
      return { documentSettings: next }
    }),
  setTheme: (accent, dark) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify({ accent, dark }))
    }
    applyCssVars(accent, dark)
    set({ accent, accentDark: dark, colors: makeColors(accent, dark) })
  },
}))
