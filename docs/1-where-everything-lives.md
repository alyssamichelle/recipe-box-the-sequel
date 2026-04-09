# Teach Me Angular Like I'm Five --- Script

## Intro
Hello and Howdy! Goodness am I glad you are here today! I feel so blessed to share with you all something I love so so dearly, and that is Angular, the JS framework. My name is Alyssa Nicoll, I am the Senior Developer Advocate at Progress and a long standing Google Developer Expert for Angular.

Today, I am going to use Angular’s MCP tutor during some of the demo and to get us started.

Not because we can’t build this ourselves, but because this is how a lot of developers are actually going to learn Angular now and moving forward.

As far as Angular's tutor guide in their MCP server goes, it is flexible, it adapts to your level, and you can skip ahead or have it pre-fill sections depending on how you like to learn. Once my session is over, it will be a really great resource for you to continue practicing and learning on your own, so be sure to bookmark it.

When I started putting this talk together, I kept thinking about how much our jobs have changed.

As Ady Osmani, who leads engineering at Google Chrome puts it, we’re moving from writing every line of code ourselves to orchestrating systems of AI that help us build.

We have tools now that can generate Angular code in seconds.

But that doesn’t mean we understand what they’re giving us.

So today, I’m going to teach Angular NOT the way it used to be taught.

We’re not going to memorize syntax.

We’re not going to drill terminology.

Instead, I want to show you how Angular actually behaves…

so when AI gives you code, you can look at it and say:

Yeah, that makes sense… or nope, something’s off.

Because the job has changed.

You don’t need to memorize Angular, or React, or JS anymore.

You need to understand them well enough to question what AI gives you.

------------------------------------------------------------------------

## CLI Setup

To start off, we are going to generate a new Angular App with the CLI,
this is the exact command I used to get going, if you want to follow
along later at home:

`ng new recipe-box --defaults --routing --style=css`

Then, I called the Angular MCP tutor to go ahead get us started at
beginner level. More on MCP servers and AI tooling in general later, rn,
let's just dive into the angular.

------------------------------------------------------------------------

## Section: How This App Is Structured

We just generated this app… but what are we actually looking at?

Angular apps aren't random. Things live in specific places for a reason.

Let's go ahead and open the file called app.ts, here you'll see the default application component.

At the center of everything is a component. You could say, it's components all the way down.

This file controls the logic.

``` ts
export class App {
  protected readonly title = 'Recipe Box';
}
```

This is just a normal JavaScript class.

It holds your data.

------------------------------------------------------------------------

Then connected to that is the template.

This file controls what you see.

``` html
<h1>{{ title }}</h1>
```

This is just HTML...

with a little bit of syntax that lets us plug in values.

------------------------------------------------------------------------

Now watch what happens if I change this value.

``` ts
title = 'Alyssa’s Recipe Box';
```

You'll see the text on the screen update.

------------------------------------------------------------------------

Nothing fancy happened here.

We didn't manually go into the DOM and change anything.

We just changed the data...

and the UI reflected it.

------------------------------------------------------------------------

So at a basic level, what we're doing is:

Taking data from our code\
and displaying it in the UI

------------------------------------------------------------------------

Now sometimes, the UI isn't just static text.

Sometimes it needs to change based on what your data is doing.

------------------------------------------------------------------------

For example, maybe we only want to show something if a condition is
true.

``` ts
showMessage = true;
```

``` html
@if (showMessage) {
  <p>Welcome to your recipe box</p>
}
```

------------------------------------------------------------------------

If I flip this to false...

``` ts
showMessage = false;
```

...the UI updates again.

------------------------------------------------------------------------

Or maybe we have a list of data.

``` ts
recipes = [
  { id: 1, name: 'Tacos' },
  { id: 2, name: 'Pasta' }
];
```

``` html
<ul>
  @for (recipe of recipes; track recipe.id) {
    <li>{{ recipe.name }}</li>
  }
</ul>
```

------------------------------------------------------------------------

This is just saying:

For every item in this list...

render something on the screen.

------------------------------------------------------------------------

We're not manually creating DOM elements.

We're just describing what the UI should look like\
based on our data.

------------------------------------------------------------------------

And Angular handles keeping those two things in sync.

------------------------------------------------------------------------

Angular also splits things up a bit so it's easier to work with.

You'll usually see:

-   logic in the TypeScript file\
-   UI in the HTML file\
-   styles in a CSS file

That way you're not trying to manage everything in one place.

However, if you come from a React world or you just prefer everything in
one place, you can put them all in the TypeScript component file like
this, if that's what you prefer.

------------------------------------------------------------------------

So at a high level:

Your component holds the data\
Your template displays it

And your UI is just a reflection of that data.
