import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTournaments } from '../hooks/useTournaments';
import { useNavigate } from 'react-router-dom';

const tournamentSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  game: z.string().min(1, 'Le jeu est requis'),
  format: z.enum(['SOLO', 'DUO', 'TEAM']),
  date: z.string().min(1, 'La date est requise'),
  maxParticipants: z.number().min(2, 'Minimum 2 participants').max(128, 'Maximum 128 participants'),
});

type TournamentFormData = z.infer<typeof tournamentSchema>;

export function CreateTournament() {
  const { createTournament } = useTournaments();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<TournamentFormData>({
    resolver: zodResolver(tournamentSchema),
    defaultValues: {
      maxParticipants: 16,
    },
  });

  const onSubmit = async (data: TournamentFormData) => {
    const success = await createTournament(data);
    if (success) {
      navigate('/tournaments');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-gaming font-bold mb-8">Créer un Tournoi</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-game-foreground p-6 rounded-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Nom du tournoi
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="input-field w-full"
            placeholder="Ex: Tournoi League of Legends Summer Split"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="game" className="block text-sm font-medium mb-2">
            Jeu
          </label>
          <input
            type="text"
            id="game"
            {...register('game')}
            className="input-field w-full"
            placeholder="Ex: League of Legends"
          />
          {errors.game && (
            <p className="mt-1 text-sm text-red-400">{errors.game.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="format" className="block text-sm font-medium mb-2">
            Format
          </label>
          <select 
            id="format" 
            {...register('format')}
            className="input-field w-full"
          >
            <option value="SOLO">Solo</option>
            <option value="DUO">Duo</option>
            <option value="TEAM">Équipe</option>
          </select>
          {errors.format && (
            <p className="mt-1 text-sm text-red-400">{errors.format.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-2">
            Date du tournoi
          </label>
          <input
            type="datetime-local"
            id="date"
            {...register('date')}
            className="input-field w-full"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-400">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="maxParticipants" className="block text-sm font-medium mb-2">
            Nombre maximum de participants
          </label>
          <input
            type="number"
            id="maxParticipants"
            {...register('maxParticipants', { valueAsNumber: true })}
            className="input-field w-full"
            min="2"
            step="2"
          />
          {errors.maxParticipants && (
            <p className="mt-1 text-sm text-red-400">{errors.maxParticipants.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Créer le tournoi
        </button>
      </form>
    </div>
  );
}