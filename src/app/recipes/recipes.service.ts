import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as AppState from '../../app/app.store';

@Injectable()
export class RecipeService {
    selectedRecipe = new Subject<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [];
    //  = [
    //     new Recipe(
    //         'A Test Recipe',
    //         'This is simply a test',
    //         'https://joyfoodsunshine.com/wp-content/uploads/2016/09/easy-pizza-casserole-recipe-4-500x500.jpg',
    //         [new Ingredient('bread', 20),
    //         new Ingredient('Meat', 15)
    //         ]),
    //     new Recipe('Another Test Recipe',
    //         'This is simply a test',
    //         'https://img.bestrecipes.com.au/LRV-X-2Y/w643-h428-cfill-q90/br/2018/04/delicious-spotty-dotty-cookies-recipe-521147-1.jpg',
    //         [new Ingredient('chicken', 2),
    //         new Ingredient('Prawn', 25)
    //         ]),
    //     new Recipe(
    //         'Tasty Schnitzel',
    //         'A super-tasty Schnitzel - just awesome!',
    //         'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
    //         [new Ingredient('fish', 5),
    //         new Ingredient('Meat', 1)
    //         ]),
    //     new Recipe('Big Fat Burger',
    //         'What else you need to say?',
    //         'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
    //         [new Ingredient('Prawn', 20),
    //         new Ingredient('fish', 10)
    //         ])
    // ];

    constructor(private store: Store<AppState.IAppState>) { }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes);
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
    }

    getRecipeByID(index: number) {
        return this.recipes[index];
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes);
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes);
    }
}
