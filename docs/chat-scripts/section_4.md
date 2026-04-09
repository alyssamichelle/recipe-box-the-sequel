# Section 4 --- Signals

## 🧩 Signals

So far, we've been working with plain values.

We've changed data...\
and we've seen the UI update.

We've responded to user actions...\
and updated that data again.

------------------------------------------------------------------------

But there's something important happening underneath all of this.

------------------------------------------------------------------------

Right now, when we change data...

Angular is still figuring out when to update the UI.

It works...

but we're not being very explicit about what should trigger updates.

------------------------------------------------------------------------

This is where signals come in.

------------------------------------------------------------------------

Signals are Angular's way of saying:

This value matters.\
And when it changes... react to it.

------------------------------------------------------------------------

Let's take our recipes and turn them into a signal.

``` ts
import { signal } from '@angular/core';

recipes = signal([
  { id: 1, name: 'Tacos' },
  { id: 2, name: 'Pasta' }
]);
```

------------------------------------------------------------------------

Now instead of accessing it like a normal array...

we call it like a function.

``` html
<p>Total recipes: {{ recipes().length }}</p>
```

------------------------------------------------------------------------

That might feel a little weird at first...

but what it's doing is very intentional.

------------------------------------------------------------------------

We're telling Angular:

Whenever this value changes...\
anything using it should update.

------------------------------------------------------------------------

Now let's update it.

------------------------------------------------------------------------

Instead of push...

we use set or update.

``` ts
addRecipe() {
  this.recipes.update(current => [
    ...current,
    { id: Date.now(), name: 'New Recipe' }
  ]);
}
```

------------------------------------------------------------------------

Now when I click the button...

everything updates like before.

------------------------------------------------------------------------

But here's the difference.

------------------------------------------------------------------------

Notice we didn't tell Angular to update the screen.

We didn't trigger change detection.

We didn't do anything special.

------------------------------------------------------------------------

It just knew.

------------------------------------------------------------------------

Because we told it:

This value is reactive.

------------------------------------------------------------------------

That's the shift.

------------------------------------------------------------------------

Before, we were just changing data.

Now, we're declaring what data should drive our UI.

------------------------------------------------------------------------

And Angular is handling the rest.

------------------------------------------------------------------------

You can also derive values from signals.

``` ts
import { computed } from '@angular/core';

recipeCount = computed(() => this.recipes().length);
```

``` html
<p>Total recipes: {{ recipeCount() }}</p>
```

------------------------------------------------------------------------

Now this value automatically stays in sync.

We didn't write any update logic for it.

------------------------------------------------------------------------

It just reacts.

------------------------------------------------------------------------

If you've worked with observables before...

this might feel familiar.

Signals are a simpler, more direct way to model reactive state in
Angular.

------------------------------------------------------------------------

So now, instead of thinking:

When this changes, update that...

------------------------------------------------------------------------

You start thinking:

This value drives this part of the UI.

------------------------------------------------------------------------

And that mental shift is huge.

------------------------------------------------------------------------

Because when AI generates code for you...

this is one of the easiest places for things to go wrong.

------------------------------------------------------------------------

If something isn't updating...

or updating too much...

or in weird ways...

------------------------------------------------------------------------

It usually comes back to this question:

What data is reactive... and what isn't?

------------------------------------------------------------------------

So if you understand signals...

you understand how change flows through your app.

------------------------------------------------------------------------

And that's where things really start to click.
