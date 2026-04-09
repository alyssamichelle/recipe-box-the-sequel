# Signals

## Intro

We’ve wired clicks and submits. Methods run. Values change.

This section is about what happens next — the part that used to confuse me the most.

Where does the screen actually learn that the data moved?

---

## Cause → effect

I want you to notice something the next time you demo a signal.

We never said redraw. We never said refresh this component. We updated a piece of state — and the template that depended on it caught up on its own.

So here’s the line out loud.

Notice we didn’t tell Angular to update the screen… it just knew.

That’s the aha. Cause → effect. You change the signal; anything that read that signal gets a chance to run again. Not because you threaded a manual update through every child — because the framework tracks the dependency graph.

---

## Signals in one breath

A writable signal holds a value. You read it by calling it like a function — `servings()` — so Angular can record who asked.

You replace the whole value with `set`:

```ts
this.searchTerm.set($event);
```

Or you derive the next value from the old one with `update`:

```ts
this.servings.update((value) => Math.max(1, value + delta));
```

In our service, when we add a recipe, we don’t replace the array by hand in five places. We push through the signal once:

```ts
this.recipes.update((list) => [...list, recipe]);
```

Same primitive everywhere — local UI state, shared service state.

---

## Computed — automatic followers

Some values shouldn’t be stored twice. They should be *derived*.

`computed` runs a function and caches the result. It remembers which signals you touched. When any of those change, the computed invalidates and the next read recomputes.

Our list screen: `searchTerm` plus `allRecipes` from the service → `filteredRecipes`.

```ts
protected readonly filteredRecipes = computed(() => {
  const term = this.searchTerm().trim().toLowerCase();
  const recipes = this.recipeService.allRecipes();
  if (!term) {
    return recipes;
  }
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(term) ||
      recipe.description.toLowerCase().includes(term),
  );
});
```

Type in the box — `searchTerm` updates — `filteredRecipes` recomputes — the `@for` in the template sees a new array.

Detail screen: `servings` and the current recipe feed `adjustedIngredients`. Bump servings — quantities rescale. Nobody called a special API on the list component. The data moved; the followers moved with it.

---

## Why it feels automatic

Angular’s change detection already knows how to consult signals. When a signal flips, the framework marks what needs another look. You’re not managing a todo list of DOM patches.

That’s why OnPush stops feeling scary once signals are in the picture. You’re not fighting immutability with mystery — you’re declaring sources of truth and letting the graph propagate.

---

## Observables — bridge, not a detour

The world is still full of Observables. Router params, HTTP, plenty of libraries.

You don’t have to rewrite everything on day one. `toSignal` turns a stream into something the rest of the signal graph can read.

We use it for the recipe id from the URL:

```ts
private readonly recipeId = toSignal(
  this.route.paramMap.pipe(
    map((params) => {
      const raw = params.get('id');
      return raw ? Number(raw) : Number.NaN;
    }),
  ),
  { initialValue: Number.NaN },
);
```

Then a `computed` can turn `recipeId` into the actual `recipe`. Params change → signal updates → computed updates → template updates.

Same story. Observable on the edge; signals in the middle; UI at the end.

---

## Optional footnote — effect

If you need a side effect when signals change — reset servings when the route id changes, log, sync to storage — that’s `effect`. It runs after the graph settles. Handy, but easy to overuse. For teaching, `set`, `update`, and `computed` carry most of the talk.

---

## Close

Signals are the vocabulary for that cause → effect moment.

You set or update state. Computed values and templates that depend on it stay honest.

And again — notice we didn’t tell Angular to update the screen. We changed the data. The rest followed.

That’s when people get it.
