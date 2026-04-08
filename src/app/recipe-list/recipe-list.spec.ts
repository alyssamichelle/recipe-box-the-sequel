import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecipeList } from './recipe-list';
import { routes } from '../app.routes';

describe('RecipeList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeList],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecipeList);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
