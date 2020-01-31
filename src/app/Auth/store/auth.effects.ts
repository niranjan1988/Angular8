import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

export interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(fromAuthActions.LOGIN_START),
    switchMap((authData: fromAuthActions.LoginStart) => {
      return this.http.post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCbQXzgprcrO0wMrAmU-C1cKIgM3dLdggo',
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate
            });
          }),
          catchError(errResponse => {
            let errMessage = 'An unknown error occurred!';
            switch (errResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errMessage = 'This email exists already';
                break;
              case 'EMAIL_NOT_FOUND':
                errMessage = 'This email doesnt exist.';
                break;
              case 'INVALID_PASSWORD':
                errMessage = 'This password is not correct.';
                break;
              default:
                errMessage = 'Unknown error occured';
            }
            return of(new fromAuthActions.LoginFailed(errMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(ofType(fromAuthActions.LOGIN), tap(() => {
    this.router.navigate(['/']);
  }));

  constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

  @Effect()
  signUpStart = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signUpData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbQXzgprcrO0wMrAmU-C1cKIgM3dLdggo',
        {
          email: signUpData.payload.email,
          password: signUpData.payload.password,
          returnSecureToken: true
        }).pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate
            });
          }),
          catchError((errorRes) => {
            let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
              return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist.';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct.';
                break;
            }
            return of(new AuthActions.SignupFailed(errorMessage));
          })
        );
    })
  );
}
