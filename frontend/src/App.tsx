import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Tournaments } from './pages/Tournaments';
import { CreateTournament } from './pages/CreateTournament';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-game-background text-white">
        <Navbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route 
              path="/create-tournament" 
              element={
                <ProtectedRoute>
                  <CreateTournament />
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'bg-game-foreground text-white',
            style: {
              background: '#1E293B',
              color: '#fff',
              border: '1px solid rgba(109, 40, 217, 0.2)',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;