---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Triggers: "审查我的 UI", "检查可访问性", "审计 UX", "audit design", "check accessibility", "web interface guidelines". 先查 GitHub 是否有更新，有则同步，无则用本地缓存。
metadata:
  author: vercel (local cached)
  version: "1.0.0.local"
  argument-hint: <file-or-pattern>
  cache_file: web-design-guidelines-rules.md
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines. 先查 GitHub 更新，本地缓存兜底。

## 规则缓存路径
`~/.agents/skills/web-design-guidelines/rules.md`

## 更新逻辑

**每次使用时执行以下步骤：**

1. 尝试从 GitHub 获取最新规则：
   ```
   https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```
   使用 `WebFetch` 工具。

2. 如果 GitHub 可达（HTTP 200）：
   - 将新规则写入 `~/.agents/skills/web-design-guidelines/rules.md`
   - 使用新规则进行检查
   - 回复中注明「规则已从 GitHub 更新」

3. 如果 GitHub 不可达（网络错误 / 404 / 超时）：
   - 读取本地 `~/.agents/skills/web-design-guidelines/rules.md`
   - 使用本地规则进行检查
   - 回复中注明「使用本地缓存规则（GitHub 不可达）」

4. 如果本地规则文件也不存在：
   - 回退到 SKILL.md 内嵌的基础规则（见下方 fallback）
   - 注明「无缓存，使用内嵌规则」

## 如何检查

1. 获取到规则后，仔细阅读规则内容
2. 读取用户指定的文件（使用 `Read` 工具）
3. 对照规则逐项检查文件
4. 按规则要求的格式输出 findings（通常是 `file:line: 问题描述` 格式）

## Fallback 内嵌规则（GitHub 和本地都不可用时使用）

当无法获取任何外部规则时，使用以下核心检查项：

### 无障碍（Accessibility）
- 检查是否有 `aria-label` 或 `aria-labelledby`
- 检查表单元素是否有关联的 `<label>`
- 检查图片是否有 `alt` 属性
- 检查按钮/链接是否有可访问的名称

### 键盘交互
- 检查 focus 相关样式（`:focus-visible`, `:focus`）
- 检查是否有 `tabindex` 设置
- 检查模态框是否处理了 `Escape` 键

### 表单
- 检查是否有 `autocomplete` 属性
- 检查错误提示是否与表单关联（`aria-describedby`）
- 检查是否有 `required` 属性

### 性能
- 检查图片是否指定了宽高（避免 CLS）
- 检查是否使用了 `loading="lazy"`
- 检查是否使用了 `preconnect` / `prefetch`

### 暗色模式
- 检查是否使用了 `prefers-color-scheme`
- 检查是否有 `color-scheme` meta 标签

### 移动端
- 检查是否有 `viewport` meta
- 检查是否避免了 `user-scalable=no`
- 检查触摸目标是否 >= 44x44px

## 触发词
- 中文：「审查我的 UI」「检查可访问性」「审计 UX」「检查 Web Interface Guidelines」
- English: "review my UI", "check accessibility", "audit design", "check my site against best practices"
