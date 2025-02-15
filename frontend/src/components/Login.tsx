import React, { useState } from 'react';
import api from '../pocketbase';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/collections/users/auth-with-password', {
        identity: email,
        password: password,
      });
      console.log('Login erfolgreich:', response.data);
      login(response.data);
      setError(null);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Login fehlgeschlagen:', error.response.data);
        setError(error.response.data.message || 'Ungültige E-Mail oder Passwort');
      } else {
        setError('Ein unerwarteter Fehler ist aufgetreten');
        alert('Ein unerwarteter Fehler ist aufgetreten');
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        {error && (
          <div className="error-message">{error}</div>
        )}
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-Mail"
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Anmelden
        </button>
      </form>
    </div>
  );
};

export default Login;