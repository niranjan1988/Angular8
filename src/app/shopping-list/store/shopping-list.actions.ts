import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { type } from 'os';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;
    payload: Ingredient;
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;
    payload: Ingredient[];
}


export type shoppingListActionsType = AddIngredient | AddIngredients;
