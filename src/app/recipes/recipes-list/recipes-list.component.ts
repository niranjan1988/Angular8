import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppState from './../../app.store'
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  subscription: Subscription;

  recipes: Recipe[] = [];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<AppState.IAppState>) { }

  ngOnInit() {
    this.subscription = this.store
      .select('recipe')
      .pipe(map(recipesState => recipesState.recipes))
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onNewRecipeAdd() {
    this.router.navigate(['new'], { relativeTo: this.route, });
  }

}
