import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [new Recipe('Burger', 'Burger Desc', 'https://bit.ly/2Korf5J'),
                       new Recipe('Burger', 'Burger Desc', 'https://bit.ly/2YRGJmJ')];
  constructor() { }

  ngOnInit() {
  }

}
