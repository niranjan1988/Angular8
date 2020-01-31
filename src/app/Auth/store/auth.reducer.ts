import { User } from '../user.model';
import * as fromAuthActions from './auth.actions';

export interface AuthState {
  user: User;
  loading: boolean;
  authError: string;
}
const initialState: AuthState = {
  user: null,
  loading: false,
  authError: null
};

export function authReducer(
  state = initialState,
  action: fromAuthActions.AuthActions
) {
  switch (action.type) {

    case fromAuthActions.LOGIN:
      const user = new User(action.payload.email, action.payload.userId, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user,
        loading: false
      };

    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };

    case fromAuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        loading: true
      };

    case fromAuthActions.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        authError: action.payload
      };

    default:
      return { ...state };
  }
}
