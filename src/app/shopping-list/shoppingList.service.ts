import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService {
    updatedIngredients = new Subject<Ingredient[]>();
    ingredientToEdit = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 7)
    ];

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.updatedIngredients.next(this.ingredients.slice());
    }

    UpdateExistingIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.updatedIngredients.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updatedIngredients.next(this.ingredients.slice());
    }

    getIngredient(index) {
        return this.ingredients[index];
    }

    getShoppingList() {
        return this.ingredients.slice();
    }

    deleteIngredient(index:number) {
        this.ingredients.splice(index,1);
        this.updatedIngredients.next(this.ingredients.slice());
    }
}