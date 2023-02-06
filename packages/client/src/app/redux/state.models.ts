import { ICardData } from 'src/app/youtube/models/card-data-interface';
import { ICustomCardData } from 'src/app/core/models/custom-card/custom-card-data';

export interface ICardsState {
  youtubeCards: ICardData[];
  customCards: ICustomCardData[];
}

export const initialCardsState: ICardsState = {
  youtubeCards: [],
  customCards: [],
};

export interface IAppState {
  cards: ICardsState;
}

export const initialAppState: IAppState = {
  cards: initialCardsState,
};
