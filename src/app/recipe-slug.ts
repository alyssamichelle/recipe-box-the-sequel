import { RECIPES } from './mock-recipes';
import { RecipeModel } from './models';

/**
 * Turns a recipe title into a URL-friendly "slug" (no spaces or odd characters).
 * Example: "Spaghetti Carbonara" → "spaghetti-carbonara"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Looks up a recipe when you only know the slug from the URL. */
export function findRecipeBySlug(slug: string | null | undefined): RecipeModel | undefined {
  if (!slug) return undefined;
  return RECIPES.find((r) => slugify(r.name) === slug);
}

/** First recipe’s slug — used as the default when the URL is missing or invalid. */
export function defaultRecipeSlug(): string {
  return slugify(RECIPES[0].name);
}
