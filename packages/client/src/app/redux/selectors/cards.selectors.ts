import { createSelector } from '@ngrx/store';
import { AppState, CardsState } from '../state.models';

const selectCards = (state: AppState) => state.cards;

const selectYoutubeCards = createSelector(
  selectCards,
  (state: CardsState) => state.youtubeCards,
);

const selectCustomCards = createSelector(
  selectCards,
  (state: CardsState) => state.customCards,
);

export const selectorCards = {
  youtube: selectYoutubeCards,
  custom: selectCustomCards,
};
