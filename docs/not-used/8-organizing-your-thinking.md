# Section 7 --- Organizing Your Thinking

## 🧩 Organizing Your Thinking

Up to this point... everything we've done has lived inside the
component.

And that's totally fine.

------------------------------------------------------------------------

But as your app grows...

this file can get crowded very quickly.

------------------------------------------------------------------------

You might have:

-   data\
-   UI logic\
-   event handling\
-   business rules

All in one place.

------------------------------------------------------------------------

And while that might work...

it doesn't always mean it's in the right place.

------------------------------------------------------------------------

Just because it works\
doesn't mean it's in the right place.

------------------------------------------------------------------------

So Angular gives us a way to organize our thinking.

------------------------------------------------------------------------

This is where services come in.

------------------------------------------------------------------------

A service is just a place to move logic that doesn't belong in the UI.

------------------------------------------------------------------------

Let's take our recipes and move them into a service.

``` ts
import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipes = signal([
    { id: 1, name: 'Tacos' },
    { id: 2, name: 'Pasta' }
  ]);

  addRecipe(name: string) {
    this.recipes.update(current => [
      ...current,
      { id: Date.now(), name }
    ]);
  }
}
```

------------------------------------------------------------------------

Now instead of managing this inside our component...

we're moving that responsibility somewhere else.

------------------------------------------------------------------------

Let's use it in the component.

``` ts
import { Component, inject } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  recipeService = inject(RecipeService);

  newRecipe = signal('');

  addRecipe() {
    this.recipeService.addRecipe(this.newRecipe());
    this.newRecipe.set('');
  }
}
```

------------------------------------------------------------------------

And in the template:

``` html
<ul>
  @for (recipe of recipeService.recipes(); track recipe.id) {
    <li>{{ recipe.name }}</li>
  }
</ul>
```

------------------------------------------------------------------------

Now the component is much simpler.

------------------------------------------------------------------------

It's focused on:

-   handling user interaction\
-   connecting data to the UI

------------------------------------------------------------------------

And the service is focused on:

-   managing the data\
-   handling the logic

------------------------------------------------------------------------

This separation makes your app easier to understand.

------------------------------------------------------------------------

Instead of one file doing everything...

each piece has a clear responsibility.

------------------------------------------------------------------------

And this matters a lot when working with AI.

------------------------------------------------------------------------

Because AI will often generate code that works...

but puts everything in one place.

------------------------------------------------------------------------

And that can get messy fast.

------------------------------------------------------------------------

So when you see a component getting large...

you should be asking:

Does this logic belong here?

Or should it live somewhere else?

------------------------------------------------------------------------

Because organizing your code well...

is what keeps your app maintainable over time.

------------------------------------------------------------------------

And that's something AI won't always do for you automatically.
