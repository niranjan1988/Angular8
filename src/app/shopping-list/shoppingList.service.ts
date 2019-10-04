import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingService {
    updatedIngredients = new Subject<Ingredient[]>();
    ingredientToEdit = new Subject<number>();
    isChangesSaved = new Subject<boolean>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 7)
    ];

   


    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.updatedIngredients.next(this.ingredients.slice());
    }

    getIngredient(index) {
        return this.ingredients[index];
    }

   

    
}