# Section 4 --- Signals
Uses: https://github.com/alyssamichelle/recipe-box-the-sequel/tree/3-reacting-to-the-user.md
START IN OLD FILE!!!!!!!

--> later, delete 4-signals and remake the branch from section 3 + these changes commented out below to work through (or just version 3 idk not sold on my convention)

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
We are using the spread operator, aka taking everything from recipes and putting it in this new update "recipe" list, one by one. 

------------------------------------------------------------------------

Now when I click the button...

everything updates like before.

