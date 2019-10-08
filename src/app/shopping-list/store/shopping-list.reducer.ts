import { Ingredient } from '../../shared/ingredient.model';
import * as shoppingListActions from './shopping-list.actions';

export interface ShoppingList {
    ingredients: Ingredient[];
    editingShoppingItem: Ingredient;
    editItemIndex: number;
}

const initialState: ShoppingList = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 7)
    ],
    editingShoppingItem : null,
    editItemIndex : -1
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
            const ingredient = state.ingredients[action.payload.index];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const updatedIngredients = { ...state.ingredients };
            updatedIngredients[action.payload.index] = updatedIngredient;
            return {
                ...state,
                ...updatedIngredients
            };
        case shoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((item, itemiIndex) => {
                    return itemiIndex !== action.payload;
                })
            };

        default:
            return { ...state };
    }
}