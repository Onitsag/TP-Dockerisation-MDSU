import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/authStore';
import { authService, LoginData, RegisterData } from '../services/auth';

export function useAuth() {
  const navigate = useNavigate();
  const { login: setUser, logout: clearUser } = useAuthStore();

  const loginUser = useCallback(async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      setUser(response.user);
      toast.success('Connexion réussie !');
      navigate('/tournaments');
    } catch (error) {
      toast.error('Email ou mot de passe incorrect');
    }
  }, [navigate, setUser]);

  const registerUser = useCallback(async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
      toast.success('Inscription réussie !');
      navigate('/tournaments');
    } catch (error) {
      toast.error('Une erreur est survenue lors de l\'inscription');
    }
  }, [navigate, setUser]);

  const logoutUser = useCallback(() => {
    authService.logout();
    clearUser();
    toast.success('Déconnexion réussie');
    navigate('/');
  }, [navigate, clearUser]);

  return { loginUser, registerUser, logoutUser };
}