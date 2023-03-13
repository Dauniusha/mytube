import { createSelector } from '@ngrx/store';
import { AppState, UserState } from '../state.models';

const selectUser = (state: AppState) => state.user;

const selectLoginState = createSelector(
    selectUser,
  (state: UserState) => state.isLoggedIn,
);

export const selectorUser = {
  loginState: selectLoginState,
};
