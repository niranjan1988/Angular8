import { Effect, Actions, ofType } from '@ngrx/effects';
import * as RecipeActions from './recipe.action';
import { switchMap, tap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import { environment } from 'src/environments/environment';

export class RecipeEffects {
  webURL = environment.URL;
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPE),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.webURL + 'recipes.json');
    }),
    map((recipes: Recipe[]) => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) { }
}
