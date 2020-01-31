import { Actions, ofType, Effect } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import * as fromAuthActions from './auth.actions';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';

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
        }).pipe(map(resData => {
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
          return new AuthActions.Login({
            email: resData.email,
            id: resData.localId,
            token: resData.idToken,
            expirationDate
          });
        }));
      catchError(error => of());
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
