import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages communes
import Login from './login.js';

// Pages Admin
import AdminDashboard from './pages/AdminDashboard.js';
import Dashboard from './pages/Dashboard.js';
import UsersPage from './pages/UsersPage.js';
import UserDashboard from './pages/UserDashboard.js';
import AdminReports from './pages/AdminReports.js'; // ✅ Nouvelle page pour rapports admin

// Pages Utilisateur
import Main from './pages/Main.js';
import Accueil from './pages/Accueil.js';
import SearchHotels from './pages/SearchHotels.js';
import Reports from './pages/Reports.js'; // ✅ Page rapports utilisateur

function App() {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Routes Admin */}
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="userdashboard" element={<UserDashboard />} />
          <Route path="reports" element={<AdminReports />} /> {/* ✅ Route admin pour rapports */}
        </Route>

        {/* Routes Utilisateur */}
        <Route path="/user" element={<Main />}>
          <Route index element={<Accueil />} />
          <Route path="search" element={<SearchHotels />} />
          <Route path="reports" element={<Reports />} /> {/* ✅ Route user pour rapports */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
