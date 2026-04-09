# Section 5 --- Keeping Things in Sync

## 🧩 Keeping Things in Sync

So far, our data has been driving the UI.

And our UI has been triggering changes to our data.

------------------------------------------------------------------------

But there's still a bit of a gap.

------------------------------------------------------------------------

Right now, if a user types into an input...

Angular doesn't automatically know what to do with that.

------------------------------------------------------------------------

We need a way to keep the UI and our data in sync.

------------------------------------------------------------------------

This is where two-way binding comes in.

------------------------------------------------------------------------

Let's add a simple input.

``` html
<input [value]="newRecipe()" (input)="updateRecipe($event)" />
```

------------------------------------------------------------------------

And in our component:

``` ts
import { signal } from '@angular/core';

newRecipe = signal('');

updateRecipe(event: Event) {
  const input = event.target as HTMLInputElement;
  this.newRecipe.set(input.value);
}
```

------------------------------------------------------------------------

Now watch what's happening.

------------------------------------------------------------------------

When I type into this input...

it updates our signal.

------------------------------------------------------------------------

And if I change the signal...

the input reflects it.

------------------------------------------------------------------------

That's two-way communication.

------------------------------------------------------------------------

The UI is sending data to our code.

And our code is sending data back to the UI.

------------------------------------------------------------------------

Now let's use that value.

``` ts
addRecipe() {
  this.recipes.update(current => [
    ...current,
    { id: Date.now(), name: this.newRecipe() }
  ]);

  this.newRecipe.set('');
}
```

------------------------------------------------------------------------

Now when I type something and click add...

it shows up in the list...

and clears the input.

------------------------------------------------------------------------

Everything stays in sync.

------------------------------------------------------------------------

So now, instead of one-way flow...

we have a loop:

The UI displays data\
The user changes something\
That change updates our state\
And the UI reflects it again

------------------------------------------------------------------------

Now your app and the UI are having a conversation.

------------------------------------------------------------------------

And just like before...

this is another place where AI can trip you up.

------------------------------------------------------------------------

You might see generated code that looks right...

but if the data isn't actually connected both ways...

things will feel broken.

------------------------------------------------------------------------

Inputs won't update\
Values won't stick\
Or the UI won't reflect what the user just did

------------------------------------------------------------------------

So when you see an input...

you should be able to ask:

Where is this value stored?

What updates it?

What reads from it?

------------------------------------------------------------------------

Because if you can trace that loop...

you understand how your app stays in sync.

------------------------------------------------------------------------

And that's what makes forms, inputs, and user interaction actually work.
