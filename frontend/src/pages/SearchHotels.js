import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchHotels() {
  const [hotels, setHotels] = useState([]);
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Token exemple, à remplacer par le vrai token connecté
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJub3VyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNTM5NjQ1LCJleHAiOjE3NTM1NDMyNDV9.FGqJPNWVNQQ5lbvMf57MxTUt_Sgy__KnzjJvP5fhzmM' ;

  // Ici, simuler user connecté (id 1) - à remplacer par ta logique auth
  const userId = 1;

  useEffect(() => {
    fetchHotels();
  }, []);

  useEffect(() => {
    if (maxPrice) {
      setFilteredHotels(
        hotels.filter(hotel => hotel.price <= parseFloat(maxPrice))
      );
    } else {
      setFilteredHotels(hotels);
    }
  }, [maxPrice, hotels]);

  async function fetchHotels() {
    try {
      const res = await fetch('http://localhost:4000/api/hotels', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Erreur lors du chargement des hôtels');
      const data = await res.json();
      setHotels(data);
      setFilteredHotels(data);
    } catch (err) {
      console.error(err);
      setError('Impossible de charger les hôtels.');
    }
  }

  // Fonction réservation
  async function handleReserve(hotelId) {
    try {
      const res = await fetch('http://localhost:4000/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          hotelId,
          status: 'pending',
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de la réservation');

      alert('Demande de réservation envoyée avec succès !');
    } catch (error) {
      alert('Erreur lors de la réservation');
      console.error(error);
    }
  }

  return (
    <div style={{ maxWidth: 1200, margin: 'auto', padding: 20 }}>
      <h1>🔍 Recherche d'Hôtels</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={{ marginBottom: 20 }}>
        <label>
          Prix maximum :{' '}
          <input
            type="number"
            value={maxPrice}
            placeholder="Ex : 200"
            onChange={e => setMaxPrice(e.target.value)}
          />
          <span> DT</span>
        </label>
      </div>
      <button
        onClick={() => navigate('/admin/userdashboard')}
        style={{
          padding: '10px 15px',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer',
          marginBottom: 20,
        }}
      >
        ➕ Aller vers Ajout Chauffeur / Hôtel (Admin)
      </button>
      {filteredHotels.length === 0 ? (
        <p>Aucun hôtel trouvé pour ce prix.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
          {filteredHotels.map(hotel => (
            <div key={hotel.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 15, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
              <h3>{hotel.name}</h3>
              <p><strong>Prix:</strong> {hotel.price} DT</p>
              {hotel.discount > 0 && <p><strong>Remise:</strong> {hotel.discount}%</p>}
              {hotel.images && (
                <img
                  src={`http://localhost:4000/uploads/${hotel.images.split(',')[0]}`}
                  alt={hotel.name}
                  style={{ width: '100%', borderRadius: 8, marginTop: 10 }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              )}
              <button
                style={{
                  marginTop: 10,
                  padding: '8px 12px',
                  backgroundColor: '#2ecc71',
                  border: 'none',
                  borderRadius: 5,
                  color: 'white',
                  cursor: 'pointer',
                }}
                onClick={() => handleReserve(hotel.id)}
              >
                Réserver
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
