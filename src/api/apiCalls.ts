import axios from 'axios';
import storage from '../storage/storage';
import {
  SignInBody,
  SignInDTO,
  UserAggregatedWords,
  UsersBody,
  UsersDTO,
  UserSettingsBody,
  UserSettingsDTO,
  UserStatisticsBody,
  UserStatisticsDTO,
  UserWordsBody,
  UserWordsDTO,
  WordDTO,
} from './apiCalls.types';
import { API_URL } from './apiUrl';
import { withAsync } from './helpers/withAsync';

axios.interceptors.request.use((request) => {
  const auth = storage.getItem<SignInDTO>('auth');
  if (auth?.token && request.headers) {
    request.headers['Authorization'] = 'Bearer ' + auth.token;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status == 401) {
      storage.clear();
      // refresh the page for them
      location.reload();
      return Promise.reject({ message: 'Please re-authenticate.' });
    }
    return Promise.reject(error);
  }
);

//sign in
export const signIn = (body: SignInBody) => {
  return axios.post<SignInDTO>(`${API_URL}/signin`, body);
};

//words
export const getWords = (group?: number, page?: number) => {
  return axios.get<Array<WordDTO>>(`${API_URL}/words`, {
    params: {
      group,
      page,
    },
  });
};

export const getWordById = (id: string) => {
  return axios.get<WordDTO>(`${API_URL}/words/${id}`);
};

//users
export const getUserById = (id: string) => {
  return axios.get<UsersDTO>(`${API_URL}/users/${id}`);
};

export const createUser = (body: UsersBody) => {
  return axios.post<UsersDTO>(`${API_URL}/users`, body);
};

export const updateUser = (id: string, body: Omit<UsersBody, 'name'>) => {
  return axios.put<UsersDTO>(`${API_URL}/users/${id}`, body);
};

export const deleteUser = (id: string) => {
  return axios.delete(`${API_URL}/users/${id}`);
};

//users-words
export const getUserWords = (id: string) => {
  return axios.get<Array<UserWordsDTO>>(`${API_URL}/users/${id}/words`);
};

export const createUserWord = (id: string, wordId: string, body: UserWordsBody) => {
  return axios.post<UserWordsDTO>(`${API_URL}/users/${id}/words/${wordId}`, body);
};

export const getUserWordById = (id: string, wordId: string) => {
  return axios.get<UserWordsDTO>(`${API_URL}/users/${id}/words/${wordId}`);
};

export const updateUserWord = (id: string, wordId: string, body: UserWordsBody) => {
  return axios.put<UserWordsDTO>(`${API_URL}/users/${id}/words/${wordId}`, body);
};

export const deleteUserWord = (id: string, wordId: string) => {
  return axios.delete(`${API_URL}/users/${id}/words/${wordId}`);
};

//users-aggregatedWords   TODO
export const getUserAggregatedWords = (
  id: string,
  group?: number,
  page?: number,
  wordsPerPage?: number,
  filter?: string
) => {
  return axios.get<UserAggregatedWords>(`${API_URL}/users/${id}/aggregatedWords`, {
    params: {
      group,
      page,
      wordsPerPage,
      filter,
    },
  });
};

export const getUserAggregatedWordsById = (id: string, wordId: string) => {
  return axios.get<UserWordsDTO>(`${API_URL}/users/${id}/aggregatedWords/${wordId}`);
};

//users-statistics
export const getUserStatistics = (id: string) => {
  return axios.get<UserStatisticsDTO>(`${API_URL}/users/${id}/statistics`);
};
export const updateUserStatistics = (id: string, body: UserStatisticsBody) => {
  return axios.put<UserStatisticsDTO>(`${API_URL}/users/${id}/statistics`, body);
};

//user-settings
export const getUserSettings = (id: string) => {
  return axios.get<UserSettingsDTO>(`${API_URL}/users/${id}/settings`);
};
export const updateUserSettings = (id: string, body: UserSettingsBody) => {
  return axios.put<UserSettingsDTO>(`${API_URL}/users/${id}/settings`, body);
};

export async function addWordStat(
  currentWord: WordDTO,
  isCorrect: boolean,
  gameName: 'sprint' | 'audiocall' | 'savannah' | 'textbook'
) {
  const auth = storage.getItem<SignInDTO>('auth');

  if (auth) {
    const { response, error } = await withAsync(() => getUserWordById(auth.userId, currentWord.id));

    const timeStamp = Date.now();
    if (error) {
      await createUserWord(auth.userId, currentWord.id, {
        difficulty: isCorrect ? 'easy' : 'hard',
        optional: {
          [timeStamp]: {
            game: gameName,
            learned: isCorrect ? true : false,
          },
        },
      });
    } else if (response && response.status == 200) {
      const { data } = response;
      const { id, wordId, ...rest } = data;

      await updateUserWord(auth.userId, currentWord.id, {
        difficulty: isCorrect ? 'easy' : 'hard',
        optional: {
          ...rest.optional,
          [timeStamp]: {
            game: gameName,
            learned: isCorrect ? true : false,
          },
        },
      });
    }
  }
}
