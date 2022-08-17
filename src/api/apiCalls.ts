import axios from 'axios';
import { SignInBody } from './apiCalls.types';
import { API_URL } from './apiUrl';

export const signIn = (body: SignInBody) => {
  return axios.post(`${API_URL}/signin`, body);
};
