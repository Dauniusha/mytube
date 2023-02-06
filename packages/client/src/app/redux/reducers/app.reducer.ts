import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state.models';
import { cardsReducer } from './models/cards.reducer';

export const appReducers: ActionReducerMap<IAppState, any> = {
  cards: cardsReducer,
};
