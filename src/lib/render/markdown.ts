import { parseMarkdown, type ThemeColors } from '@engine'
import { extractContentMeta, type ContentMeta } from './metadata'

export interface MarkdownRenderResult {
  html: string
  meta: ContentMeta
}

export function renderMarkdown(markdown: string, colors: ThemeColors): MarkdownRenderResult {
  const meta = extractContentMeta(markdown)
  return {
    meta,
    html: parseMarkdown(meta.contentMarkdown, colors),
  }
}
