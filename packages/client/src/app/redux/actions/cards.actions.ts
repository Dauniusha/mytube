import { createAction, props } from '@ngrx/store';
import { ICardData } from 'src/app/youtube/models/card-data-interface';
import { ICustomCardData } from 'src/app/core/models/custom-card/custom-card-data';

enum CardsActionTypes {
  LoadYoutubeCards = '[Youtube cards] Load Cards',
  LoadCustomCards = '[Custom cards] Load Cards',
}

const loadYoutubeCards = createAction(
  CardsActionTypes.LoadYoutubeCards,
  props<{ cards: ICardData[] }>(),
);

const loadCustomCards = createAction(
  CardsActionTypes.LoadCustomCards,
  props<{ card: ICustomCardData }>(),
);

export const cardsActionsMap = {
  loadYoutube: loadYoutubeCards,
  loadCustom: loadCustomCards,
};
