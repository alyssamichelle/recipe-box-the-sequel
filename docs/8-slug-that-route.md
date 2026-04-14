# 🧩 Slugs (Readable URLs)

In this app, instead of using numbers like `/recipes/1`...

we use something called a slug.

A slug is just a URL-friendly version of a name.

For example:

`Spaghetti Carbonara` → `spaghetti-carbonara`

------------------------------------------------------------------------

Why do we do this?

Because it makes URLs readable.

You can look at the link and understand what it represents.

------------------------------------------------------------------------

So we take the recipe name, turn it into a slug, and use that in the
URL.

Then when the app loads, we take that slug and find the matching recipe
again.

------------------------------------------------------------------------

That's it.

It's just a bridge between:

human-readable names\
and something safe to put in a URL
