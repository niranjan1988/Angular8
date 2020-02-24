import { ShoppingListState, ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { AuthState, authReducer } from './Auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { recipeReducer } from './recipes/store/recipe.reducer';
import * as fromRecipes from './recipes/store/recipe.reducer';

export interface IAppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipe: fromRecipes.State;
}

export const AppReducer: ActionReducerMap<IAppState> = {
  shoppingList: ShoppingListReducer,
  auth: authReducer,
  recipe: recipeReducer
};
