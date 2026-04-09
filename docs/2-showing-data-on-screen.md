# Showing Data on the Screen

## Intro

Alright — you’ve got a component. You’ve got a class with some fields on it.

The next question everyone hits is: how do I get that stuff to actually show up?

That’s what this bit is about. We’re not wiring APIs yet. We’re not doing fancy state. We’re doing the smallest possible bridge between your TypeScript and what people see in the browser.

---

## The anchor

Here’s the line I want you to remember.

The UI is just a reflection of your data.

If the data changes, the picture updates. If you’re staring at the screen wondering why nothing moved, you’re usually looking at the wrong layer — either the data never changed, or you never connected the template to it.

Interpolation is the first connection. It’s the hello world of binding.

---

## What interpolation is

In Angular templates, double curly braces mean: take this expression, run it in the context of your component, turn the result into text, and drop it in the DOM.

So you’re not hand-building strings in the TypeScript and pushing HTML around. You’re declaring: this spot on the page shows this value.

---

## Demo — a title on the page

Say your component has a title — maybe you’re building a recipe box, so it’s literally the name of the app.

In the class:

```ts
export class App {
  protected readonly title = 'Recipe Box';
}
```

In the template:

```html
<h1>{{ title }}</h1>
```

That’s it. Angular reads `title` from the component, renders the string, and you get a heading.

`protected` and `readonly` are TypeScript choices — the template can still see `title` because the template is part of the same component. Don’t let access modifiers freak you out here; the important part is: field on the class, same name in the braces.

---

## One more property — count

Same idea with something numeric. Maybe you’re showing how many recipes you have — even if for now it’s a hard-coded number just to prove the point.

```ts
export class App {
  protected readonly title = 'Recipe Box';
  protected readonly recipeCount = 0;
}
```

```html
<h1>{{ title }}</h1>
<p>{{ recipeCount }} recipes</p>
```

When you load real data later, you swap where `recipeCount` comes from. The template doesn’t care. It still says: show me whatever `recipeCount` is right now.

That’s the reflection idea again. The paragraph isn’t special Angular magic — it’s just displaying the current value of a property.

---

## Close

So interpolation is your first binding. Curly braces, expression, text on screen.

Next steps in a real app are things like lists, conditionals, and events — but the mental model starts here.

The UI is a reflection of your data. Wire the template to the component, and you’re already demoing something honest.
