import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipes.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;

  recipeForm: FormGroup;
  editMode: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = this.id != null && !isNaN(this.id);
      this.onInit();
    });


  }

  private onInit() {

    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipeToEdit = this.recipeService.getRecipeByID(this.id);
      recipeName = recipeToEdit.name;
      recipeImageUrl = recipeToEdit.imageUrl;
      recipeDescription = recipeToEdit.description;
      if (recipeToEdit.ingredients) {
        for (const ingredient of recipeToEdit.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, [Validators.required]),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImageUrl, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': this.editMode ? recipeIngredients : recipeIngredients
    });
  }

  onDeleteIngredient(i: number) {
    // (<FormArray>this.recipeForm.get('ingredients')).
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl('', [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }));
  }

  onSubmit() {
    const newRecipe = new Recipe(this.recipeForm.value['name'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['description'],
      this.recipeForm.value('ingredients'));

    if (this.editMode) {
      this.recipeService.addRecipe(newRecipe);
    } else {
      this.recipeService.updateRecipe(this.id, newRecipe);
    }
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getIngredients() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


}
