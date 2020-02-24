import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { CanDeactivateGuard } from './shopping-edit/can-deactivate-guard';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as shoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as AppState from '../../app/app.store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy, CanDeactivateGuard {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  isChanesSaved = true;
  constructor(private store: Store<AppState.IAppState>) { }

  ngOnInit() {
   this.ingredients = this.store.select('shoppingList');
  }

  addIngredient(ingredient: Ingredient) {
    this.store.dispatch(new shoppingListActions.AddIngredient(ingredient));
  }

  editItem(index: number) {
    this.store.dispatch(new shoppingListActions.StartEdit(index));
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.isChanesSaved) {
      const conf = confirm('Do You want to save data on current page now?');
      return conf ? false : true;
    } else {
      return true;
    }
  }
  ngOnDestroy(): void {
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
}
