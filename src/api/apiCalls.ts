import axios from 'axios';
import storage from '../storage/storage';
import {
  SignInBody,
  SignInDTO,
  UsersBody,
  UsersDTO,
  UserSettingsBody,
  UserSettingsDTO,
  UserStatisticsDTO,
  UserWordsBody,
  UserWordsDTO,
  WordDTO,
} from './apiCalls.types';
import { API_URL } from './apiUrl';

axios.interceptors.request.use((request) => {
  const auth = storage.getItem<SignInDTO>('auth');
  if (auth?.token && request.headers) {
    request.headers['Authorization'] = 'Bearer ' + auth.token;
  }

  return request;
});

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
  wordsPerPage?: number
) => {
  return axios.get<Array<UserWordsDTO>>(`${API_URL}/users/${id}/aggregatedWords`, {
    params: {
      group,
      page,
      wordsPerPage,
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
export const updateUserStatistics = (id: string, body: UserSettingsBody) => {
  return axios.put<UserStatisticsDTO>(`${API_URL}/users/${id}/statistics`, body);
};

//usesr-settings
export const getUserSettings = (id: string) => {
  return axios.get<UserSettingsDTO>(`${API_URL}/users/${id}/settings`);
};
export const updateUserSettings = (id: string, body: UserSettingsBody) => {
  return axios.put<UserSettingsDTO>(`${API_URL}/users/${id}/settings`, body);
};
