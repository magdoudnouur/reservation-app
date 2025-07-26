import React, { useEffect, useState } from 'react';

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Token codé en dur pour test
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJub3VyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNTM5NjQ1LCJleHAiOjE3NTM1NDMyNDV9.FGqJPNWVNQQ5lbvMf57MxTUt_Sgy__KnzjJvP5fhzmM';

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/reports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erreur ${res.status} : ${errorText}`);
      }

      const data = await res.json();
      setReports(data);
      setError('');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!userId || !message) {
      setError('Remplissez tous les champs.');
      return;
    }

    try {
      const res = await fetch('http://localhost:4000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id: userId, message }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erreur ${res.status} : ${errorText}`);
      }

      setMessage('');
      setUserId('');
      setSuccess('Rapport ajouté !');
      fetchReports();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <h1>📄 Rapports</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleAddReport} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="ID Utilisateur"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '120px' }}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: '10px', marginRight: '10px', width: '250px' }}
        />
        <button
          type="submit"
          style={{ padding: '10px 20px', background: '#0071c2', color: '#fff', border: 'none', borderRadius: '5px' }}
        >
          ➕ Ajouter
        </button>
      </form>

      <h2>📋 Liste des rapports :</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.id} style={{ marginBottom: '10px' }}>
            <strong>ID Utilisateur:</strong> {report.user_id} <br />
            <strong>Message:</strong> {report.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
