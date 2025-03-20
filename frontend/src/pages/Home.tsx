import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Users, GamepadIcon } from 'lucide-react';

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px]">
        <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-game-background/80 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
              <div className="text-center">
                <h1 className="text-4xl sm:text-6xl font-gaming font-bold text-white mb-6">
                  NiceTry
                  <span className="text-game-accent">.</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                  Organisez et participez à des tournois de jeux vidéo épiques. 
                  Affrontez les meilleurs joueurs et devenez une légende.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => navigate('/tournaments')}
                    className="btn-primary flex items-center justify-center space-x-2"
                  >
                    <Trophy className="h-5 w-5" />
                    <span>Voir les tournois</span>
                  </button>
                  <button
                    onClick={() => navigate('/create-tournament')}
                    className="btn-secondary flex items-center justify-center space-x-2"
                  >
                    <GamepadIcon className="h-5 w-5" />
                    <span>Organiser un tournoi</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-game-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-game-background p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
              <Trophy className="h-12 w-12 text-game-accent mb-4" />
              <h3 className="text-xl font-gaming font-semibold mb-2">Compétitions Épiques</h3>
              <p className="text-gray-400">
                Participez à des tournois compétitifs dans vos jeux préférés
              </p>
            </div>
            <div className="bg-game-background p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
              <Users className="h-12 w-12 text-game-accent mb-4" />
              <h3 className="text-xl font-gaming font-semibold mb-2">Communauté Active</h3>
              <p className="text-gray-400">
                Rejoignez une communauté passionnée de gamers
              </p>
            </div>
            <div className="bg-game-background p-6 rounded-lg transform hover:scale-105 transition-transform duration-300">
              <GamepadIcon className="h-12 w-12 text-game-accent mb-4" />
              <h3 className="text-xl font-gaming font-semibold mb-2">Tous les Formats</h3>
              <p className="text-gray-400">
                Solo, duo ou équipe - trouvez le format qui vous convient
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}