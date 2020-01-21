import { Ingredient } from '../../shared/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';

export interface ShoppingListState {
  ingredients: Ingredient[];
  editingShoppingItem: Ingredient;
  editItemIndex: number;
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 7)
  ],
  editingShoppingItem: null,
  editItemIndex: -1
};

export function ShoppingListReducer(state = initialState, action: shoppingListActions.shoppingListActionsType) {
  switch (action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case shoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case shoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editItemIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };

      const updatedIngredients = [...state.ingredients ];
      updatedIngredients[state.editItemIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editingShoppingItem: null,
        editItemIndex: -1
      };
    case shoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((item, itemiIndex) => {
          return itemiIndex !== state.editItemIndex;
        }),
        editingShoppingItem: null,
        editItemIndex: -1
      };
    case shoppingListActions.START_EDIT:
      const ingredientToEdit = state.ingredients[action.payload];
      return {
        ...state,
        ingredients: state.ingredients,
        editingShoppingItem: { ...ingredientToEdit },
        editItemIndex: action.payload
      };
    case shoppingListActions.STOP_EDIT:
      return {
        ...state, ingredients: state.ingredients,
        editingShoppingItem: null,
        editItemIndex: -1
      };

    default:
      return { ...state };
  }
}
