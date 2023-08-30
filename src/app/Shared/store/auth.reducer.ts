import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure } from './auth.action';
import { User } from './auth.model';

export interface AuthState {
  loggedIn: boolean;
  user: User | any;
  error: string | null;
}

const initialState: AuthState = {
  loggedIn: false,
  user: null,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    loggedIn: true,
    user,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    loggedIn: false,
    error,
  }))
);

export function authReducer(state: AuthState | undefined, action: any) {
  return _authReducer(state, action);
}
