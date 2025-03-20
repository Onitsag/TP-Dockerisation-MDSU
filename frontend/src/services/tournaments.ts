import api from './api';
import { Tournament } from '../types';

export interface CreateTournamentData {
  name: string;
  game: string;
  format: 'SOLO' | 'DUO' | 'TEAM';
  date: string;
  maxParticipants: number;
}

export const tournamentService = {
  async getAll() {
    const response = await api.get<Tournament[]>('/tournaments');
    return response.data;
  },

  async create(data: CreateTournamentData) {
    const response = await api.post<Tournament>('/tournaments', data);
    return response.data;
  },

  async join(tournamentId: string) {
    const response = await api.post<Tournament>(`/tournaments/${tournamentId}/join`);
    return response.data;
  },

  async leave(tournamentId: string) {
    const response = await api.post<Tournament>(`/tournaments/${tournamentId}/leave`);
    return response.data;
  },
};