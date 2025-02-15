import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Willkommen, {user?.email || 'Benutzer'}</h2>
        <button className="logout-button" onClick={logout}>
          Abmelden
        </button>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Übersicht</h3>
          <p>Willkommen in Ihrem Dashboard. Hier können Sie Ihre Daten verwalten.</p>
        </div>
        <div className="dashboard-card">
          <h3>Statistiken</h3>
          <ul>
            <li>Beispiel-Statistik 1</li>
            <li>Beispiel-Statistik 2</li>
            <li>Beispiel-Statistik 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;