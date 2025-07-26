import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const menuButton = {
  backgroundColor: '#2c3e50',
  color: '#ecf0f1',
  border: 'none',
  padding: '10px 15px',
  fontSize: '16px',
  borderRadius: '6px',
  cursor: 'pointer',
  width: '100%',
  textAlign: 'left',
  marginBottom: '10px',
  transition: 'background-color 0.3s',
};

export default function Main() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", height: '100vh' }}>
      <nav
        style={{
          width: '220px',
          backgroundColor: '#2c3e50',
          padding: '30px 20px',
          boxSizing: 'border-box',
          color: '#ecf0f1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h2 style={{ marginBottom: '30px', borderBottom: '2px solid #2980b9', paddingBottom: '10px' }}>Menu Utilisateur</h2>

          <button
            style={menuButton}
            onClick={() => navigate('/user')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            🏠 Accueil
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/search')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            🔍 Recherche Hôtels
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/Reports')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            📊 Rapport
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/profile')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            👤 Profil
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/bookings')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            📅 Réservations
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/favorites')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            ⭐ Favoris
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/contact')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            📞 Contact
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/help')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            ❓ Aide / FAQ
          </button>

          <button
            style={menuButton}
            onClick={() => navigate('/user/settings')}
            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
            onMouseLeave={e => (e.target.style.backgroundColor = '#2c3e50')}
          >
            ⚙️ Paramètres
          </button>
        </div>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#c0392b',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={e => (e.target.style.backgroundColor = '#e74c3c')}
          onMouseLeave={e => (e.target.style.backgroundColor = '#c0392b')}
        >
          🔓 Déconnexion
        </button>
      </nav>

      <main style={{ padding: '30px', flexGrow: 1, backgroundColor: '#f5f7fa' }}>
        <Outlet />
      </main>
    </div>
  );
}
