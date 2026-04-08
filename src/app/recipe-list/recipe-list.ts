import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { KENDO_INPUTS } from '@progress/kendo-angular-inputs';
import { KENDO_LABELS } from '@progress/kendo-angular-label';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { KENDO_NAVIGATION } from '@progress/kendo-angular-navigation';
import { bookIcon, plusIcon, searchIcon, starIcon } from '@progress/kendo-svg-icons';
import { RecipeService } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    RouterLink,
    KENDO_NAVIGATION,
    KENDO_BUTTONS,
    KENDO_ICONS,
    KENDO_INPUTS,
    KENDO_LABELS,
    KENDO_LAYOUT,
  ],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  private readonly recipeService = inject(RecipeService);

  protected readonly appTitle = signal('My Recipe Box');
  protected readonly searchTerm = signal('');

  protected readonly icons = {
    book: bookIcon,
    plus: plusIcon,
    search: searchIcon,
    star: starIcon,
  };

  protected readonly filteredRecipes = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const recipes = this.recipeService.allRecipes();
    if (!term) {
      return recipes;
    }
    return recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(term) ||
        recipe.description.toLowerCase().includes(term),
    );
  });
}
