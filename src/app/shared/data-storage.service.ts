import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { environment } from '../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as AppState from './../app.store';
import * as recipesActions from './../recipes/store/recipe.action';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  webURL = environment.URL;
  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private store: Store<AppState.IAppState>) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(this.webURL + 'recipes.json', recipes);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.webURL + 'recipes.json').pipe(
      map((recipes: Recipe[]) => {
        return recipes.map(recipe => {
          return {
            ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }),
      tap(recipes => {
        this.store.dispatch(new recipesActions.SetRFecipes(recipes));
      })
    );
  }
}
