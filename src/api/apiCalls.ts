import axios from 'axios';
import { SignUpCredentials } from './apiCalls.types';
import { API_URL } from './apiUrl';

export const signIn = (body: SignUpCredentials) => {
  return axios.post(`${API_URL}/signin`, body);
};