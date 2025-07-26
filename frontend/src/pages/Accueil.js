import React, { useState } from 'react';

export default function Accueil() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');

  // Exemple de données pour "chiffres clés"
  const chiffresCles = [
    { label: 'Utilisateurs actifs', value: '1,8 milliard' },
    { label: 'Nuitées réservées', value: '1 nuitée sur 3' },
    { label: 'Satisfaction clients', value: '48 % des nuitées' },
  ];

  // Témoignages sous forme de cards
  const temoignages = [
    {
      id: 1,
      text: "« J'ai pu m'inscrire en 15 minutes. Moins de 2 heures plus tard, j'avais ma première réservation ! »",
      author: 'Marie D.',
    },
    {
      id: 2,
      text: "« Plateforme intuitive et service client au top ! Je recommande. »",
      author: 'Ahmed B.',
    },
    {
      id: 3,
      text: "« Trouver un hôtel n'a jamais été aussi simple et rapide. Merci ! »",
      author: 'Sophie L.',
    },
  ];

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '60px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2c3e50',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      {/* Carte du monde en fond semi-transparent */}
      <img
        src="/carte-monde.png" // Assure-toi d'avoir cette image dans ton public ou remplace par une URL
        alt="Carte du monde"
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.05,
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* Contenu au-dessus */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>
          Rejoignez notre plateforme et trouvez votre hôtel idéal
        </h1>

        <p style={{ fontSize: '18px', marginBottom: '40px' }}>
          Trouvez, réservez et gérez vos séjours facilement, en quelques clics.
        </p>

        {/* Champ de recherche */}
        <input
          type="text"
          placeholder="Où souhaitez-vous aller ?"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            padding: '15px',
            width: '60%',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
            marginBottom: '20px',
          }}
        />

        {/* Sélecteur de date */}
        <div style={{ marginTop: '20px', marginBottom: '40px' }}>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            style={{
              padding: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />
        </div>

        {/* Bouton CTA bleu bien visible */}
        <button
          style={{
            backgroundColor: '#0071c2',
            color: '#fff',
            padding: '15px 60px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0, 113, 194, 0.4)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#005a9e')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0071c2')}
        >
          🔍 Rechercher
        </button>

        {/* Section Chiffres clés */}
        <section
          style={{
            marginTop: '80px',
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center',
          }}
        >
          {chiffresCles.map(({ label, value }) => (
            <div key={label} style={{ flex: 1, padding: '0 10px' }}>
              <p style={{ fontSize: '36px', fontWeight: '700', margin: '0' }}>{value}</p>
              <p style={{ fontSize: '16px', margin: '5px 0 0' }}>{label}</p>
            </div>
          ))}
        </section>

        {/* Section Témoignages sous forme de cards */}
        <section style={{ marginTop: '80px' }}>
          <h2 style={{ marginBottom: '40px' }}>Ce que disent les hôtes comme vous</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '30px',
              flexWrap: 'wrap',
            }}
          >
            {temoignages.map(({ id, text, author }) => (
              <div
                key={id}
                style={{
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '12px',
                  padding: '30px',
                  maxWidth: '280px',
                  flex: '1 1 280px',
                }}
              >
                <p style={{ fontStyle: 'italic', fontSize: '16px', marginBottom: '20px' }}>
                  {text}
                </p>
                <p style={{ fontWeight: 'bold', fontSize: '14px', color: '#555' }}>— {author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section partenaires */}
        <section style={{ marginTop: '80px' }}>
          <h2>Nos partenaires</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              marginTop: '20px',
              flexWrap: 'wrap',
            }}
          >
           <img src="/sponsors/sponsor1.jpg" alt="Sponsor 1" style={{ height: '100px' }} />
           <img src="/sponsors/sponsor 2.jpg" alt="Sponsor 1" style={{ height: '80px' }} />
           <img src="/sponsors/sponsor 3.jpeg" alt="Sponsor 1" style={{ height: '80px' }} />
          </div>
        </section>
      </div>
    </div>
  );
}
