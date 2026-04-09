# Section 2 --- Showing Data on the Screen

## 🧩 Showing Data on the Screen

Now that we know where things live... let's actually put something on
the screen.

------------------------------------------------------------------------

Right now, our component has some data in it.

``` ts
title = 'Alyssa’s Recipe Box';
```

But that data doesn't show up anywhere unless we tell the UI about it.

------------------------------------------------------------------------

This is where interpolation comes in.

------------------------------------------------------------------------

In the template, you'll see these double curly braces.

``` html
<h1>{{ title }}</h1>
```

------------------------------------------------------------------------

All this is doing is saying:

Take this value from my code\
and display it right here in the UI.

------------------------------------------------------------------------

So if I change this value again...

``` ts
title = 'My Favorite Recipes';
```

...the UI updates immediately.

------------------------------------------------------------------------

Again, I didn't touch the HTML.

I didn't go find this element and update it manually.

I just changed the data.

------------------------------------------------------------------------

And the UI reflected it.

------------------------------------------------------------------------

So this is the core idea I want you to hold onto:

Your UI is just a reflection of your data.

------------------------------------------------------------------------

Let's make this a little more interesting.

------------------------------------------------------------------------

Instead of just a title, let's say we have some actual data.

``` ts
recipes = [
  { id: 1, name: 'Tacos' },
  { id: 2, name: 'Pasta' },
  { id: 3, name: 'Cookies' }
];
```

------------------------------------------------------------------------

Now I can show something like a count.

``` html
<p>Total recipes: {{ recipes.length }}</p>
```

------------------------------------------------------------------------

And if I add another item...

``` ts
this.recipes.push({ id: 4, name: 'Pizza' });
```

...the number updates.

------------------------------------------------------------------------

Same pattern.

Change the data\
the UI reflects it.

------------------------------------------------------------------------

At this point, we're not doing anything Angular-specific or complicated.

We're just connecting data to the screen.

------------------------------------------------------------------------

And this is really important when you're working with AI.

Because AI will happily generate UI for you...

but if you don't understand where the data is coming from\
or how it's being displayed...

it's very easy to trust something that's actually wrong.

------------------------------------------------------------------------

So anytime you see something on the screen...

you should be able to ask:

Where is that value coming from?

------------------------------------------------------------------------

Because if you can answer that...

you understand what your app is doing.

------------------------------------------------------------------------

And if you can't...

that's where bugs start to hide.

------------------------------------------------------------------------

This is the foundation for everything else we're about to do.
