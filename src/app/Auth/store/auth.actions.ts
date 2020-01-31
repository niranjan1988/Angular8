import { Action } from '@ngrx/store';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT = 'LOGOUT';
export const SIGNUP_START = 'SIGNUP_START';
export const SIGNUP = 'SIGNUP';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date }) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload: string) { }
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string, password: string }) { }
}

export class Signup implements Action {
  readonly type = SIGNUP;

  constructor(public payload: { email: string, userId: string, token: string, expirationDate: Date }) { }
}

export class SignupFailed implements Action {
  readonly type = SIGNUP_FAILED;
  constructor(public payload: string) { }
}

export type AuthActions = Login | Logout | LoginStart | LoginFailed | SignupStart | Signup | SignupFailed;
