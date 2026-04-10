import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormField, form, required } from '@angular/forms/signals';

import { RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';

interface RecipePickerModel {
  /** Radio `value` attributes are strings; we normalize when resolving the recipe. */
  recipeId: string;
}

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeDetail, FormField],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
  // only run change detection for this component when you have reason to
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeList {
  protected readonly recipes = RECIPES;

  protected readonly pickerModel = signal<RecipePickerModel>({
    recipeId: String(RECIPES[0].id),
  });

  protected readonly pickerForm = form(this.pickerModel, (path) => {
    required(path.recipeId, { message: 'Choose a recipe.' });
  });

  protected readonly recipe = computed<RecipeModel>(() => {
    const raw = this.pickerForm.recipeId().value();
    const id = Number(raw);
    return RECIPES.find((r) => r.id === id) ?? RECIPES[0];
  });
}
