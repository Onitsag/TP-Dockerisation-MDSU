import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { tournamentService, CreateTournamentData } from '../services/tournaments';
import { Tournament } from '../types';

export function useTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTournaments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await tournamentService.getAll();
      setTournaments(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des tournois');
    } finally {
      setLoading(false);
    }
  }, []);

  const createTournament = useCallback(async (data: CreateTournamentData) => {
    try {
      const newTournament = await tournamentService.create(data);
      setTournaments(prev => [...prev, newTournament]);
      toast.success('Tournoi créé avec succès !');
      return true;
    } catch (error) {
      toast.error('Erreur lors de la création du tournoi');
      return false;
    }
  }, []);

  const joinTournament = useCallback(async (tournamentId: string) => {
    try {
      const updatedTournament = await tournamentService.join(tournamentId);
      setTournaments(prev =>
        prev.map(t => t.id === tournamentId ? updatedTournament : t)
      );
      toast.success('Inscription au tournoi réussie !');
    } catch (error) {
      toast.error('Erreur lors de l\'inscription au tournoi');
    }
  }, []);

  const leaveTournament = useCallback(async (tournamentId: string) => {
    try {
      const updatedTournament = await tournamentService.leave(tournamentId);
      setTournaments(prev =>
        prev.map(t => t.id === tournamentId ? updatedTournament : t)
      );
      toast.success('Désinscription du tournoi réussie');
    } catch (error) {
      toast.error('Erreur lors de la désinscription du tournoi');
    }
  }, []);

  return {
    tournaments,
    loading,
    fetchTournaments,
    createTournament,
    joinTournament,
    leaveTournament,
  };
}