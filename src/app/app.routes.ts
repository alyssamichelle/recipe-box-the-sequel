import { Routes } from '@angular/router';

import { RecipeList } from './recipe-list/recipe-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes/1' },
  { path: 'recipes/:recipeId', component: RecipeList },
  { path: '**', redirectTo: 'recipes/1' },
];
