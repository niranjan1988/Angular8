import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() recipeForDetail = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit() {
  }

  showDetail(recipe) {
    this.recipeForDetail.emit(recipe);
  }
}
