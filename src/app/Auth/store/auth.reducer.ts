import { User } from '../user.model';
import * as fromAuthActions from './auth.actions';

export interface AuthState {
  user: User;
  loginStart: boolean;
  loginFailed: boolean;
}
const initialState: AuthState = {
  user: null,
  loginStart: false,
  loginFailed: false
};

export function authReducer(
  state = initialState,
  action: fromAuthActions.AuthActions
) {
  switch (action.type) {
    case fromAuthActions.LOGIN_START:
      return {
        ...state,
        loginFailed: false,
        loginStart: true
      };

    case fromAuthActions.LOGIN:
      const user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user
      };

    case fromAuthActions.LOGIN_FAILED:

      return {
        ...state,
        loginStart: false,
        loginFailed: true
      };

    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null

      };

    default:
      return { ...state };
  }
}
