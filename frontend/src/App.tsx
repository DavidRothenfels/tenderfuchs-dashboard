import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LLMProvider } from './contexts/LLMContext';
import './App.css';

const MainContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <main>
        {isAuthenticated ? <Dashboard /> : <Login />}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <LLMProvider>
        <MainContent />
      </LLMProvider>
    </AuthProvider>
  );
};

export default App;
