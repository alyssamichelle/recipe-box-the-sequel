# Section 6 --- Making Decisions in the UI

## 🧩 Making Decisions in the UI

Earlier, we briefly saw that the template can react to our data.

Now we're going to lean into that a bit more.

------------------------------------------------------------------------

Because real UIs aren't static.

They change based on what's happening in your app.

------------------------------------------------------------------------

Sometimes you want to show something.

Sometimes you want to hide it.

Sometimes you want to render a list.

------------------------------------------------------------------------

And all of that is driven by your data.

------------------------------------------------------------------------

Let's start with a simple condition.

``` ts
hasRecipes = signal(true);
```

``` html
@if (hasRecipes()) {
  <p>You have recipes</p>
}
```

------------------------------------------------------------------------

If I change this value...

``` ts
this.hasRecipes.set(false);
```

...the UI updates.

------------------------------------------------------------------------

Nothing new here in terms of behavior.

We're still just changing data...

and the UI reflects it.

------------------------------------------------------------------------

But now we're shaping the structure of the UI itself.

------------------------------------------------------------------------

Instead of just changing text...

we're deciding what exists on the screen.

------------------------------------------------------------------------

Let's go back to our recipes list.

``` html
<ul>
  @for (recipe of recipes(); track recipe.id) {
    <li>{{ recipe.name }}</li>
  }
</ul>
```

------------------------------------------------------------------------

This is saying:

For every item in this data...

create a piece of UI.

------------------------------------------------------------------------

If I add a new recipe...

it shows up.

If I remove one...

it disappears.

------------------------------------------------------------------------

Again, we're not manually adding or removing elements.

We're describing what should exist...

based on the data.

------------------------------------------------------------------------

Now let's combine these ideas.

``` html
@if (recipes().length === 0) {
  <p>No recipes yet</p>
} @else {
  <ul>
    @for (recipe of recipes(); track recipe.id) {
      <li>{{ recipe.name }}</li>
    }
  </ul>
}
```

------------------------------------------------------------------------

Now the UI adapts automatically.

Empty state when there's no data.

List when there is.

------------------------------------------------------------------------

So here's the key idea:

The UI changes based on your data.

------------------------------------------------------------------------

Not just the content...

but the structure itself.

------------------------------------------------------------------------

And this is another place where AI can look correct...

but behave incorrectly.

------------------------------------------------------------------------

If the condition is wrong...

or the data isn't what you think it is...

the UI might disappear\
or render the wrong thing entirely

------------------------------------------------------------------------

So when you see control flow...

you want to ask:

What data is this depending on?

What happens when that data changes?

------------------------------------------------------------------------

Because once you understand that...

you're not just reading templates...

you're understanding behavior.

------------------------------------------------------------------------

And that's what lets you trust---or question---what AI gives you.
