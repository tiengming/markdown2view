import { describe, expect, it } from 'vitest'
import {
  DEFAULT_DOCUMENT_SETTINGS,
  buildDocumentFilename,
  paginateDocumentBlocks,
  splitMarkdownBlocks,
} from './documentModel'

describe('documentModel', () => {
  it('uses title as default document filename', () => {
    expect(buildDocumentFilename('季度经营复盘：增长与风险', '正文内容')).toBe(
      '季度经营复盘：增长与风险.pdf',
    )
  })

  it('falls back to first 15 content characters when title is missing', () => {
    expect(buildDocumentFilename('', '  这是一个没有标题但有正文内容的文档。  ')).toBe(
      '这是一个没有标题但有正文内容的.pdf',
    )
  })

  it('sanitizes filename characters that are invalid on Windows', () => {
    expect(buildDocumentFilename('A/B:C*D?E\"F<G>H|I', '')).toBe('A_B_C_D_E_F_G_H_I.pdf')
  })

  it('splits markdown into document blocks with estimated heights', () => {
    const blocks = splitMarkdownBlocks(`# 标题\n\n第一段正文。\n\n![图](https://example.com/a.png)\n\n| A | B |\n| - | - |\n| 1 | 2 |`)

    expect(blocks.map((b) => b.kind)).toEqual(['heading', 'paragraph', 'image', 'table'])
    expect(blocks.every((b) => b.estimatedHeight > 0)).toBe(true)
  })

  it('keeps fenced code blocks intact when they contain blank lines', () => {
    const blocks = splitMarkdownBlocks([
      '说明文字。',
      '',
      '```ts',
      'const first = 1',
      '',
      'const second = 2',
      '```',
      '',
      '后续文字。',
    ].join('\n'))

    expect(blocks.map((b) => b.kind)).toEqual(['paragraph', 'code', 'paragraph'])
    expect(blocks[1].markdown).toContain('const first = 1\n\nconst second = 2')
  })

  it('does not split list-like lines inside fenced code blocks', () => {
    const blocks = splitMarkdownBlocks([
      '```md',
      '- 这是一段示例代码',
      '- 不应被 A4 分页模型拆成列表项',
      '```',
    ].join('\n'))

    expect(blocks).toHaveLength(1)
    expect(blocks[0].kind).toBe('code')
  })

  it('paginates blocks without exceeding page content height when possible', () => {
    const blocks = [
      { id: 'a', kind: 'paragraph' as const, markdown: 'a', estimatedHeight: 300, avoidBreak: true },
      { id: 'b', kind: 'paragraph' as const, markdown: 'b', estimatedHeight: 500, avoidBreak: true },
      { id: 'c', kind: 'paragraph' as const, markdown: 'c', estimatedHeight: 500, avoidBreak: true },
    ]

    const pages = paginateDocumentBlocks(blocks, { ...DEFAULT_DOCUMENT_SETTINGS, pageHeight: 900, marginTop: 0, marginBottom: 0 })

    expect(pages).toHaveLength(2)
    expect(pages[0].blocks.map((b) => b.id)).toEqual(['a', 'b'])
    expect(pages[1].blocks.map((b) => b.id)).toEqual(['c'])
    expect(pages.every((p) => p.usedHeight <= 900)).toBe(true)
  })

  it('places an oversized image on its own page', () => {
    const blocks = [
      { id: 'p', kind: 'paragraph' as const, markdown: 'p', estimatedHeight: 200, avoidBreak: true },
      { id: 'img', kind: 'image' as const, markdown: 'img', estimatedHeight: 1200, avoidBreak: true },
      { id: 'tail', kind: 'paragraph' as const, markdown: 'tail', estimatedHeight: 200, avoidBreak: true },
    ]

    const pages = paginateDocumentBlocks(blocks, { ...DEFAULT_DOCUMENT_SETTINGS, pageHeight: 900, marginTop: 0, marginBottom: 0 })

    expect(pages.map((p) => p.blocks.map((b) => b.id))).toEqual([['p'], ['img'], ['tail']])
    expect(pages[1].oversized).toBe(true)
  })
})
