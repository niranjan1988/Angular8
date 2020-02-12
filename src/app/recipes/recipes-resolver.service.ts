import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as AppState from './../app.store';
import { map, take, switchMap } from 'rxjs/operators';
import * as RecipesActions from './../recipes/store/recipe.action';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<AppState.IAppState>,
    private actions$: Actions
  ) { }
  resolve(reoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipe').pipe(
      take(1),
      map(recipeState => recipeState.recipes),
      switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipesActions.FetchRecipe());
          return this.actions$.pipe(
            ofType(RecipesActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }
}
