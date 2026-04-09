# Organizing Your Thinking

## Intro

You can make almost anything work inside one giant component.

Dump the recipe array in the list. Copy-paste a lookup for detail. Pass state through inputs and events until the template looks like a spreadsheet.

It runs. It ships. It’s also a mess the second you add another screen.

So this section is about placement — not syntax.

---

## The anchor

Say this slowly when someone asks why we bothered.

Just because it works doesn’t mean it’s in the right place.

Working code isn’t the same as code that’s easy to reason about, test, or reuse. Services are how Angular nudges you toward the second one.

---

## What a service is for

A service is a plain TypeScript class — usually with `@Injectable` — that holds behavior and shared state you don’t want tied to a single component’s lifecycle.

Our Recipe Box keeps all recipes in one place: load mock data once, expose a read-only view to the world, add recipes through one method, look up by id from anywhere.

```ts
@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly recipes = signal<RecipeModel[]>(/* ... */);

  readonly allRecipes = this.recipes.asReadonly();

  getById(id: number): RecipeModel | undefined {
    return this.recipes().find((recipe) => recipe.id === id);
  }

  addRecipe(input: NewRecipeInput): void {
    // build recipe, then:
    this.recipes.update((list) => [...list, recipe]);
  }
}
```

`providedIn: 'root'` means Angular creates a single instance for the whole app. You’re not manually new-ing this in every file. The injector hands you the same object wherever you ask.

---

## Dependency injection — asking, not building

Components shouldn’t construct their own service graph. They declare what they need; the framework supplies it.

We use `inject` in the field position — readable, works with `readonly`, no constructor ceremony:

```ts
private readonly recipeService = inject(RecipeService);
```

List screen injects it for `allRecipes` inside a `computed`. Detail injects it for `getById`. Form injects it for `addRecipe`. Three components, one source of truth.

That’s DI in one sentence: depend on abstractions, get a real instance for free.

---

## What stays in the component

UI glue stays local — search term signal, servings, form group, router navigation after save.

The rule of thumb I use in talks: if another route would need the exact same logic tomorrow, it probably doesn’t belong in the first component you wrote.

Recipes belong to the app, not to the list page. So they live in a service.

---

## Close

Services pull shared state and rules out of components. Injection hands them in without singleton spaghetti.

Just because it works in one file doesn’t mean it should stay there.

Put it where the next feature will thank you.
