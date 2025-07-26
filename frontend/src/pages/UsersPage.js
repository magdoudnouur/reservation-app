import React, { useState, useEffect } from 'react';

export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editUsername, setEditUsername] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editRole, setEditRole] = useState('user');

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:4000/api/users');
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else {
        console.error('Format inattendu:', data);
        setUsers([]);
      }
    } catch (error) {
      alert('Erreur lors du chargement des utilisateurs');
    }
  }

  async function addUser() {
    if (!username || !password) {
      alert('Veuillez remplir tous les champs');
      return;
    }
    try {
      await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });
      setUsername('');
      setPassword('');
      setRole('user');
      fetchUsers();
    } catch {
      alert("Erreur lors de l'ajout");
    }
  }

  function startEdit(user) {
    setEditingUserId(user.id);
    setEditUsername(user.username);
    setEditPassword('');
    setEditRole(user.role || 'user');
  }

  function cancelEdit() {
    setEditingUserId(null);
    setEditUsername('');
    setEditPassword('');
    setEditRole('user');
  }

  async function saveEdit() {
    if (!editUsername) {
      alert("Le nom d'utilisateur est obligatoire");
      return;
    }
    try {
      await fetch(`http://localhost:4000/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: editUsername, password: editPassword, role: editRole }),
      });
      cancelEdit();
      fetchUsers();
    } catch {
      alert('Erreur lors de la modification');
    }
  }

  async function deleteUser(id) {
    if (!window.confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) return;
    try {
      await fetch(`http://localhost:4000/api/users/${id}`, { method: 'DELETE' });
      fetchUsers();
    } catch {
      alert('Erreur lors de la suppression');
    }
  }

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1>Gestion des utilisateurs</h1>

      {/* Formulaire ajout */}
      <div style={{ marginBottom: 30, maxWidth: 500 }}>
        <h2>Ajouter un utilisateur</h2>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ flex: 1, padding: 10, borderRadius: 5, border: '1px solid #ccc' }}
          />
        </div>

        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 5, border: '1px solid #ccc', marginBottom: 15 }}
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
          <option value="moderator">Modérateur</option>
        </select>

        <button
          onClick={addUser}
          disabled={!username || !password}
          style={{
            width: '100%',
            padding: 12,
            backgroundColor: !username || !password ? '#aaa' : '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            fontWeight: 'bold',
            cursor: !username || !password ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Ajouter
        </button>
      </div>

      {/* Liste utilisateurs */}
      <h2>Liste des utilisateurs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: 10, textAlign: 'left' }}>ID</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Nom d'utilisateur</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Rôle</th>
            <th style={{ padding: 10, textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan={4} style={{ padding: 10 }}>Aucun utilisateur trouvé.</td></tr>
          ) : (
            users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 10 }}>{user.id}</td>
                <td style={{ padding: 10 }}>
                  {editingUserId === user.id ? (
                    <input
                      value={editUsername}
                      onChange={e => setEditUsername(e.target.value)}
                      style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td style={{ padding: 10 }}>
                  {editingUserId === user.id ? (
                    <select
                      value={editRole}
                      onChange={e => setEditRole(e.target.value)}
                      style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
                    >
                      <option value="user">Utilisateur</option>
                      <option value="admin">Administrateur</option>
                      <option value="moderator">Modérateur</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td style={{ padding: 10 }}>
                  {editingUserId === user.id ? (
                    <>
                      <input
                        type="password"
                        placeholder="Nouveau mot de passe (optionnel)"
                        value={editPassword}
                        onChange={e => setEditPassword(e.target.value)}
                        style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc', marginRight: 8 }}
                      />
                      <button onClick={saveEdit} style={{ marginRight: 6, padding: '6px 12px' }}>Sauvegarder</button>
                      <button onClick={cancelEdit} style={{ padding: '6px 12px' }}>Annuler</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(user)} style={{ marginRight: 6, padding: '6px 12px' }}>Modifier</button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: 4,
                          cursor: 'pointer',
                          transition: 'background-color 0.3s',
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#c53030'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#e53e3e'}
                      >
                        Supprimer
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
