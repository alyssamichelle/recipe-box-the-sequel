import { Routes } from '@angular/router';

import { defaultRecipeSlug } from './recipe-slug';
import { RecipeList } from './recipe-list/recipe-list';

const defaultPath = `recipes/${defaultRecipeSlug()}`;

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: defaultPath },
  { path: 'recipes/:recipeSlug', component: RecipeList },
  { path: '**', redirectTo: defaultPath },
];
