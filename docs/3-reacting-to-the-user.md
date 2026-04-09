# Reacting to the User

## Intro

Last section we talked about showing data — interpolation, the UI reflecting values in your component class.

Now we flip direction.

The browser already knows how to handle clicks, typing, focus, submit. Angular’s job is to let you plug your TypeScript into those moments without crawling the DOM with manual listeners everywhere.

---

## The anchor

The line to keep in your head is simple.

The user does something → your code responds.

Not maybe. Not eventually. That’s the contract. Template says what happened; the class says what to do about it.

---

## Event syntax — parentheses

Property binding uses square brackets. Event binding uses parentheses.

So `(click)` on an element means: when this element fires a click, call the expression on the right — usually a method on your component.

Same idea shows up elsewhere. `(ngModelChange)` when the search box changes. `(ngSubmit)` when the user tries to save a form. Different events, same handshake — user gesture in the template, handler in the class.

---

## Demo — increment and decrement (servings)

In our Recipe Box, the detail screen lets people scale a recipe. We keep a `servings` signal and nudge it with plus and minus buttons.

In the class:

```ts
protected readonly servings = signal(1);

protected bumpServings(delta: number): void {
  this.servings.update((value) => Math.max(1, value + delta));
}
```

On the buttons — we’re using Kendo buttons in the full app, but the Angular part is identical to a plain `button`:

```html
<button
  type="button"
  [disabled]="servings() <= 1"
  (click)="bumpServings(-1)"
>
  −
</button>
<button type="button" (click)="bumpServings(1)">+</button>
```

Click minus — `bumpServings` runs with negative one. Click plus — positive one. The template stays dumb; it just forwards the intent.

The ingredients list is computed from `servings()`, so when the signal updates, the list updates. Same reflection idea as before — only now the user is the one nudging the data.

---

## Toggle — same pattern, boolean state

We don’t have a favorite star wired to a click in the UI yet, but the model already has `isFavorite` and the list shows a badge when it’s true.

A toggle is the same shape as servings, just with a boolean instead of a number. One method, one `(click)`:

```ts
protected readonly expanded = signal(false);

protected toggleExpanded(): void {
  this.expanded.update((value) => !value);
}
```

```html
<button type="button" (click)="toggleExpanded()">
  {{ expanded() ? 'Hide' : 'Show' }} details
</button>
```

One handler, flip the state, let the template react. That’s the mental model for favorites too — eventually a `(click)` that updates the recipe through a service.

---

## Add item — submit and the service

Adding a recipe isn’t always a raw `(click)` on a random div. In our app, the list’s Add recipe button navigates with `routerLink`. The actual create happens on the form: user hits Save recipe, the form fires `ngSubmit`, and we call into `RecipeService.addRecipe`.

Template hook:

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <!-- fields -->
  <button type="submit">Save recipe</button>
</form>
```

Handler — trimmed to the happy path you’d narrate live:

```ts
protected onSubmit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  const value = this.form.getRawValue();
  this.recipeService.addRecipe({
    name: value.name,
    description: value.description,
    imgUrl: value.imgUrl,
    isFavorite: false,
    ingredients: [{ name: 'Customize later', quantity: 1, unit: 'batch' }],
  });
  void this.router.navigate(['/recipes']);
}
```

So the user’s action is submit. Your code validates, pushes a new recipe into the signal-backed list in the service, and sends them back to the list. New row shows up — again, UI following data.

---

## Close

Parentheses for events. Methods for responses. Signals or service state for what actually changes.

The user does something → your code responds. Everything else is wiring and good names.
