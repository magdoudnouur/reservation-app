import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <nav
        style={{
          width: 220,
          backgroundColor: '#3b3f6b',
          color: 'white',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        <h2 style={{ marginBottom: 30 }}>Admin Panel</h2>

        <button style={menuButton} onClick={() => navigate('/admin')}>
          📊 Dashboard
        </button>
        <button style={menuButton} onClick={() => navigate('/admin/users')}>
          👥 Utilisateurs
        </button>
        <button style={menuButton} onClick={() => navigate('/admin/userdashboard')}>
          🔔 Ajouter un hôtel
        </button>
        <button style={menuButton} onClick={() => alert('Messages')}>
          ✉️ Messages
        </button>
        <button style={menuButton} onClick={() => navigate('/admin/reports')}>
  📨 Reports
</button>

  

        <div style={{ marginTop: 'auto' }}>
          <button
            style={{ ...menuButton, backgroundColor: '#d9534f' }}
            onClick={handleLogout}
            onMouseOver={e => (e.currentTarget.style.backgroundColor = '#c9302c')}
            onMouseOut={e => (e.currentTarget.style.backgroundColor = '#d9534f')}
          >
            🚪 Déconnexion
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ flex: 1, padding: 30 }}>
        <Outlet />
      </main>
    </div>
  );
}

const menuButton = {
  backgroundColor: 'transparent',
  border: 'none',
  color: 'white',
  textAlign: 'left',
  padding: '10px 15px',
  fontSize: 18,
  cursor: 'pointer',
  borderRadius: 6,
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
};
