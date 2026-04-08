import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RecipeService } from '../recipe';

@Component({
  selector: 'app-recipe-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, RouterLink, MatButtonModule, MatToolbarModule],
  templateUrl: './recipe-list.html',
  styleUrl: './recipe-list.css',
})
export class RecipeList {
  private readonly recipeService = inject(RecipeService);

  protected readonly appTitle = signal('My Recipe Box');
  protected readonly searchTerm = signal('');

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
