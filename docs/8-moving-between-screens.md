# Moving Between Screens

## Intro

Everything we’ve built so far could live on one URL in your head.

But users don’t think that way. They land on a list, tap into a recipe, hit add, cancel back out. Each of those is a different screen — and the address bar should make sense when they share a link.

Routing is how Angular swaps which component owns the main canvas without reloading the whole page.

---

## The anchor

Say this before you show a second path.

Your app isn’t just one page.

One shell, many views. The router picks the view from the URL.

---

## Route table — keep it boring

Our Recipe Box declares a small map: path, component. Empty path redirects to the list so `/` isn’t a dead end.

```ts
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'recipes', component: RecipeList },
  { path: 'recipes/new', component: RecipeForm },
  { path: 'recipes/:id', component: RecipeDetail },
];
```

That’s the whole story for the demo. List, add form, detail with an id parameter. No nested trees, no ceremony — on purpose.

`provideRouter(routes)` in `app.config` wires it up once at bootstrap.

---

## Where screens render

The root template is almost empty on purpose: one outlet, everything else is routed.

```html
<router-outlet />
```

Angular tears down the old routed component and mounts the new one when the URL changes. Your app shell — if you had a global chrome — would wrap that outlet. We kept the shell thin so the talk stays about navigation, not layout.

---

## Navigation — declarative first

Buttons and links don’t need a click handler if the destination is fixed.

Add recipe from the app bar:

```html
<button type="button" routerLink="/recipes/new">Add recipe</button>
```

View a specific recipe — build the link from data:

```html
<button type="button" [routerLink]="['/recipes', dataItem.id]">View recipe</button>
```

Same idea as cancel on the form — `routerLink="/recipes"` takes you home.

That’s most of what people need day to day: `RouterLink` in the component imports, attribute on the control, done.

---

## Navigation — when code decides

After a successful save, we don’t make the user hunt for the list. The component already has `Router` injected — call `navigate` when the service work finishes.

```ts
void this.router.navigate(['/recipes']);
```

Declarative for bookmarks and obvious buttons. Imperative when the right moment is after validation or an API call. Both are fine; pick the one that matches the user story.

---

## Params without drowning

Detail route uses `:id`. The detail component turns the param stream into a signal with `toSignal` — we touched that in the signals section — then derives the recipe.

I’m not repeating the whole snippet here. The routing story is: URL carries identity; component reads it; template shows found or not-found.

---

## Don’t overdo it

You can spend a week on lazy loading, guards, resolvers, and nested outlets. Useful later — terrible for a first tour.

This app proves you can ship something understandable with a flat route array, an outlet, and a handful of links.

Teach the shape first. Add guardrails when the audience asks for them.

---

## Close

Routes map URLs to components. `router-outlet` is the stage. `routerLink` and `navigate` move the play forward.

Your app isn’t just one page — and your users never thought it was.
