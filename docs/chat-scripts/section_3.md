# Section 3 --- Reacting to the User

## 🧩 Reacting to the User

So far, everything we've done has been one direction.

We changed the data...\
and the UI reflected it.

------------------------------------------------------------------------

But real apps aren't just displays.

Users interact with them.

They click things.\
They type.\
They trigger actions.

------------------------------------------------------------------------

So now we're going to flip the direction.

Instead of data flowing to the UI...

we're going to let the UI send signals back to our code.

------------------------------------------------------------------------

This is where event binding comes in.

------------------------------------------------------------------------

In Angular, you'll see this syntax with parentheses.

``` html
<button (click)="addRecipe()">Add Recipe</button>
```

------------------------------------------------------------------------

This is saying:

When this button is clicked...\
run this function in my component.

------------------------------------------------------------------------

Let's go create that function.

``` ts
recipes = [
  { id: 1, name: 'Tacos' },
  { id: 2, name: 'Pasta' }
];

addRecipe() {
  this.recipes.push({
    id: Date.now(),
    name: 'New Recipe'
  });
}
```

------------------------------------------------------------------------

Now when I click the button...

a new item gets added.

------------------------------------------------------------------------

And because our UI is already tied to that data...

it updates automatically.

------------------------------------------------------------------------

So now we have a full loop:

The UI displays data\
The user interacts with the UI\
That interaction changes the data\
And the UI reflects it again

------------------------------------------------------------------------

Let's look at another simple example.

------------------------------------------------------------------------

Maybe we want to toggle something on and off.

``` ts
showFavorites = false;

toggleFavorites() {
  this.showFavorites = !this.showFavorites;
}
```

``` html
<button (click)="toggleFavorites()">Toggle Favorites</button>

@if (showFavorites) {
  <p>Showing favorites</p>
}
```

------------------------------------------------------------------------

Now when I click the button...

the UI changes.

------------------------------------------------------------------------

Again, I'm not manually updating the DOM.

I'm just responding to an event...

and changing my data.

------------------------------------------------------------------------

So here's the pattern:

The user does something\
your code responds\
the data changes\
and the UI reflects it

------------------------------------------------------------------------

This is how your app becomes interactive.

------------------------------------------------------------------------

And just like before, when you're working with AI...

you want to be able to trace this flow.

When something happens in the UI...

what code is actually running?

What data is changing?

------------------------------------------------------------------------

Because if you can follow that chain...

you understand what your app is doing.

------------------------------------------------------------------------

And if you can't...

that's where things start to feel confusing very quickly.
