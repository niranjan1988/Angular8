import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';


// export const ADD_RECIPE = 'ADD_RECIPE';
// export const ADD_RECIPES = 'ADD_RECIPES';
export const SET_RECIPE = 'SET_RECIPE';
export const SET_RECIPES = 'SET_RECIPES';

// export class AddRFecipe implements Action {
//   readonly type = ADD_RECIPE;
//   constructor(private recipe: Recipe) { }
// }

// export class AddRFecipes implements Action {
//   readonly type = ADD_RECIPES;
//   constructor(private recipes: Recipe[]) { }
// }

export class SetRFecipe implements Action {
  readonly type = SET_RECIPE;
  constructor(public payload: Recipe) { }
}

export class SetRFecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: Recipe[]) { }
}

export type RecipeActions = SetRFecipe
  | SetRFecipes;

