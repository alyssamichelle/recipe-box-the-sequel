import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { FormField, form, min } from '@angular/forms/signals';

import { Ingredient, RecipeModel } from '../models';

interface ServingsFormModel {
  servings: number;
}

@Component({
  selector: 'app-recipe-detail',
  imports: [JsonPipe, FormField],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetail {
  readonly recipe = input.required<RecipeModel>();

  protected readonly servingsModel = signal<ServingsFormModel>({ servings: 1 });

  protected readonly servingsForm = form(this.servingsModel, (path) => {
    min(path.servings, 1, { message: 'Servings must be at least 1.' });
  });

  constructor() {
    effect(() => {
      this.recipe();
      untracked(() => {
        this.servingsModel.set({ servings: 1 });
      });
    });
  }

  protected readonly adjustedIngredients = computed<Ingredient[]>(() => {
    const current = this.recipe();
    const raw = this.servingsForm.servings().value();
    const count = typeof raw === 'number' && !Number.isNaN(raw) ? raw : 1;
    const factor = count / 4;
    return current.ingredients.map((ing) => ({
      name: ing.name,
      unit: ing.unit,
      quantity: Math.round(ing.quantity * factor * 1000) / 1000,
    }));
  });

  /** Plain-text block for the template; newlines become separate rows via `white-space: pre-line`. */
  protected readonly ingredientsLine = computed(() =>
    this.adjustedIngredients()
      .map((i) => `${i.quantity} ${i.unit} ${i.name}`)
      .join('\n'),
  );

  protected incrementServings(): void {
    const raw = this.servingsForm.servings().value();
    const current = typeof raw === 'number' && !Number.isNaN(raw) ? raw : 1;
    this.servingsForm.servings().value.set(current + 1);
  }

  protected decrementServings(): void {
    const raw = this.servingsForm.servings().value();
    const current = typeof raw === 'number' && !Number.isNaN(raw) ? raw : 1;
    this.servingsForm.servings().value.set(Math.max(1, current - 1));
  }
}
