import { Component, OnInit } from '@angular/core';
import * as AppState from './app.store';
import { Store } from '@ngrx/store';
import * as AuthActions from './Auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-first-angular8-app';
  constructor(private  store: Store<AppState.IAppState>) { }
  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
  }
}
