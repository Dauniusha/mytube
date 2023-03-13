import { createAction, props } from "@ngrx/store";

enum UserActionTypes {
  Authenticate = '[User] Authenticate',
}

const authenticate = createAction(
  UserActionTypes.Authenticate,
  props<{ isAuthenticated: boolean }>(),
);

export const userActionsMap = {
  authenticate,
};
