import { Routes } from '@angular/router';
import { RecipeDetail } from './recipe-detail/recipe-detail';
import { RecipeForm } from './recipe-form/recipe-form';
import { RecipeList } from './recipe-list/recipe-list';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'recipes' },
  { path: 'recipes', component: RecipeList },
  { path: 'recipes/new', component: RecipeForm },
  { path: 'recipes/:id', component: RecipeDetail },
];
