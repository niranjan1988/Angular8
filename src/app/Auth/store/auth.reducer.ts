import { Action } from '@ngrx/store';
import { User } from '../user.model';
import * as fromAuthActions from './auth.actions';

export interface AuthState {
  user: User;
}
const initialState: AuthState = {
  user: null
};

export function authReducer(
  state = initialState,
  action: fromAuthActions.AuthActions
) {
  switch (action.type) {
    case fromAuthActions.LOGIN:
      const user = new User(action.payload.email, action.payload.id, action.payload.token, action.payload.expirationDate);
      return {
        ...state,
        user
      };
    case fromAuthActions.LOGOUT:
      return {
        ...state,
        user: null

      };


    default:
      break;
  }
}
