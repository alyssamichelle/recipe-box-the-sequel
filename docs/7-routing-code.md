# Angular routing in Recipe Box

Uses: https://github.com/alyssamichelle/recipe-box-the-sequel/tree/7-routing

This document lists **every piece of code involved in routing**, grouped by file, with a short explanation of what each part does.

---

## `src/index.html`

```html
<base href="/">
```

**What it does:** Tells Angular how to resolve relative URLs for assets and, importantly, for the router. With `href="/"`, routes like `/recipes/3` work when you refresh or share a deep link (assuming the server is configured for SPA fallback in production).

---

## `src/app/app.config.ts`

```typescript
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
  ],
};
```

| Piece | What it does |
|--------|----------------|
| `provideRouter(routes)` | Registers the Angular router with your route table (`routes` from `app.routes.ts`) so navigation, `RouterOutlet`, `ActivatedRoute`, etc. work app-wide. |

---

## `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';

import { RecipeList } from './recipe-list/recipe-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes/1' },
  { path: 'recipes/:recipeId', component: RecipeList },
  { path: '**', redirectTo: 'recipes/1' },
];
```

| Piece | What it does |
|--------|----------------|
| `Routes` | Type for the route configuration array. |
| `path: ''` + `pathMatch: 'full'` | Matches the empty path only (not every path). |
| `redirectTo: 'recipes/1'` | Visiting `/` sends the user to a default recipe URL so there is always a `:recipeId` in the address bar. |
| `path: 'recipes/:recipeId'` | **Dynamic segment** — `:recipeId` is a route parameter (string in the URL, e.g. `recipes/5` → `recipeId` is `'5'`). |
| `component: RecipeList` | When this route matches, Angular creates `RecipeList` and places it in the nearest `router-outlet`. |
| `path: '**'` | Catch-all for unknown paths (e.g. typos); redirects to the same default as home. |

---

## `src/app/app.ts`

```typescript
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  // ...
})
export class App {}
```

| Piece | What it does |
|--------|----------------|
| `RouterOutlet` | Standalone directive so the root template can host routed components. |

---

## `src/app/app.html`

```html
<router-outlet />
```

| Piece | What it does |
|--------|----------------|
| `<router-outlet />` | **Placeholder** where the router renders the active route’s component (`RecipeList` for `recipes/:recipeId`). Without it, navigating would not show the recipe UI. |

---

## `src/app/recipe-list/recipe-list.ts`

### Imports

```typescript
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';
```

| Piece | What it does |
|--------|----------------|
| `ActivatedRoute` | Gives access to **route parameters** (`recipeId`), snapshots, and observables like `paramMap` for the current route. |
| `Router` | Imperative navigation: `navigate([...])` to change the URL when the user picks a recipe. |
| `ParamMap` | Typed map of param names → values from the URL. |
| `toSignal` | Bridges `paramMap` (Observable) into a **signal** so the UI can derive state with `computed`. |
| `takeUntilDestroyed` | Unsubscribes from `paramMap` when the component is destroyed (no memory leaks). |
| `map` | Extracts the `recipeId` string from each `ParamMap` emission. |

### Injections

```typescript
private readonly route = inject(ActivatedRoute);
private readonly router = inject(Router);
```

| Piece | What it does |
|--------|----------------|
| `inject(ActivatedRoute)` | The route instance for **this** component (the one matched by `recipes/:recipeId`). |
| `inject(Router)` | Global router service used to update the browser URL. |

### Initial picker state from the URL

```typescript
protected readonly pickerModel = signal<RecipePickerModel>({
  recipeId: RecipeList.initialRecipeId(this.route.snapshot.paramMap),
});

private static initialRecipeId(pm: ParamMap): string {
  const raw = pm.get('recipeId');
  if (raw && RECIPES.some((r) => r.id === Number(raw))) {
    return raw;
  }
  return String(RECIPES[0].id);
}
```

| Piece | What it does |
|--------|----------------|
| `snapshot.paramMap` | One-time read of params **at creation time** so the radio group starts on the recipe in the URL (e.g. opening `/recipes/7`). |
| `initialRecipeId` | Validates the param against known recipes; falls back to the first recipe if missing or invalid. |

### URL → signal → displayed recipe

```typescript
private readonly routeRecipeId = toSignal(
  this.route.paramMap.pipe(map((pm) => pm.get('recipeId'))),
  { initialValue: this.route.snapshot.paramMap.get('recipeId') },
);

protected readonly recipe = computed<RecipeModel>(() => {
  const raw = this.routeRecipeId();
  const id = raw ? Number(raw) : NaN;
  return RECIPES.find((r) => r.id === id) ?? RECIPES[0];
});
```

| Piece | What it does |
|--------|----------------|
| `routeRecipeId` | **Source of truth from the URL** as a signal; updates when the route param changes (navigation, back/forward). |
| `computed` ... `recipe` | Derives which `RecipeModel` to pass to `<app-recipe-detail>` from the current `recipeId` string. |

### URL changes → sync radios (back/forward, redirects)

```typescript
constructor() {
  this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((pm) => {
    const raw = pm.get('recipeId');
    if (!raw || !RECIPES.some((r) => r.id === Number(raw))) {
      void this.router.navigate(['/recipes', RECIPES[0].id], { replaceUrl: true });
      return;
    }
    if (this.pickerModel().recipeId !== raw) {
      this.pickerModel.set({ recipeId: raw });
    }
  });
}
```

| Piece | What it does |
|--------|----------------|
| `paramMap.subscribe` | Runs whenever the **route parameter** changes (including browser **Back** / **Forward**). |
| Invalid `recipeId` | Replaces the URL with a valid default (`replaceUrl: true` avoids cluttering history with bad URLs). |
| `pickerModel.set` | Keeps the **radio group** in sync with the URL when the URL changed **without** a radio `change` event (e.g. back button). |

### Radios → update URL (shareable link)

```typescript
protected onRecipeChange(): void {
  const raw = this.pickerForm.recipeId().value();
  const fromUrl = this.route.snapshot.paramMap.get('recipeId');
  if (raw !== fromUrl) {
    void this.router.navigate(['/recipes', raw]);
  }
}
```

| Piece | What it does |
|--------|----------------|
| `onRecipeChange` | Called from the template when the user selects a different radio **after** the form value updates. |
| `router.navigate(['/recipes', raw])` | Pushes a new URL such as `/recipes/12` so the link can be **copied and shared**. |
| Compare to `fromUrl` | Avoids redundant navigation when the URL already matches. |

---

## `src/app/recipe-list/recipe-list.html`

```html
<input
  type="radio"
  [value]="'' + r.id"
  [formField]="pickerForm.recipeId"
  (change)="onRecipeChange()"
/>
```

| Piece | What it does |
|--------|----------------|
| `(change)="onRecipeChange()"` | After the user picks a recipe, updates the **browser URL** to match the selection (see `onRecipeChange` above). |

```html
<app-recipe-detail [recipe]="recipe()" />
```

| Piece | What it does |
|--------|----------------|
| `[recipe]="recipe()"` | The shown recipe comes from the **route** (via `computed`), not only from the radios, so deep links and back/forward stay correct. |

---

## `src/app/app.spec.ts`

```typescript
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';

providers: [provideRouter(routes)],

// In the test:
const router = TestBed.inject(Router);
await router.navigate(['/recipes', '1']);
```

| Piece | What it does |
|--------|----------------|
| `provideRouter(routes)` | Gives tests the same routing config as the real app. |
| `router.navigate(['/recipes', '1'])` | Activates the `recipes/:recipeId` route so `RouterOutlet` actually creates `RecipeList` — required before querying `app-recipe-list`. |

---

## `src/app/recipe-list/recipe-list.spec.ts`

```typescript
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';

providers: [
  {
    provide: ActivatedRoute,
    useValue: {
      snapshot: { paramMap: convertToParamMap({ recipeId: '1' }) },
      paramMap: of(convertToParamMap({ recipeId: '1' })),
    },
  },
  { provide: Router, useValue: { navigate: vi.fn().mockResolvedValue(true) } },
],
```

| Piece | What it does |
|--------|----------------|
| `ActivatedRoute` mock | `RecipeList` **injects** `ActivatedRoute`; in a unit test there is no real router, so we supply a fake route with `recipeId: '1'`. |
| `snapshot` + `paramMap` | Matches what the component reads for initial load and `toSignal` / subscriptions. |
| `Router` mock | Satisfies `inject(Router)` and stubs `navigate` so tests do not perform real navigation. |

---

## Mental model (one sentence)

**The URL is the source of truth for which recipe is shown; the radios are kept in sync, and choosing a radio updates the URL for sharing and history.**
