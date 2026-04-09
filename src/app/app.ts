import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Recipe Box';
  showMessage = false;

  recipes = [
    { id: 1, name: 'Tacos', isFavorite: false },
    { id: 2, name: 'Pasta', isFavorite: false },
    { id: 3, name: 'Cookies', isFavorite: true }
  ];

  addRecipe() {
    this.recipes.push({
      id: Date.now(),
      name: 'New Recipe',
      isFavorite: false
    });
  }

  showFavorites = false;

  toggleFavorites() {
    this.showFavorites = !this.showFavorites;
  }
}
