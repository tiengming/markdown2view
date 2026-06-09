import { describe, it, expect } from 'vitest'
import { parseMarkdown } from './markdownParser'
import { makeColors } from '../index'

describe('parseMarkdown - Caption parsing', () => {
  const colors = makeColors('#2563eb', '#1e40af')

  it('should parse image captions correctly when an image is above', () => {
    const md = '![img](url)\n图 1: 这是图片题注'
    const html = parseMarkdown(md, colors)
    expect(html).toContain('class="document-caption document-caption-image"')
    expect(html).toContain('data-caption-kind="image"')
    expect(html).toContain('style="margin:8px 0px 16px"')
    expect(html).toContain('这是图片题注')
  })

  it('should parse table captions correctly when a table is below', () => {
    const md = '表 2：这是表格题注\n| col1 | col2 |\n| --- | --- |\n| a | b |'
    const html = parseMarkdown(md, colors)
    expect(html).toContain('class="document-caption document-caption-table"')
    expect(html).toContain('data-caption-kind="table"')
    expect(html).toContain('style="margin:16px 0px 8px"')
    expect(html).toContain('这是表格题注')
  })

  it('only treats captions as valid in the required image/table positions', () => {
    const imageCaptionAbove = '图 1: 图片题注不能写在图片上方\n![img](url)'
    const tableCaptionBelow = '| col1 | col2 |\n| --- | --- |\n| a | b |\n表 1: 表格题注不能写在表格下方'

    expect(parseMarkdown(imageCaptionAbove, colors)).not.toContain('document-caption')
    expect(parseMarkdown(tableCaptionBelow, colors)).not.toContain('document-caption')
  })

  it('should parse English captions correctly in correct contexts', () => {
    const md1 = '![img](url)\nFig. 1 - Figure caption'
    const html1 = parseMarkdown(md1, colors)
    expect(html1).toContain('class="document-caption document-caption-image"')
    expect(html1).toContain('style="margin:8px 0px 16px"')
    
    const md2 = 'Table 10 Example table\n| col1 | col2 |\n| --- | --- |'
    const html2 = parseMarkdown(md2, colors)
    expect(html2).toContain('class="document-caption document-caption-table"')
    expect(html2).toContain('style="margin:16px 0px 8px"')
  })

  it('should parse Chinese numeric captions correctly with image above', () => {
    const md = '![img](url)\n图 十一. 图片题注'
    const html = parseMarkdown(md, colors)
    expect(html).toContain('class="document-caption document-caption-image"')
    expect(html).toContain('style="margin:8px 0px 16px"')
    expect(html).toContain('图片题注')
  })

  it('should support bold caption headers', () => {
    const md = '![img](url)\n**图 1: 这是加粗题注**'
    const html = parseMarkdown(md, colors)
    expect(html).toContain('class="document-caption document-caption-image"')
    expect(html).toContain('strong')
    expect(html).toContain('图 1: 这是加粗题注')
  })

  it('should support bold table captions above tables', () => {
    const md = '**表 1: 这是加粗表格题注**\n| col1 | col2 |\n| --- | --- |\n| a | b |'
    const html = parseMarkdown(md, colors)

    expect(html).toContain('class="document-caption document-caption-table"')
    expect(html).toContain('data-caption-kind="table"')
    expect(html).toContain('text-align:center')
    expect(html).toContain('表 1: 这是加粗表格题注')
  })

  it('allows figure and table captions to use independent numbering', () => {
    const md = [
      '![img](url)',
      '图 1: 这是图片题注',
      '',
      '表 1: 这是表格题注',
      '| col1 | col2 |',
      '| --- | --- |',
      '| a | b |',
    ].join('\n')
    const html = parseMarkdown(md, colors)

    expect(html).toContain('class="document-caption document-caption-image"')
    expect(html).toContain('class="document-caption document-caption-table"')
    expect(html).toContain('图 1: 这是图片题注')
    expect(html).toContain('表 1: 这是表格题注')
  })

  it('should not parse text describing figures/tables as captions', () => {
    // 即使上面有图，如果只是空格分隔符且包含“展现”等词，也不应误判为题注
    const md1 = '![img](url)\n图 1 展现了核心架构。'
    const html1 = parseMarkdown(md1, colors)
    expect(html1).not.toContain('document-caption')
    expect(html1).toContain('style="margin:0px 0px 24px"')
    
    // 如果没有图，直接说“图 1 展现了...”，不应被误判为题注
    const md2 = '图 1 展现了核心架构。'
    const html2 = parseMarkdown(md2, colors)
    expect(html2).not.toContain('document-caption')
    expect(html2).toContain('style="margin:0px 0px 24px"')
  })

  it('should not parse normal paragraphs as captions', () => {
    const md = '图样图森破，这是一个普通段落'
    const html = parseMarkdown(md, colors)
    expect(html).not.toContain('document-caption')
    expect(html).toContain('style="margin:0px 0px 24px"')
  })
})
