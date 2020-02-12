import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Recipe } from '../recipe.model';
import * as recipesActions from '../store/recipe.action';
import * as Appstate from './../../app.store';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  id: number;
  recipe: Recipe;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<Appstate.IAppState>
    ) {
    this.route.params.pipe(
      map(params => {
        return +params.id;
      }),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipe');
      }),
      map(recipeState => {
        return recipeState.recipes.find(
          (recipe, index) => {
            return index === this.id;
          });
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  ngOnInit() { }

  addToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
  }



  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.store.dispatch(new recipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}

