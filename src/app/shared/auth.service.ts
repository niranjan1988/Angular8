import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface authResponse {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
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
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbQXzgprcrO0wMrAmU-C1cKIgM3dLdggo', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
  }

  signIn(email: string, password: string) {
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbQXzgprcrO0wMrAmU-C1cKIgM3dLdggo', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError))
  }

  handleError(errResponse) {
    let errMessage = "An unexpected error occured";
    if (!errResponse.error || !errResponse.error.error) {
      return throwError(errMessage);
    }
    switch (errResponse.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = "This email exists already";
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = "This email doesnt exist.";
        break;
      default:
        errMessage = "Unknown error occured";
    }
    return throwError(errMessage);
  }
}
