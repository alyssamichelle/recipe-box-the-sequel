# Section 4 --- Signals (Fast Forward + Aha Version)

Uses: https://github.com/alyssamichelle/recipe-box-the-sequel/tree/5-signals-computed

## 🧩 Signals

So far, we've been building everything step by step.

We added data.\
We wired up events.\
We updated the UI.

------------------------------------------------------------------------

But this is not how most of you are going to build apps anymore.

------------------------------------------------------------------------

You're going to generate things.

You're going to scaffold pieces.

You're going to jump forward.

------------------------------------------------------------------------

So that's exactly what I'm going to do here.

------------------------------------------------------------------------

I'm going to fast forward the app to a more complete version.

------------------------------------------------------------------------

Now instead of everything living in one component...

we've split things out a bit.

-   a recipe list\
-   a recipe detail view\
-   some shared models

------------------------------------------------------------------------

Let's take a quick look at what we have now.

------------------------------------------------------------------------

In the list component, I have a selected recipe.

``` ts
protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);
```

And I can change it with buttons.

``` ts
protected selectCarbonara(): void {
  this.recipe.set(MOCK_RECIPES[0]);
}

protected selectCaprese(): void {
  this.recipe.set(MOCK_RECIPES[1]);
}
```

------------------------------------------------------------------------

In the template you can see where that selected recipe is printed out, using our new recipe detail component.

``` html
<app-recipe-detail [recipe]="recipe()" />
```

------------------------------------------------------------------------

So now we've separated responsibilities a bit.

The list decides what is selected.

The detail displays it.



------------------------------------------------------------------------

In the detail component you can see we are receiving the selected recipe as input.

``` ts
readonly recipe = input.required<RecipeModel>();
```

And we also have some local state.

``` ts
protected readonly servings = signal<number>(1);
```

------------------------------------------------------------------------

So now we have two pieces of data:

-   which recipe is selected\
-   how many servings we want

------------------------------------------------------------------------

And this is where I want to slow down.

------------------------------------------------------------------------

Because this is where signals actually become interesting.

------------------------------------------------------------------------

Right now, we could manually calculate ingredient quantities.

We could write logic like:

When servings changes, update this list.\
When recipe changes, update this list.

------------------------------------------------------------------------

That works.

But it gets messy fast.

------------------------------------------------------------------------

Instead, we're going to describe the relationship.

------------------------------------------------------------------------

``` ts
protected readonly adjustedIngredients = computed<Ingredient[]>(() => {
  const current = this.recipe();
  const factor = this.servings() / 4;

  return current.ingredients.map((ing) => ({
    name: ing.name,
    unit: ing.unit,
    quantity: Math.round(ing.quantity * factor * 1000) / 1000,
  }));
});
```

I’m still writing the logic here…
but I’m not manually keeping things in sync anymore.

I’m just describing how this value is derived,
and Angular handles the updates for me.

It also knows exactly what changed,
so it only updates what needs to be updated.

It tracks those dependencies,
so change detection becomes much more targeted and efficient.