import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipes.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;

  recipeForm: FormGroup;
  editMode: boolean;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = this.id != null;
    });
    // 

  }

  private onInit() {
    let recipeToEdit: Recipe = null;
    if (this.editMode) {
      recipeToEdit = this.recipeService.getRecipeByID(this.id);
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeToEdit.name),
      imagePath: new FormControl(recipeToEdit.imageUrl),
      description: new FormControl(recipeToEdit.description)
    });
  }
  onDeleteIngredient() {

  }

  onAddIngredient() {

  }

  onSubmit() {

  }

  onCancel() {

  }
}
