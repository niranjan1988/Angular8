import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../Auth/user.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AppState from '../../app/app.store';
import * as AuthActions from '../Auth/store/auth.actions';

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
  // user = new BehaviorSubject<User>(null);
  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState.IAppState>) { }

  Signoff() {
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    } else {
      const user = new User(userData.email, userData.userId, userData._token, new Date(userData._tokenExpirationDate));
      if (user.token) {
        this.store.dispatch(
          new AuthActions.Login({
            email: userData.email,
            userId: userData.userId,
            token: userData.token,
            expirationDate: new Date(userData._tokenExpirationDate)
          }));

        const timeLeftToExpire = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(timeLeftToExpire);
      }
    }
  }

  autoLogout(expirationtime: number) {
    this.logoutTimer = setTimeout(() => {
      this.Signoff();
    }, expirationtime);
  }
}
