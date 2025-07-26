import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Correction de l'importation

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Vérification côté client : champs requis
    if (!username || !password) {
      setError("Nom d'utilisateur et mot de passe requis.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch {
        setError("Réponse du serveur invalide.");
        setLoading(false);
        return;
      }

      if (response.ok) {
        if (data.role === 'admin') {
          window.location.href = '/admin';
        } else if (data.role === 'user') {
          window.location.href = '/user';
        } else {
          setError('Rôle inconnu.');
        }
      } else {
        // Affiche le message d'erreur du backend, ou un message générique
        setError(data.message || 'Erreur de connexion.');
      }
    } catch (err) {
      console.error('Erreur réseau:', err);
      setError('Problème réseau ou backend hors ligne.');
    }
    setLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token); // Utilisation de jwtDecode au lieu de jwt_decode
    console.log('Token décodé :', decoded);

    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === 'admin') {
          window.location.href = '/admin';
        } else if (data.role === 'user') {
          window.location.href = '/user';
        } else {
          setError('Rôle inconnu Google.');
        }
      } else {
        setError(data.message || 'Erreur Google Login.');
      }
    } catch (err) {
      console.error(err);
      setError('Erreur réseau Google Login.');
    }
  };

  const handleGoogleError = () => {
    setError('Connexion Google échouée.');
  };

  const bgStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px',
    margin: '10px 0 20px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: '#f9f9f9',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '16px',
    letterSpacing: '1px',
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s, transform 0.2s',
  };

  const glowStyle1 = {
    position: 'absolute',
    top: '-50px',
    left: '-50px',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
    filter: 'blur(30px)',
    zIndex: 0,
  };

  const glowStyle2 = {
    position: 'absolute',
    bottom: '-50px',
    right: '-50px',
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, rgba(118, 75, 162, 0.3) 0%, rgba(102, 126, 234, 0.3) 100%)',
    filter: 'blur(30px)',
    zIndex: 0,
  };

  return (
    <GoogleOAuthProvider clientId="815495963333-nrj8j6sg2v6mej4kqnecd9rgchaeub1h.apps.googleusercontent.com">
      <div style={bgStyle}>
        <div style={cardStyle}>
          <div style={glowStyle1}></div>
          <div style={glowStyle2}></div>

          <h1 style={{ fontWeight: '800', fontSize: '32px', marginBottom: '10px', color: '#333', zIndex: 1, position: 'relative' }}>
            Connexion
          </h1>

          <div style={{ fontSize: '16px', color: '#666', marginBottom: '30px', fontWeight: '500', zIndex: 1, position: 'relative' }}>
            Bienvenue sur <span style={{ fontWeight: '700', color: '#667eea' }}>DASHBOARD</span> App
          </div>

          <form onSubmit={handleSubmit} style={{ zIndex: 1, position: 'relative' }}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={inputStyle}
              required
              autoFocus
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            {error && (
              <div
                style={{
                  color: '#e74c3c',
                  background: '#f8d7da',
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '20px',
                  fontWeight: '500',
                  fontSize: '14px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...buttonStyle,
                opacity: loading ? 0.7 : 1,
                transform: loading ? 'scale(0.98)' : 'scale(1)',
              }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div style={{ margin: '20px 0', zIndex: 1, position: 'relative' }}>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
          </div>

          <div
            style={{
              marginTop: '20px',
              color: '#888',
              fontSize: '14px',
              zIndex: 1,
              position: 'relative',
            }}
          >
            <em>Connectez-vous facilement avec Google.</em>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
