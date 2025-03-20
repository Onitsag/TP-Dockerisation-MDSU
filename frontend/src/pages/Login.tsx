import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function Login() {
  const { loginUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    await loginUser(data);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-gaming font-bold text-center mb-8">Connexion</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-game-foreground p-6 rounded-lg">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="input-field w-full"
            placeholder="vous@exemple.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Mot de passe
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="input-field w-full"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Se connecter
        </button>

        <p className="text-center text-sm text-gray-400">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-game-accent hover:text-game-accent/80">
            S'inscrire
          </Link>
        </p>
      </form>
    </div>
  );
}