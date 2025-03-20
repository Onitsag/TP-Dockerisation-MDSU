import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../hooks/useAuth';

const registerSchema = z.object({
  username: z.string().min(3, 'Le pseudo doit contenir au moins 3 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function Register() {
  const { registerUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    await registerUser(data);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-gaming font-bold text-center mb-8">Inscription</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-game-foreground p-6 rounded-lg">
        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-2">
            Pseudo
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className="input-field w-full"
            placeholder="Votre pseudo"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
          )}
        </div>

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

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            className="input-field w-full"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          S'inscrire
        </button>

        <p className="text-center text-sm text-gray-400">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-game-accent hover:text-game-accent/80">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}