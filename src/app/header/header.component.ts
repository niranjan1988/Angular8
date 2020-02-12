import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';
import * as AppState from '../../app/app.store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as AuthActions from '../Auth/store/auth.actions';
import * as RecipeActions from './../recipes/store/recipe.action';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  @Output() isRecipe = new EventEmitter<boolean>();

  constructor(private authService: AuthService,
              private dataStorageService: DataStorageService,
              private router: Router,
              private store: Store<AppState.IAppState>) { }

  ngOnInit() {
    this.store.select('auth').pipe(map(authState => authState.user)).subscribe(userInfo => {
      this.isAuthenticated = !!userInfo;
    });
  }

  saveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  fetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchRecipe());
  }

  signoff() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
