# Working With AI

## Intro

We opened this talk with a truth: a lot of us will learn Angular beside an assistant now — Angular’s own MCP tutor in Cursor, prompts in the editor, the whole workflow.

The middle sections weren’t about the robot. They were about you — data, events, signals, forms, control flow, services, routing — so when a suggestion lands, you can read it.

This last beat ties the ribbon. AI plus a real component library, wired the same way you’d actually work.

---

## The anchor

When someone hits accept on a giant diff without reading it, this is the correction.

You are guiding the AI, not following it.

Your job is intent, constraints, and review. The model proposes. You decide whether it matches how Angular and your stack actually behave.

---

## One tight loop — prompt, accept, explain

Picture a small ask — something you could do by hand, but you’re narrating the habit.

You type a prompt — in Cursor, in chat, wherever — something like:

```text
Recipe list: add a search field bound to a signal called searchTerm,
filter recipes by name or description case-insensitively,
use Angular control flow for empty vs results.
```

You get a patch. Before you merge it in your head, you say three things out loud — to the room, or to yourself.

What changed in the class — probably a signal, maybe a computed list.

What changed in the template — `@if` for empty, `@for` with `track`, bindings you recognize from earlier sections.

What you would reject — wrong track key, mutation of a shared array in place, `[(ngModel)]` on a signal without the split binding.

That’s the loop. Prompt, diff, teach-back. If you can’t teach it back, you don’t own it yet.

---

## Kendo UI for Angular — why bring a library in

Progress Kendo UI for Angular — buttons, inputs, layout, navigation, icons — is the same idea as any mature kit: accessible defaults, consistent spacing, less time inventing primitives.

In our Recipe Box you’ve already seen it — app bar, cards, text boxes, themed buttons. Dependencies like `@progress/kendo-angular-buttons`, `kendo-theme-default`, and SVG icons are just npm packages; components land in `imports` on the standalone components that need them.

The Angular concepts didn’t change. We still use signals, `routerLink`, reactive forms. The template just speaks Kendo’s tags and inputs where it used to be plain HTML.

---

## MCP in Cursor — two servers, two jobs

You’ve got the **Angular CLI MCP** — list projects, best practices, docs search, the **AI tutor** we teased in section one. That’s the framework spine.

Alongside it, the **Kendo UI for Angular MCP** is the UI copilot. One tool worth naming is **`kendo_ui_generator`** — it’s the front door for bigger UI tasks. You describe intent — which screen, which components, whether you care about layout or theming — and it orchestrates a plan: which follow-up tools to run, in what order, with validation baked in.

So you’re not guessing which Kendo package to import or how to wire `kendoButton` next to `kendo-textbox`. You still read the output — because you’re guiding, not following — but you’re not starting from a blank MDN page either.

---

## Two ways to stage this on stage

**Path A — live migration.** Start from a plain list you built in the talk, then prompt: swap the shell to a Kendo app bar, replace the list with cards and primary actions, keep the same signals and routes. Run **`kendo_ui_generator`** with a clear `userIntent` — e.g. recipe list with search, empty state, link to detail — bump confidence for layout or styling if you want theme help. Accept in chunks. Narrate each chunk using vocabulary from sections two through eight.

**Path B — final branch flash.** If time is short, jump straight to the finished app. Scroll **`styles.css`** — we’re on `kendo-theme-default` with token overrides: the comment calls it a Fresh salad theme — cream surfaces, green primary, typography and spacing nudged for readability. Point at `:root` variables, then point at one template — same bindings as before, richer chrome.

Pick one. Both stories end the same way: the assistant accelerated layout and theme; Angular behavior stayed the thing you understood first.

---

## Close

MCP doesn’t replace the mental model — it sits on top.

Kendo UI doesn’t replace components — it gives you production-shaped building blocks.

You are guiding the AI, not following it.

That’s how you keep the job human — and how this stack stays fun to ship.
