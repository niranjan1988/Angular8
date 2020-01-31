import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor(public payload: { email: string, password: string }) { }
}

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: { email: string, id: string, token: string, expirationDate: Date }) { }
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload: { error: string }) { }
}

export class Logout {
  readonly type = LOGOUT;
}

export type AuthActions = Login | Logout | LoginStart | LoginFailed;
