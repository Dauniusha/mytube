import { ICardData } from 'src/app/youtube/models/card-data-interface';
import { ICustomCardData } from 'src/app/core/models/custom-card/custom-card-data';

export interface CardsState {
  youtubeCards: ICardData[];
  customCards: ICustomCardData[];
}

export const initialCardsState: CardsState = {
  youtubeCards: [],
  customCards: [],
};

export interface UserState {
  isLoggedIn: boolean;
}

export const initialUserState: UserState = {
  isLoggedIn: false,
};

export interface AppState {
  cards: CardsState;
  user: UserState;
}

export const initialAppState: AppState = {
  cards: initialCardsState,
  user: initialUserState,
};
