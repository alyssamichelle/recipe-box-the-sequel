# Section 8 --- Moving Between Screens

## 🧩 Moving Between Screens

Up to this point, everything we've built has lived on a single screen.

And that's fine for small examples...

but real applications don't stay on one page.

------------------------------------------------------------------------

Your app isn't just one page.

------------------------------------------------------------------------

Users move between different views.

They might go from a list...\
to a detail page...\
to a form...

------------------------------------------------------------------------

So we need a way to handle navigation.

------------------------------------------------------------------------

This is where routing comes in.

------------------------------------------------------------------------

Angular's router lets us map URLs to components.

So when the user navigates somewhere...

Angular knows what to display.

------------------------------------------------------------------------

Let's start with a simple example.

------------------------------------------------------------------------

We'll create two components:

-   a list view\
-   and a detail view

------------------------------------------------------------------------

Then define routes.

``` ts
import { Routes } from '@angular/router';
import { RecipeListComponent } from './recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail.component';

export const routes: Routes = [
  { path: '', component: RecipeListComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent }
];
```

------------------------------------------------------------------------

This is just saying:

When the path is empty... show the list.

When the path includes an id... show the detail page.

------------------------------------------------------------------------

Now in our template, we add a place for Angular to render those
components.

``` html
<router-outlet></router-outlet>
```

------------------------------------------------------------------------

This acts like a placeholder.

Whatever route we're on...

Angular renders the matching component right here.

------------------------------------------------------------------------

Now let's add navigation.

``` html
<a [routerLink]="['/recipe', recipe.id]">
  {{ recipe.name }}
</a>
```

------------------------------------------------------------------------

When I click this...

Angular updates the URL...

and swaps out what's rendered in the outlet.

------------------------------------------------------------------------

No full page refresh.

No manual DOM work.

Just a change in state...

and the UI updates to match.

------------------------------------------------------------------------

So now, instead of thinking of your app as one page...

you can think of it as a set of views.

------------------------------------------------------------------------

And routing is what connects them.

------------------------------------------------------------------------

Just like everything else we've seen:

The URL changes\
Angular responds\
and the UI reflects that change

------------------------------------------------------------------------

And when you're working with AI...

this is another place to stay grounded.

------------------------------------------------------------------------

You might see routes being generated...

or navigation wired up for you...

------------------------------------------------------------------------

But you should always be able to answer:

What component should render for this route?

Where is that being defined?

Where does it show up in the UI?

------------------------------------------------------------------------

Because once you understand that...

navigation stops feeling magical...

and starts feeling predictable.

------------------------------------------------------------------------

And that's exactly what you want.
