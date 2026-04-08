import { Injectable, signal } from '@angular/core';
import { RecipeModel } from './models';
import { MOCK_RECIPES } from './mock-recipes';

export interface NewRecipeInput {
  name: string;
  description: string;
  imgUrl: string;
  isFavorite: boolean;
  ingredients: RecipeModel['ingredients'];
}

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private readonly recipes = signal<RecipeModel[]>(
    MOCK_RECIPES.map((recipe) => ({
      ...recipe,
      ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient })),
    })),
  );

  readonly allRecipes = this.recipes.asReadonly();

  getById(id: number): RecipeModel | undefined {
    return this.recipes().find((recipe) => recipe.id === id);
  }

  addRecipe(input: NewRecipeInput): void {
    const nextId = Math.max(0, ...this.recipes().map((recipe) => recipe.id)) + 1;
    const recipe: RecipeModel = {
      id: nextId,
      name: input.name,
      description: input.description,
      imgUrl: input.imgUrl,
      isFavorite: input.isFavorite,
      ingredients: input.ingredients.map((ingredient) => ({ ...ingredient })),
    };
    this.recipes.update((list) => [...list, recipe]);
  }
}
