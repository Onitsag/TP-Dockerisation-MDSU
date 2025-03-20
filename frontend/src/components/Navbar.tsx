import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GamepadIcon, LogOut, Home } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export function Navbar() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-game-foreground/95 backdrop-blur-sm fixed w-full z-50 top-0 left-0 border-b border-game-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <GamepadIcon className="h-8 w-8 text-game-accent" />
              <span className="font-gaming text-xl text-white">NiceTry</span>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <Home className="h-4 w-4" />
                <span>Accueil</span>
              </Link>
              <Link
                to="/tournaments"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Tournois
              </Link>
              <Link
                to="/create-tournament"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Créer un tournoi
              </Link>
            </div>
          </div>

          <div>
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-game-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-game-secondary transition-colors"
              >
                Connexion
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <LogOut className="h-4 w-4" />
                <span>Déconnexion</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}