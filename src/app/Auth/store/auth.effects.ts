import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { AuthService } from 'src/app/shared/auth.service';

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
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

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
            return this.handleAuthentication(resData);
          }),
          catchError(errResponse => {
            const errMessage = this.handleError(errResponse);
            return of(new fromAuthActions.LoginFailed(errMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(ofType(fromAuthActions.LOGIN), tap(() => {
    this.router.navigate(['/']);
  }));

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
            return this.handleAuthentication(resData);
          }),
          catchError((errResponse) => {
            const errMessage = this.handleError(errResponse);
            return of(new AuthActions.SignupFailed(errMessage));
          })
        );
    })
  );

  @Effect({ dispatch: false })
  logOut = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'DUMMY' };
      }
      const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (user.token) {
        const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expiresIn);
        return new AuthActions.Login({
          email: userData.email,
          userId: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }
      return { type: 'DUMMY' };
    })
  );

  private handleError(errResponse: any) {
    let errMessage = 'An unknown error occurred!';

    const errResMsg = errResponse.error.message
      ? errResponse.error.message
      : errResponse.error.error.message;

    switch (errResMsg) {
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
    return errMessage;
  }

  private handleAuthentication(resData: AuthResponse) {
    this.authService.setLogoutTimer(+resData.expiresIn * 1000);
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expirationDate
    );
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.Login({
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expirationDate
    });
  }
}
