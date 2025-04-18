import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/app/Header';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import AppHome from './pages/AppHome';
import NotFound from './pages/NotFound';
import SellCar from './pages/SellCar';
import ContactPage from './pages/Contact';
import ContactsPageAdmin from './pages/admin/contacts';
import AboutUs from './pages/AboutUs';
import CarDetailPage from "./pages/CarDetailPage";
import ForgotPassword from './pages/ForgotPassword';
import DealersPage from './pages/DealersPage';
import ProfilePage from './pages/profile/ProfilePage';
import { jwtDecode } from 'jwt-decode';
import 'leaflet/dist/leaflet.css';
import { ValidacionVehiculos } from './pages/admin/ValidacionVehiculos';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      console.log('Token en localStorage:', token);
      if (token) {
        try {
          setIsAuthenticated(true);
          setUserProfilePic("src/assets/images/default_user.png");
          if (jwtDecode) {
            const decoded = jwtDecode(token);
            setUserRole(decoded.role || null); // Maneja el caso en que role no exista
            console.log('Rol decodificado:', decoded.role);
          } else {
            console.warn('jwt-decode no disponible, no se puede obtener el rol');
          }
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          setIsAuthenticated(false); // Si el token es inválido, no autenticamos
          localStorage.removeItem('token'); // Limpia el token inválido
        }
      } else {
        setIsAuthenticated(false);
        setUserProfilePic(null);
        setUserRole(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const ProtectedRoute = ({ element, requireAdmin = false }) => {
    console.log('isAuthenticated:', isAuthenticated, 'userRole:', userRole);
    if (isLoading) return <div>Cargando...</div>;
    if (!isAuthenticated) return <Navigate to="/login" />;
    if (requireAdmin && userRole !== 'admin') return <Navigate to="/app" />;
    return element;
  };

  if (isLoading) {
    return <div>Cargando aplicación...</div>;
  }

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        userProfilePic={userProfilePic}
        userRole={userRole}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app" element={<AppHome />} />
        <Route path="/app/sell" element={<ProtectedRoute element={<SellCar />} />} />
        <Route path="/app/contact" element={<ContactPage />} />
        <Route path="/app/about" element={<AboutUs />} />
        <Route path="/app/coches/:id" element={<CarDetailPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/app/ubicacion" element={<DealersPage />} />
        <Route path="/app/profile" element={<ProtectedRoute element={<ProfilePage />} />} />

        <Route
          path="/app/admin"
          element={<ProtectedRoute element={<ContactsPageAdmin />} requireAdmin={true} />}
        />

        <Route
          path="/app/validacion_coches"
          element={<ProtectedRoute element={<ValidacionVehiculos />} requireAdmin={true} />}
        />

        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
}

export default App;