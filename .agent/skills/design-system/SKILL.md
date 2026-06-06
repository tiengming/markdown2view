---
name: life-echo-design-system
description: Use the repository DESIGN.md to generate, refactor, or audit UI for the Personal Todo & Review System. Triggers: "按项目设计规范改 UI", "use DESIGN.md", "review UI against design system", "按项目风格做页面", "审查页面是否符合设计规范".
---

# BeeEffy Design System Skill

## Purpose

Use this skill whenever UI work in this repository needs to be created, updated, or audited.

This repository has a project-level design specification in `DESIGN.md` at the project root. That file is the source of truth for UI decisions.

The repository also has an optional style reference library at `design-reference/`, which is only used when the user explicitly asks to try another style direction.

## Primary Sources

Read these in order when doing UI work:

1. `AGENTS.md`
2. `DESIGN.md`
3. `design-reference/README.md` only when the user explicitly asks for style exploration
4. Relevant implementation files in `apps/todo_web`

## What This Skill Controls

- colors
- typography
- spacing
- border radius
- shadows
- component states
- layout width and alignment
- tone of UI copy

## Required Workflow

1. Read `DESIGN.md` before editing UI.
2. Extract the exact tokens and component patterns needed for the task.
3. Inspect the existing page or component before changing it.
4. Reuse existing project primitives when possible.
5. Implement only the scope required by the task.
6. After changes, audit the result against `DESIGN.md`.

## Style Exploration Workflow

Use this flow only if the user explicitly asks for a different visual direction:

1. Read `design-reference/README.md`
2. Inspect `design-reference/awesome-design-md/README.md`
3. Browse `design-reference/awesome-design-md/design-md/<style-slug>/README.md`
4. Treat the selected style as a reference direction, not as the default project spec
5. If detailed design information is needed, follow the external `getdesign.md` link mentioned in that style folder

Important limitation:

- The local `awesome-design-md` clone is mainly a style catalog and link index
- It is not a complete offline bundle of full design specifications for every style

## Non-Negotiable Rules

- Do not invent new colors, spacing, radii, or typography values unless the user asks for a new design direction.
- Do not blindly apply framework defaults if they conflict with `DESIGN.md`.
- Do not restyle unrelated pages in the name of consistency.
- Do not turn the UI into a flashy marketing page or cyberpunk dashboard.
- Do not let `design-reference/` override `DESIGN.md` unless the user explicitly asks for a style experiment or a redesign.

## Project-Specific Interpretation

The visual direction is inspired by productivity and developer-tool aesthetics from Cursor, Raycast, and Vercel, but adapted for a calmer personal management product.

Target feeling:

- focused for task execution
- structured for information density
- gentle for review and reflection
- premium but restrained

## Audit Checklist

Before finishing a UI task, verify:

- the layout aligns with the shared shell width
- touch targets are large enough on mobile
- hover, focus, disabled, and loading states exist
- the page uses tokens from `DESIGN.md`
- copy is concise and non-judgmental
- visual emphasis is limited to the truly important actions

## Best Fit Areas In This Repo

- `apps/todo_web/app`
- `apps/todo_web/components`
- `apps/todo_web/features`
- shared navigation, cards, filters, dialogs, task lists, review panels
