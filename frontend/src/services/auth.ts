import api from './api';
import { User } from '../types';

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginData) {
    const response = await api.post<{ user: User; token: string }>('/auth/login', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post<{ user: User; token: string }>('/auth/register', data);
    localStorage.setItem('token', response.data.token);
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },
};