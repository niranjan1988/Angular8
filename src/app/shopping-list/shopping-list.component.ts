import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shoppingList.service';
import { CanDeactivateGuard } from './shopping-edit/can-deactivate-guard';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from './../shopping-list/store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, CanDeactivateGuard {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  isChanesSaved = true;
  constructor(private shoppingService: ShoppingService,
    private store: Store<{shoppingList:{ingredients:Ingredient[]}}>) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  
    this.shoppingService.isChangesSaved.subscribe((issaved: boolean) => {
      this.isChanesSaved = issaved;
    });
  }

  addIngredient(ingredient: Ingredient) {
    this.store.dispatch(new shoppingListActions.AddIngredient(ingredient));
  }

  editItem(index: number) {
    this.shoppingService.ingredientToEdit.next(index);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isChanesSaved) {
      const conf = confirm('Do You want to save data on current page now?');
      return conf ? false : true;
    } else {
      return true;
    }
  }
}
