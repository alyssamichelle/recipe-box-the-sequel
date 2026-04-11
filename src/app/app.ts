import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = 'Alyssa\'s Recipe Box';
  showMessage = true;


  protected readonly recipes = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'A classic Italian pasta dish.',
      ingredients: [
        { name: 'Spaghetti', quantity: 200, unit: 'g' },
      ],
    },
    {
      id: 2,
      name: 'Caprese Salad',
      description: 'A simple Italian salad.',
      ingredients: [
        { name: 'Tomatoes', quantity: 2, unit: 'each' },
      ],
    },
  ];
}
