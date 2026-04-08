import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecipeDetail } from './recipe-detail';
import { routes } from '../app.routes';

describe('RecipeDetail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeDetail],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(RecipeDetail);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
