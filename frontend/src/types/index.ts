export type User = {
  id: string;
  username: string;
  email: string;
};

export type Tournament = {
  id: string;
  name: string;
  game: string;
  format: 'SOLO' | 'DUO' | 'TEAM';
  date: string;
  maxParticipants: number;
  currentParticipants: number;
  organizer: User;
  participants: User[];
};