import { createReducer, on } from '@ngrx/store';
import { cardsActionsMap } from '../../actions/cards.actions';
import { ICardsState, initialCardsState } from '../../state.models';

export const cardsReducer = createReducer(
  initialCardsState,
  on(cardsActionsMap.loadYoutube, (state: ICardsState, { cards }) => ({ ...state, youtubeCards: cards })),
  on(cardsActionsMap.loadCustom, (state: ICardsState, { card }) => ({ ...state, customCards: [...state.customCards, card] })),
);
