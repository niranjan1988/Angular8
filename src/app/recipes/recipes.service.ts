import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shoppingList.service';

@Injectable()
export class RecipeService {
    selectedRecipe = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is simply a test',
            'https://bit.ly/2Korf5J',
            [new Ingredient('bread', 20),
            new Ingredient('Meat', 15)
        ]),
        new Recipe('Another Test Recipe',
            'This is simply a test',
            'https://bit.ly/2YRGJmJ',
            [new Ingredient('chicken', 2),
            new Ingredient('Prawn', 25)
        ]),
        new Recipe(
            'Tasty Schnitzel',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [new Ingredient('fish', 5),
            new Ingredient('Meat', 1)
        ]),
        new Recipe('Big Fat Burger',
            'What else you need to say?',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [new Ingredient('Prawn', 20),
            new Ingredient('fish', 10)
        ])
    ];

    constructor(private slService: ShoppingService) {}

    addRecipe(name: string, desc: string, imageURl: string, ingredients: Ingredient[]) {
        this.recipes.push(new Recipe(name, desc, imageURl, ingredients));
    }

    getRecipe() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
       this.slService.addIngredients(ingredients);
    }

}