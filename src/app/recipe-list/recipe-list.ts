import { Component, signal } from '@angular/core';

import { MOCK_RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  protected readonly recipe = signal<RecipeModel>(MOCK_RECIPES[0]);

  protected selectCarbonara(): void {
    console.log('Selected Spaghetti Carbonara');
    this.recipe.set(MOCK_RECIPES[0]);
  }

  protected selectCaprese(): void {
    console.log('Selected Caprese Salad');
    this.recipe.set(MOCK_RECIPES[1]);
  }
}
