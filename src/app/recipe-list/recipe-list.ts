import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormField, form, required } from '@angular/forms/signals';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { RECIPES } from '../mock-recipes';
import { RecipeModel } from '../models';
import { RecipeDetail } from '../recipe-detail/recipe-detail';
import { defaultRecipeSlug, findRecipeBySlug, slugify } from '../recipe-slug';

interface RecipePickerModel {
  /** Same string as in the URL segment (`/recipes/:recipeSlug`), e.g. `spaghetti-carbonara`. */
  recipeSlug: string;
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
    recipeSlug: RecipeList.initialRecipeSlug(this.route.snapshot.paramMap),
  });

  protected readonly pickerForm = form(this.pickerModel, (path) => {
    required(path.recipeSlug, { message: 'Choose a recipe.' });
  });

  /** Lets the template bind radio values: one slug per recipe name. */
  protected readonly slugify = slugify;

  /** Mirrors `:recipeSlug` so detail stays in sync with the URL (incl. browser back/forward). */
  private readonly routeRecipeSlug = toSignal(
    this.route.paramMap.pipe(map((pm) => pm.get('recipeSlug'))),
    { initialValue: this.route.snapshot.paramMap.get('recipeSlug') },
  );

  protected readonly recipe = computed<RecipeModel>(() => {
    const slug = this.routeRecipeSlug();
    return findRecipeBySlug(slug) ?? RECIPES[0];
  });

  constructor() {
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe((pm) => {
      const slug = pm.get('recipeSlug');
      if (!slug || !findRecipeBySlug(slug)) {
        void this.router.navigate(['/recipes', defaultRecipeSlug()], { replaceUrl: true });
        return;
      }
      if (this.pickerModel().recipeSlug !== slug) {
        this.pickerModel.set({ recipeSlug: slug });
      }
    });
  }

  /** After a radio change, move the browser URL to match (shareable link). */
  protected onRecipeChange(): void {
    const slug = this.pickerForm.recipeSlug().value();
    const fromUrl = this.route.snapshot.paramMap.get('recipeSlug');
    if (slug !== fromUrl) {
      void this.router.navigate(['/recipes', slug]);
    }
  }

  private static initialRecipeSlug(pm: ParamMap): string {
    const slug = pm.get('recipeSlug');
    if (slug && findRecipeBySlug(slug)) {
      return slug;
    }
    return defaultRecipeSlug();
  }
}
