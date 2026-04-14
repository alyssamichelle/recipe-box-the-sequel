# Routing Walkthrough Script – Recipe Box

## Intro

Now I want to show you how routing works in this app.

Routing is what lets our application respond to the URL in the browser. Instead of just showing one static screen, we can use the URL to decide what content should appear.

In this project, routing is what makes it possible for us to visit a URL like `/recipes/3` and show recipe number 3. That also means someone could copy that link, send it to someone else, and they’d land on the same recipe.

---

## Registering the Router

In Angular, the router has to be registered with the application first. That happens in `app.config.ts`.

The important line here is:

`provideRouter(routes)`

This tells Angular:
“Hey, this app uses routing, and here is the route table to use.”

Without this, Angular wouldn’t know how navigation works.

---

## Route Table

Next is `app.routes.ts`.

This is the map for the whole app.

- If the path is empty → redirect to `recipes/1`
- `pathMatch: 'full'` ensures only the exact empty path matches
- `recipes/:recipeId` is the main route
- `:recipeId` is dynamic (e.g. `/recipes/5` → recipeId = '5')
- `**` is a catch-all that redirects bad URLs

---

## Router Outlet

Angular needs a place to render the matched component.

That’s `<router-outlet />`.

When the route matches:
`recipes/:recipeId`

Angular renders:
`RecipeList`

right inside that outlet.

---

## ActivatedRoute + Router

Inside `RecipeList`, we inject:

- `ActivatedRoute` → read route data
- `Router` → update the URL

---

## Initial Route Read

We start by reading:

`this.route.snapshot.paramMap`

This gives us the current `recipeId`.

We validate it:
- if valid → use it
- if not → fallback to first recipe

---

## Reactive Route (Signal)

We don’t just read once—we react to changes.

We convert:

`paramMap → signal`

Then compute:

`recipe = current recipe from route`

Now:

URL → signal → UI

---

## Key Mental Model

The URL is the source of truth.

If the URL changes:
→ the UI updates automatically

---

## Syncing Radios with URL

We subscribe to `paramMap` in our constructor.

When it changes:
- validate the ID
- fix invalid URLs
- update radio selection

This keeps things in sync with:
- back button
- forward button

---

## Updating URL from UI

When user selects a recipe:

`onRecipeChange()`

We call:

`router.navigate(['/recipes', raw])`

Now:
UI → URL

---

## Template Binding

`[recipe]="recipe()"`

The displayed recipe comes from the route, not just the UI.

---

## Full Flow

- Router is registered
- Route matches `/recipes/:recipeId`
- RouterOutlet renders component
- Component reads route
- Route drives state
- UI reflects state
- UI updates URL

---

## Closing Line

“In this app, the URL is the boss. The rest of the UI just stays in sync with it.”
