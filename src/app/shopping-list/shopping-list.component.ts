import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shoppingList.service';
import { CanDeactivateGuard } from './shopping-edit/can-deactivate-guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, CanDeactivateGuard {
  ingredients: Ingredient[] = [];
  isChanesSaved = true;
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getShoppingList();

    this.shoppingService.updatedIngredients.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.shoppingService.isChangesSaved.subscribe((issaved: boolean) => {
      this.isChanesSaved = issaved;
    });

  }

  addIngredient(ingredient: Ingredient) {
    this.shoppingService.addIngredient(ingredient);
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
