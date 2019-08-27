import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
  providers : [RecipeService]
})
export class RecipesListComponent implements OnInit {
  @Output() recipeForDetail = new EventEmitter<Recipe>();
  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
  }

  sendRecipeForDetail(recipe: Recipe) {
    this.recipeService.selectedRecipe = recipe;
  }

}
