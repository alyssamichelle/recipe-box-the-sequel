import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormField, form, required } from '@angular/forms/signals';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';

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
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly recipes = RECIPES;

  protected readonly pickerModel = signal<RecipePickerModel>({
    recipeId: RecipeList.initialRecipeId(this.route.snapshot.paramMap),
  });

  protected readonly pickerForm = form(this.pickerModel, (path) => {
    required(path.recipeId, { message: 'Choose a recipe.' });
  });

  /** Mirrors `:recipeId` so detail stays in sync with the URL (incl. browser back/forward). */
  private readonly routeRecipeId = toSignal(
    this.route.paramMap.pipe(map((pm) => pm.get('recipeId'))),
    { initialValue: this.route.snapshot.paramMap.get('recipeId') },
  );

  protected readonly recipe = computed<RecipeModel>(() => {
    const raw = this.routeRecipeId();
    const id = raw ? Number(raw) : NaN;
    return RECIPES.find((r) => r.id === id) ?? RECIPES[0];
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((pm) => {
      const raw = pm.get('recipeId');
      if (!raw || !RECIPES.some((r) => r.id === Number(raw))) {
        void this.router.navigate(['/recipes', RECIPES[0].id], { replaceUrl: true });
        return;
      }
      if (this.pickerModel().recipeId !== raw) {
        this.pickerModel.set({ recipeId: raw });
      }
    });
  }

  /** After a radio change, move the browser URL to match (shareable link). */
  protected onRecipeChange(): void {
    const raw = this.pickerForm.recipeId().value();
    const fromUrl = this.route.snapshot.paramMap.get('recipeId');
    if (raw !== fromUrl) {
      void this.router.navigate(['/recipes', raw]);
    }
  }

  private static initialRecipeId(pm: ParamMap): string {
    const raw = pm.get('recipeId');
    if (raw && RECIPES.some((r) => r.id === Number(raw))) {
      return raw;
    }
    return String(RECIPES[0].id);
  }
}
