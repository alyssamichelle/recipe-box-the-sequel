# Section 9 --- Working With AI

## 🧩 Working With AI

Throughout this talk, we've been building things step by step.

But in reality... a lot of you aren't going to build apps like this from
scratch.

------------------------------------------------------------------------

You're going to use AI.

------------------------------------------------------------------------

You'll prompt it.

It will generate code.

And your job shifts a little bit.

------------------------------------------------------------------------

You're not just writing code anymore.

You're guiding what gets written.

------------------------------------------------------------------------

So let's look at that in practice.

------------------------------------------------------------------------

Here's a simple prompt inside Cursor.

``` text
Add a form to create a new recipe with an input and button. Use signals for state.
```

------------------------------------------------------------------------

Let the AI generate the code.

------------------------------------------------------------------------

Now pause.

------------------------------------------------------------------------

Before we just accept this...

we need to read it.

------------------------------------------------------------------------

Look at what it created.

-   Where is the state stored?\
-   How is the input connected?\
-   What happens when the button is clicked?

------------------------------------------------------------------------

We're not asking:

Is this clever?

We're asking:

Does this make sense?

------------------------------------------------------------------------

Because if you understand the patterns we just walked through...

you can evaluate this instantly.

------------------------------------------------------------------------

Now let's take it a step further.

------------------------------------------------------------------------

Instead of building everything manually...

we can use tools that are designed to work with AI.

------------------------------------------------------------------------

This is where something like the Kendo UI component library comes in.

------------------------------------------------------------------------

We can prompt the AI to replace basic HTML with richer components.

``` text
Replace the form with Kendo UI components and keep accessibility in mind.
```

------------------------------------------------------------------------

Or use an MCP server like the Kendo UI Generator.

------------------------------------------------------------------------

This gives the AI more context about:

-   available components\
-   best practices\
-   structure

------------------------------------------------------------------------

So instead of guessing...

it's generating something grounded in a real system.

------------------------------------------------------------------------

You might see it generate something like:

-   a styled input\
-   a button component\
-   layout structure\
-   accessible markup

------------------------------------------------------------------------

And again, we pause.

------------------------------------------------------------------------

We don't just trust it.

We read it.

We ask:

Does this follow the same patterns?

Is the data still connected correctly?

Is the behavior still predictable?

------------------------------------------------------------------------

Because the tools are getting better...

but the responsibility is still yours.

------------------------------------------------------------------------

You are guiding the AI, not following it.

------------------------------------------------------------------------

And that's really the thread through everything we've covered today.

------------------------------------------------------------------------

Data flows into the UI\
User actions flow back into your code\
State drives behavior\
Structure keeps things organized

------------------------------------------------------------------------

AI just helps you move faster.

------------------------------------------------------------------------

But understanding is what keeps you in control.

------------------------------------------------------------------------

So whether you're writing code yourself...

or reviewing something generated...

------------------------------------------------------------------------

The question stays the same:

Does this make sense?

------------------------------------------------------------------------

Because if you can answer that...

you're not just using Angular...

you actually understand it.
