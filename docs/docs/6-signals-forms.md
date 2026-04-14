# Section 5 --- Forms that stay in sync (Signal Forms)

Uses: https://github.com/alyssamichelle/recipe-box-the-sequel/tree/6-signal-forms

## 🧩 Forms that stay in sync

To build on what we just did with signals...

I want to talk about something that always gets a little weird in apps.

Forms.

Up until now, everything has felt pretty clean.

State changes\
UI updates

Nice and predictable.

But the second a user starts typing into an input...

things can fall apart really quickly.

Because now we have two directions:

state → UI\
UI → state


And if those two aren't connected perfectly...

you get weird bugs.

Inputs don't update\
Values don't stick\
Stuff just feels off

------------------------------------------------------------------------

So Angular has been moving toward a new way of handling this.

------------------------------------------------------------------------

This is called Signal Forms.

------------------------------------------------------------------------

And instead of thinking about:

binding this input\
wiring that event\
keeping everything in sync manually

------------------------------------------------------------------------

The idea is:

what if there was just one place where this data lived...

and everything else stayed connected to it?

------------------------------------------------------------------------

That's what we're doing here.

------------------------------------------------------------------------

## Quick grounding moment

Before we go deeper, I want to call something out...

because this confused me the first time too.

------------------------------------------------------------------------

Earlier, we had buttons like:

click → update servings

------------------------------------------------------------------------

And you might be thinking...

isn't that already a form?

------------------------------------------------------------------------

Not really.

That's just event binding.

A real form is when you have actual inputs:

text fields\
radio buttons\
numbers
and usually… a form element that groups all of that together

because now we’re not just dealing with individual inputs…
we’re dealing with a set of data that belongs together
------------------------------------------------------------------------


## The mental model

Back to signal forms, There are really just a few moving pieces:

-   your data lives in a signal\
-   Angular builds a form around it\
-   your inputs connect to that form


That's it.


If one of those pieces is missing...

things break.


## Example A --- Choosing a recipe recipe-list.ts

We have a list of recipes...

and the user needs to pick one.


Instead of manually tracking which one is selected...

we describe the shape of the data.

``` ts
interface RecipePickerModel {
  recipeId: string;
}
```

**Project:** `src/app/recipe-list/recipe-list.ts` — starts at **line 8**

------------------------------------------------------------------------

Then we create a signal to hold that.

``` ts
protected readonly pickerModel = signal<RecipePickerModel>({
  recipeId: String(RECIPES[0].id),
});
```

**Project:** `src/app/recipe-list/recipe-list.ts` — starts at **line 23**

------------------------------------------------------------------------

This is our single source of truth.

------------------------------------------------------------------------

Then we create a form from it.

``` ts
protected readonly pickerForm = form(this.pickerModel, (path) => {
  required(path.recipeId, { message: 'Choose a recipe.' });
});
```

**Project:** `src/app/recipe-list/recipe-list.ts` — starts at **line 27**

------------------------------------------------------------------------

And now instead of wiring everything manually...

we connect the UI to that field.

``` html
<input type="radio" [value]="'' + r.id" [formField]="pickerForm.recipeId" />
```

**Project:** `src/app/recipe-list/recipe-list.html` — starts at **line 7** (inside the `@for` over recipes)

------------------------------------------------------------------------

This is the important part.

------------------------------------------------------------------------

I'm not writing event handlers.

I'm not syncing state manually.

------------------------------------------------------------------------

I'm just saying:

this input is tied to this field

------------------------------------------------------------------------

And Angular handles the rest.

------------------------------------------------------------------------

When the user clicks...

the signal updates.

------------------------------------------------------------------------

And anything depending on that...

reacts.

------------------------------------------------------------------------

## Validation in the template

I did want to highlight where we already wrote the rules for our form in the markup — for example "this field is required" or "servings can't be below 1."

If this field is invalid, Angular knows.
If the user has touched it, Angular knows.
And we can just react to that.

Recipe picker:

``` html
@if (pickerForm.recipeId().touched() && pickerForm.recipeId().invalid()) {
  <ul class="recipe-list__errors" role="alert">
    @for (error of pickerForm.recipeId().errors(); track error) {
      <li>{{ error.message }}</li>
    }
  </ul>
}
```


## Example B --- Servings input

Now let's go back to our servings example from before.

------------------------------------------------------------------------

Right now we're controlling servings with buttons.

------------------------------------------------------------------------

But what if the user could type directly?

------------------------------------------------------------------------

We create a model:

``` ts
interface ServingsFormModel {
  servings: number;
}
```

**Project:** `src/app/recipe-detail/recipe-detail.ts` — starts at **line 15**

------------------------------------------------------------------------

Then a signal:

``` ts
protected readonly servingsModel = signal<ServingsFormModel>({
  servings: 1
});
```

**Project:** `src/app/recipe-detail/recipe-detail.ts` — starts at **line 29**

------------------------------------------------------------------------

Then a form:

``` ts
protected readonly servingsForm = form(this.servingsModel, (path) => {
  min(path.servings, 1, { message: 'Servings must be at least 1.' });
});
```

**Project:** `src/app/recipe-detail/recipe-detail.ts` — starts at **line 31**

------------------------------------------------------------------------

Then bind the input:

``` html
<input
  type="number"
  [formField]="servingsForm.servings"
/>
```

**Project:** `src/app/recipe-detail/recipe-detail.html` — starts at **line 11** (the template also adds `id`, `class`, and a wrapping `<label>` on lines 9–17)

------------------------------------------------------------------------

Now watch what happens.

------------------------------------------------------------------------

When I type into this input...

the servings signal updates.

------------------------------------------------------------------------

And because servings is part of our reactive system...

everything else updates too.

------------------------------------------------------------------------

The number updates\
The ingredient list updates\
Everything stays in sync

------------------------------------------------------------------------

Same system as before.

New way to interact with it.

------------------------------------------------------------------------

## Teaching moment — Buttons and the same field
One important thing to notice here…

The input and the buttons aren’t separate pieces of state.

They’re both updating the same value.

So whether I type…

or click a button…

it all flows through the same place.

And everything stays in sync because of that.


## Tie it back

This is the same idea we just saw with computed.

------------------------------------------------------------------------

Instead of thinking:

when this changes, update that...

------------------------------------------------------------------------

We're saying:

this value lives here\
and everything else reads from it

------------------------------------------------------------------------

That's it.

------------------------------------------------------------------------

## Why this matters

This is also where AI will trip you up.

------------------------------------------------------------------------

It can generate something that looks like a working form...

but if the data isn't actually connected...

you get subtle bugs.

------------------------------------------------------------------------

So when you see an input...

ask:

Where does this value live?\
What updates it?\
What depends on it?

------------------------------------------------------------------------

If you can answer those...

you're in control.

------------------------------------------------------------------------

## Closing beat

Signal Forms aren't magic.

------------------------------------------------------------------------

They're just discipline.

------------------------------------------------------------------------

One model signal\
One form\
Inputs connected to that form\
Everything else reads from signals

------------------------------------------------------------------------

And once that loop clicks...

forms stop feeling fragile...

and start feeling predictable.
