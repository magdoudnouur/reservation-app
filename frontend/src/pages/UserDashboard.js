import React, { useState, useEffect } from 'react';

export default function UserDashboard() {
  const [name, setName] = useState('');
  const [pricePerPerson, setPricePerPerson] = useState('');
  const [discount, setDiscount] = useState('');
  const [image, setImage] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Ton token JWT valide à remplacer ici
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJub3VyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzNDU3NjAzLCJleHAiOjE3NTM0NjEyMDN9.Bdof7YNIy-XsiRuAadBr3rVJV6WiFKXhDMVl8XtTFY0';

  useEffect(() => {
    fetchHotels();
  }, []);

  async function fetchHotels() {
    try {
      const res = await fetch('http://localhost:4000/api/hotels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Erreur récupération hôtels');
      const data = await res.json();
      setHotels(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!name || !pricePerPerson) {
      setError('Le nom et le prix par personne sont obligatoires');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', pricePerPerson);
      if (discount) formData.append('discount', discount);
      if (image) formData.append('images', image); // champ attendu par multer

      const res = await fetch('http://localhost:4000/api/hotels', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erreur lors de l'ajout: ${res.status} ${text}`);
      }

      alert('Hôtel ajouté avec succès !');
      setName('');
      setPricePerPerson('');
      setDiscount('');
      setImage(null);
      fetchHotels();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Gestion des Hôtels</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}

        <input
          type="text"
          placeholder="Nom de l'hôtel"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="number"
          placeholder="Prix par personne"
          value={pricePerPerson}
          onChange={e => setPricePerPerson(e.target.value)}
          disabled={loading}
          min="0"
          step="0.01"
          required
        />
        <input
          type="number"
          placeholder="Remise (en %)"
          value={discount}
          onChange={e => setDiscount(e.target.value)}
          disabled={loading}
          min="0"
          max="100"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={loading}
        />
        {image && (
          <div style={{ marginTop: 10 }}>
            <strong>Image sélectionnée :</strong>
            <br />
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ maxWidth: '100%', maxHeight: 150, borderRadius: 6, marginTop: 5 }}
            />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Ajout en cours...' : "Ajouter l'hôtel"}
        </button>
      </form>

      <hr style={{ margin: '40px 0' }} />

      <h2>Liste des hôtels ({hotels.length})</h2>
      {hotels.length === 0 && <p>Aucun hôtel trouvé</p>}
      <ul>
        {hotels.map(hotel => (
          <li key={hotel.id}>
            <strong>{hotel.name}</strong> - {hotel.price} DT
            {hotel.discount > 0 && <> (-{hotel.discount}%)</>}
            {hotel.images && (
              <div>
                <img
                  src={`http://localhost:4000/uploads/${hotel.images.split(',')[0]}`}
                  alt={hotel.name}
                  style={{ maxWidth: 200, borderRadius: 6, marginTop: 6 }}
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
