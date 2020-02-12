import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import * as recipesActions from '../store/recipe.action';
import * as Appstate from './../../app.store';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;

  recipeForm: FormGroup;
  editMode: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private store: Store<Appstate.IAppState>) { }

  ngOnInit() {

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
      this.editMode = this.id != null && !isNaN(this.id);
      this.onInit(recipe);
    });
  }

  private onInit(recipeToEdit: Recipe) {

    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      recipeName = recipeToEdit.name;
      recipeImageUrl = recipeToEdit.imageUrl;
      recipeDescription = recipeToEdit.description;
      if (recipeToEdit.ingredients) {
        for (const ingredient of recipeToEdit.ingredients) {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, [Validators.required]),
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, [Validators.required]),
      imagePath: new FormControl(recipeImageUrl, [Validators.required]),
      description: new FormControl(recipeDescription, [Validators.required]),
      ingredients: this.editMode ? recipeIngredients : recipeIngredients
    });
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl('', [Validators.required]),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
  }

  onSubmit() {
    const newRecipe = new Recipe(this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients
    );

    if (this.editMode) {
      this.store.dispatch(new recipesActions.UpdateRecipes({ index: this.id, newRecipe }));
    } else {
      this.store.dispatch(new recipesActions.AddRecipe(newRecipe));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getIngredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


}
