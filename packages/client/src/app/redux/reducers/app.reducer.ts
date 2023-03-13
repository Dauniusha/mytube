import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state.models';
import { cardsReducer } from './models/cards.reducer';
import { userReducer } from './models/user.reduced';

export const appReducers: ActionReducerMap<AppState, any> = {
  cards: cardsReducer,
  user: userReducer,
};
