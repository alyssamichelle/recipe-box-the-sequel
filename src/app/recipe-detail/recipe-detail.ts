import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { Ingredient, RecipeModel } from '../models';
import { RecipeService } from '../recipe';

@Component({
  selector: 'app-recipe-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KENDO_BUTTONS, KENDO_LAYOUT],
  templateUrl: './recipe-detail.html',
  styleUrl: './recipe-detail.css',
})
export class RecipeDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly recipeService = inject(RecipeService);

  private readonly recipeId = toSignal(
    this.route.paramMap.pipe(
      map((params) => {
        const raw = params.get('id');
        return raw ? Number(raw) : Number.NaN;
      }),
    ),
    { initialValue: Number.NaN },
  );

  protected readonly recipe = computed<RecipeModel | undefined>(() => {
    const id = this.recipeId();
    if (Number.isNaN(id)) {
      return undefined;
    }
    return this.recipeService.getById(id);
  });

  protected readonly servings = signal(1);

  private readonly resetServingsOnRouteChange = effect(() => {
    const id = this.recipeId();
    if (!Number.isNaN(id)) {
      this.servings.set(1);
    }
  });

  protected readonly adjustedIngredients = computed<Ingredient[]>(() => {
    const current = this.recipe();
    if (!current) {
      return [];
    }
    const factor = this.servings();
    return current.ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: ingredient.quantity * factor,
    }));
  });

  protected bumpServings(delta: number): void {
    this.servings.update((value) => Math.max(1, value + delta));
  }
}
