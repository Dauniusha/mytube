import { createReducer, on } from '@ngrx/store';
import { cardsActionsMap } from '../../actions/cards.actions';
import { CardsState, initialCardsState } from '../../state.models';

export const cardsReducer = createReducer(
  initialCardsState,
  on(cardsActionsMap.loadYoutube, (state: CardsState, { cards }) => ({ ...state, youtubeCards: cards })),
  on(cardsActionsMap.loadCustom, (state: CardsState, { card }) => ({ ...state, customCards: [...state.customCards, card] })),
);
