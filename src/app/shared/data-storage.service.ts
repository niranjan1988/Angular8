import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Recipe } from '../recipes/recipe.model';
import * as AppState from './../app.store';
import * as recipesActions from './../recipes/store/recipe.action';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  webURL = environment.URL;
  constructor(private http: HttpClient,
              private store: Store<AppState.IAppState>) { }

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
        this.store.dispatch(new recipesActions.SetRecipes(recipes));
      })
    );
  }
}
