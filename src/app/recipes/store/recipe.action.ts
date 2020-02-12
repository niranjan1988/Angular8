import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';


export const FETCH_RECIPE = 'FETCH_RECIPE';
// export const ADD_RECIPES = 'ADD_RECIPES';
export const SET_RECIPE = 'SET_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';

export class FetchRecipe implements Action {
  readonly type = FETCH_RECIPE;
}

// export class AddRFecipes implements Action {
//   readonly type = ADD_RECIPES;
//   constructor(private recipes: Recipe[]) { }
// }

export class SetRecipe implements Action {
  readonly type = SET_RECIPE;
  constructor(public payload: Recipe) { }
}

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) { }
}

export type RecipeActions = SetRecipe
  | SetRecipes;

