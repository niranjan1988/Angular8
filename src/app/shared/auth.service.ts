import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { User } from '../Auth/user.model';

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
  user = new Subject<User>();

  constructor(private http: HttpClient) { }
  isLoggedIn = false;

  isAuthenticated() {
    const promise = new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(this.isLoggedIn);
      }, 10);
    });
    return promise;
  }

  logIn() {
    this.isLoggedIn = true;
  }

  logOff() {
    this.isLoggedIn = false;
  }

  signup(email: string, password: string) {
    return this.http.post<authResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbQXzgprcrO0wMrAmU-C1cKIgM3dLdggo',
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, expirationDate);
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
        const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
        this.handleAuthentication(resData.email, resData.localId, resData.idToken, expirationDate);
      }));
  }

  handleAuthentication(email: string, id: string, token: string, expirationDate: Date) {
    const user = new User(email, id, token, expirationDate);
    this.user.next(user);
  }

  handleError(errResponse) {
    let errMessage = 'An unexpected error occured';
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errMessage);
    }
    switch (errResponse.error.message) {
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
