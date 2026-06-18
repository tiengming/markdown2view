import { describe, it, expect } from 'vitest'
import { sanitizeHtml } from './htmlSanitizer'

describe('htmlSanitizer', () => {
  it('保留常见排版标签与 class', () => {
    const html = '<div class="page"><h1>标题</h1><p>正文</p></div>'
    expect(sanitizeHtml(html)).toBe(html)
  })

  it('移除 script 标签', () => {
    const html = '<p>正文</p><script>alert(1)</script>'
    expect(sanitizeHtml(html)).toBe('<p>正文</p>')
  })

  it('移除事件处理器属性', () => {
    const html = '<button onclick="alert(1)">点击</button>'
    expect(sanitizeHtml(html)).toBe('<button>点击</button>')
  })

  it('移除 javascript: 链接', () => {
    const html = '<a href="javascript:alert(1)">link</a>'
    expect(sanitizeHtml(html)).toBe('<a>link</a>')
  })

  it('保留 http/https 链接', () => {
    const html = '<a href="https://example.com" target="_blank">link</a>'
    expect(sanitizeHtml(html)).toBe(html)
  })

  it('移除危险 style 属性', () => {
    const html = '<div style="background:url(javascript:alert(1))">x</div>'
    expect(sanitizeHtml(html)).toBe('<div>x</div>')
  })

  it('保留安全 style 属性', () => {
    const html = '<div style="color:red">x</div>'
    expect(sanitizeHtml(html)).toBe(html)
  })

  it('移除 style 标签中的 @import', () => {
    const html = '<style>@import url("//evil.com"); .a{color:red}</style><p>x</p>'
    expect(sanitizeHtml(html)).toBe('<p>x</p>')
  })

  it('保留完整文档结构', () => {
    const html = '<!DOCTYPE html><html lang="zh"><head><title>t</title></head><body><p>x</p></body></html>'
    const result = sanitizeHtml(html)
    expect(result).toContain('<html')
    expect(result).toContain('<body>')
    expect(result).toContain('<p>x</p>')
  })
})
