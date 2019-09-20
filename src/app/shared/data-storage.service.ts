import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipes.service';
import { environment } from '../../environments/environment';
import { Recipe } from '../recipes/recipe.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    webURL = environment.URL;
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put(this.webURL + 'recipes.json', recipes);
    }

    fetchRecipes() {
        return this.http.get(this.webURL + 'recipes.json').subscribe((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        });
    }
}