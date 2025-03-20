import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Trophy, Users, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTournaments } from '../hooks/useTournaments';
import { useAuthStore } from '../store/authStore';
import { Tournament } from '../types';

export function Tournaments() {
  const { tournaments, loading, fetchTournaments, joinTournament, leaveTournament } = useTournaments();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    fetchTournaments();
  }, [fetchTournaments]);

  const isParticipating = (tournament: Tournament) => {
    return tournament.participants.some(p => p.id === user?.id);
  };

  const isOrganizer = (tournament: Tournament) => {
    return tournament.organizer.id === user?.id;
  };

  const canJoinTournament = (tournament: Tournament) => {
    return tournament.participants.length < tournament.maxParticipants;
  };

  const handleParticipation = async (tournament: Tournament) => {
    if (isParticipating(tournament)) {
      await leaveTournament(tournament.id);
    } else {
      await joinTournament(tournament.id);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-game-accent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-gaming font-bold">Tournois Disponibles</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="bg-game-foreground rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-6 w-6 text-game-accent" />
              <span className="bg-game-primary/20 text-game-accent px-3 py-1 rounded-full text-sm">
                {tournament.format}
              </span>
            </div>
            <h3 className="text-xl font-gaming font-semibold mb-2">
              {tournament.name}
            </h3>
            <p className="text-gray-400 mb-2">
              {tournament.game}
            </p>
            <p className="text-gray-400 mb-4">
              {format(new Date(tournament.date), "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-gray-400" />
              <span className={`text-gray-400 ${tournament.participants.length >= tournament.maxParticipants ? 'text-red-400' : ''}`}>
                {tournament.participants.length} / {tournament.maxParticipants} participants
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Organisé par <span className="text-game-accent">{tournament.organizer.username}</span>
            </p>
            
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Se connecter pour participer</span>
              </Link>
            ) : !isOrganizer(tournament) && (
              <button
                onClick={() => handleParticipation(tournament)}
                disabled={!canJoinTournament(tournament) && !isParticipating(tournament)}
                className={`w-full ${
                  isParticipating(tournament)
                    ? 'btn-secondary'
                    : canJoinTournament(tournament)
                    ? 'btn-primary'
                    : 'btn-secondary opacity-50 cursor-not-allowed'
                }`}
              >
                {isParticipating(tournament)
                  ? 'Quitter'
                  : canJoinTournament(tournament)
                  ? 'Participer'
                  : 'Tournoi complet'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}