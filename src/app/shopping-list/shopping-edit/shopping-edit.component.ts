import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', { static: false }) name: ElementRef;
  @ViewChild('amountInput', { static: false }) amount: ElementRef;

  @Output() addIngredient = new EventEmitter<{ name: string, amount: number }>();
  constructor() { }

  ngOnInit() {
  }

  onAddIngredient() {
    const name = this.name.nativeElement.value;
    const amount = this.amount.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.addIngredient.emit(ingredient);
  }

}
