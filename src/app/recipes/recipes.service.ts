import { Recipe } from './recipe';
import { EventEmitter } from '@angular/core';

export class RecipeService {
    selectedRecipe =new EventEmitter<Recipe>();

    private recipes: Recipe[] = [new Recipe('A Test Recipe', 'This is simply a test', 'https://bit.ly/2Korf5J'),
    new Recipe('Another Test Recipe', 'This is simply a test', 'https://bit.ly/2YRGJmJ')];

    addRecipe(name: string, desc: string, imageURl: string) {
        this.recipes.push(new Recipe(name, desc, imageURl));
    }

    getRecipe() {
        return this.recipes.slice();
    }

}