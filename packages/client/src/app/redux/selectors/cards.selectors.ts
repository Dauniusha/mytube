import { createSelector } from '@ngrx/store';
import { IAppState, ICardsState } from '../state.models';

const selectCards = (state: IAppState) => state.cards;

const selectYoutubeCards = createSelector(
  selectCards,
  (state: ICardsState) => state.youtubeCards,
);

const selectCustomCards = createSelector(
  selectCards,
  (state: ICardsState) => state.customCards,
);

export const selectorCards = {
  youtube: selectYoutubeCards,
  custom: selectCustomCards,
};
