import { ShoppingListState, ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { AuthState, authReducer } from './Auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface IAppState {
    shoppingList: ShoppingListState;
    auth: AuthState;
}

export const AppReducer: ActionReducerMap<IAppState> = {
  shoppingList: ShoppingListReducer,
  auth: authReducer
};
