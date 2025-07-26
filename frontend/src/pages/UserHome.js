// pages/UserHome.js
import React from 'react';
import { Outlet } from 'react-router-dom';

export default function UserHome() {
  return (
    <div>
      <h1>Bienvenue Utilisateur</h1>
      <Outlet />
    </div>
  );
}
