import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as shoppingListActions from './../store/shopping-list.actions';
import * as AppState from '../../../app/app.store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) shoppingEditForm: NgForm;
  editItem: Ingredient;
  editMode = false;
  editIndex: number;
  shoppingSubscription: Subscription;

  constructor(private store: Store<AppState.IAppState>) { }


  ngOnInit() {
    this.shoppingSubscription = this.store.select('shoppingList').subscribe(shoppingState => {
      if (shoppingState.editItemIndex > -1) {
        this.editMode = true;
        this.editItem = shoppingState.editingShoppingItem;
        this.editIndex = shoppingState.editItemIndex;
        this.shoppingEditForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmitForm(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    console.log(this.editMode);

    if (this.editMode) {
      this.store.dispatch(new shoppingListActions.UpdateIngredients(ingredient));
      this.editMode = false;
      this.resetForm();
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(ingredient));
      this.resetForm();
    }

  }

  resetForm() {
    this.shoppingEditForm.reset();
    this.isChangesSaved();
  }

  deleteIngredient(index: number) {
    this.store.dispatch(new shoppingListActions.DeleteIngredients(index));
    this.editMode = false;
    this.resetForm();
  }

  isChangesSaved() {
    // if (this.shoppingEditForm.value['name'] || this.shoppingEditForm.value['amount']) {
    //   this.shoppingService.isChangesSaved.next(false);
    // } else {
    //   this.shoppingService.isChangesSaved.next(true);
    // }
  }

  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
  }

}
