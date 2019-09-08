import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shoppingList.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f', { static: false }) shoppingEditForm: NgForm;
  editItem: Ingredient;
  editMode = false;
  editIndex: number;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.shoppingService.ingredientToEdit.subscribe((index: number) => {
      this.editItem = this.shoppingService.getIngredient(index);
      this.editMode = true;
      this.editIndex = index;
      this.shoppingEditForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    })
  }

  onAddIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.UpdateExistingIngredient(this.editIndex, ingredient);
      this.editMode = false;
      this.shoppingEditForm.reset();
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
  }

  resetForm() {
    this.shoppingEditForm.reset();
  }

  deleteIngredient(index: number) {
    this.shoppingService.deleteIngredient(index);
    this.editMode = false;
    this.shoppingEditForm.reset();
  }

}
