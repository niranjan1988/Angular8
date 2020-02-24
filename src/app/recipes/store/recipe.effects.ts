import { HttpClient } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Recipe } from '../recipe.model';
import * as AppState from './../../app.store';
import * as RecipeActions from './recipe.action';

export class RecipeEffects {
  webURL = environment.URL;

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPE),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.webURL + 'recipes.json');
    }),
    map((recipes: Recipe[]) => {
      if (recipes.length > 0) {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      } else {
        return [];
      }
    }),
    map(recipes => {
      return new RecipeActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipeState]) => {
      return this.http.put(this.webURL + 'recipes.json', recipeState.recipes);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState.IAppState>) { }
}
