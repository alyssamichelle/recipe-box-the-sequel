import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecipeForm } from './recipe-form';
import { routes } from '../app.routes';

describe('RecipeForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeForm],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecipeForm);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
