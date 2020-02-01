import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppState from '../../app/app.store';
import * as AuthActions from './../Auth/store/auth.actions';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  logoutTimer: any;
  constructor(private store: Store<AppState.IAppState>) { }

  setLogoutTimer(expirationtime: number) {
    this.logoutTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
    }, expirationtime);
  }

  clearLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }
}
