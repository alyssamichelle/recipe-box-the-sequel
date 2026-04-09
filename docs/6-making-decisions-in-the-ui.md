# Making Decisions in the UI

## Intro

Way back in the first section — how the app is structured — we peeked at this idea with tiny examples.

A flag turned a message on and off. An array became a list of list items.

Same syntax we’re using now in the real Recipe Box. We’re just doing it with search results, cards, favorites, and empty states.

So this isn’t new magic — it’s the same contract, at full size.

---

## The anchor

When you explain control flow to a room, land here.

The UI changes based on your data.

Not because you hand-deleted nodes in the DOM. Because you described branches and loops in the template, and Angular keeps that picture honest as signals and forms move.

---

## `@if` — show or hide

`@if` is a block. If the expression is truthy, whatever’s inside exists in the DOM. If it isn’t, that chunk isn’t there.

Our add-recipe form only yells when the user has touched the form and it’s still invalid:

```html
@if (form.touched && form.invalid) {
  <div role="alert">
    <p>Please complete all fields correctly.</p>
  </div>
}
```

On the list, we branch on whether anything matched the filter — empty state versus the grid of cards:

```html
@if (filteredRecipes().length === 0) {
  <div role="status">
    <p>No recipes match your search.</p>
    <p>Try a different term or clear the search field.</p>
  </div>
} @else {
  <!-- cards live here -->
}
```

Inside each card we nest another `@if` — only show the Favorite chip when `dataItem.isFavorite` is true.

So decisions stack. Outer branch: nothing to show versus something to show. Inner branch: this row is a favorite or it isn’t.

---

## `@if` with an alias

Detail view is the nice pattern: one expression, one local name for the template.

```html
@if (recipe(); as recipe) {
  <article>
    <h1>{{ recipe.name }}</h1>
    <!-- hero image, servings, ingredients @for, ... -->
  </article>
} @else {
  <div role="status">
    <p>Recipe not found.</p>
  </div>
}
```

`recipe()` might be undefined — bad id, typo in the URL. The `@else` is your honest not-found screen. When it’s defined, you get `recipe` without repeating `recipe()!.name` all over the place.

---

## `@for` — repeat from data

`@for` says: for each item in this collection, stamp out this subtree.

List screen — one card per matching recipe. We track by stable id so Angular can reuse DOM when the list reshuffles:

```html
@for (dataItem of filteredRecipes(); track dataItem.id) {
  <div role="listitem">
    <!-- kendo-card, title, description, View recipe, ... -->
  </div>
}
```

Detail screen — ingredients after servings scaling. Here `track $index` is enough because we’re not reordering arbitrary rows by id in the demo; the list is derived from the recipe:

```html
@for (ingredient of adjustedIngredients(); track $index) {
  <li>
    {{ ingredient.quantity }} {{ ingredient.unit }} {{ ingredient.name }}
  </li>
}
```

Mention `track` when you teach. It’s how you help Angular know which row is which when data changes. Prefer a real id when you have one.

---

## Tie-back to section one

That first script used a boolean and a hard-coded array — same `@if`, same `@for`.

Now the boolean is things like “invalid and touched” or “zero search results.” The array is `filteredRecipes()` or `adjustedIngredients()` — still data driving the shape of the page.

Interpolation showed a string. Control flow shows structure. Same reflection idea, bigger vocabulary.

---

## Close

`@if` for branches. `@for` for lists. `@else` when you need the other path. Alias when you want a readable name inside the block.

The UI changes based on your data — and you said so right in the template.
