import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../Auth/user.model';
import { Router } from '@angular/router';

export interface authResponse {
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
  user = new BehaviorSubject<User>(null);
  logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  Signoff() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if(this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = null;
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    } else {
      const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (user.token) {
        this.user.next(user);
        const timeLeftToExpire = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.autoLogout(timeLeftToExpire );
      }
    }
  }

  autoLogout(expirationtime: number) {
    this.logoutTimer = setTimeout(() => {
      this.Signoff();
    }, expirationtime);
  }

  signup(email: string, password: string) {
    return this.http.post<authResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbQXzgprcrO0wMrAmU-C1cKIgM3dLdggo',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  signIn(email: string, password: string) {
    return this.http.post<authResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbQXzgprcrO0wMrAmU-C1cKIgM3dLdggo',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
      }));
  }

  handleAuthentication(email: string, id: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(expiresIn * 1000);
  }

  handleError(errResponse) {
    let errMessage = 'An unexpected error occured';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errMessage);
    }
    switch (errResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'This email doesnt exist.';
        break;
      default:
        errMessage = 'Unknown error occured';
    }
    return throwError(errMessage);
  }
}
