//#region Sign In
export type SignInBody = {
  email: string;
  password: string;
};

export type SignInDTO = {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
};
//#endregion

//#region Word
export type WordDTO = {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
};

//#endregion

//#region Users

export type UsersBody = {
  name: string;
  email: string;
  password: string;
};

export type UsersDTO = {
  id: string;
  name: string;
  email: string;
};
//#endregion

//#region UserWords
export type UserWordsBody = {
  difficulty: string;
};

export type UserWordsDTO = {
  id: string;
  difficulty: string;
  wordId: string;
};
//#endregion

//#region UserStatistics
export type UserStatisticsBody = {
  learnedWords: number;
};

export type UserStatisticsDTO = {
  id: string;
  learnedWords: number;
};
//#endregion

//#region UserSettings
export type UserSettingsBody = {
  wordsPerDay: number;
};

export type UserSettingsDTO = {
  id: string;
  wordsPerDay: number;
};
//#endregion

//#region AggregatedWords
export type UserAggregatedWord = {
  _id: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
  userWord?: {
    difficulty: 'easy' | 'hard';
  };
};
export type UserAggregatedWords = [
  {
    paginatedResults: Array<UserAggregatedWord>;
    totalCount: [
      {
        count: number;
      }
    ];
  }
];
//#endregion
