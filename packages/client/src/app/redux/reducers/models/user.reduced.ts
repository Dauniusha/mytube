import { createReducer, on } from '@ngrx/store';
import { userActionsMap } from '../../actions/user.actions';
import { initialUserState, UserState } from '../../state.models';

export const userReducer = createReducer(
  initialUserState,
  on(userActionsMap.authenticate, (state: UserState, { isAuthenticated }) => ({ ...state, isAuthenticated })),
);
