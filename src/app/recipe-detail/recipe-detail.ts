import { JsonPipe } from '@angular/common';
import { Component, computed, input, signal } from '@angular/core';

import { Ingredient, RecipeModel } from '../models';

@Component({
  selector: 'app-recipe-detail',
  imports: [JsonPipe],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  readonly recipe = input.required<RecipeModel>();

  protected readonly servings = signal<number>(1);

  protected readonly adjustedIngredients = computed<Ingredient[]>(() => {
    const current = this.recipe();
    const factor = this.servings() / 4;
    return current.ingredients.map((ing) => ({
      name: ing.name,
      unit: ing.unit,
      quantity: Math.round(ing.quantity * factor * 1000) / 1000,
    }));
  });

  protected incrementServings(): void {
    this.servings.update((s) => s + 1);
  }

  protected decrementServings(): void {
    this.servings.update((s) => Math.max(1, s - 1));
  }
}
