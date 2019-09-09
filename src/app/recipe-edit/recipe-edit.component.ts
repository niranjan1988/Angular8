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
  recipeToEdit: Recipe;
  recipeForm: FormGroup;
  // @ViewChild('recipeForm', { static: true }) recipeForm: NgForm;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
    this.recipeToEdit = this.recipeService.getRecipeByID(this.id);
    this.recipeForm = new FormGroup({
      name : new FormControl(this.recipeToEdit.name),
      imagePath : new FormControl(this.recipeToEdit.imageUrl),
      description : new FormControl(this.recipeToEdit.description)
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
