import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Importar ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importar estilos de react-toastify
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
import CarDetailPage from './pages/CarDetailPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import DealersPage from './pages/DealersPage';
import ProfilePage from './pages/profile/ProfilePage';
import { jwtDecode } from 'jwt-decode';
import 'leaflet/dist/leaflet.css';
import { ValidacionVehiculos } from './pages/admin/ValidacionVehiculos';
import { Administracion } from './pages/admin/Administracion';
import LiveChat from './pages/LiveChat';
import JoinChat from './pages/JoinChat';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log('Token en localStorage:', token);
          console.log('Rol decodificado:', decoded.role);
          setIsAuthenticated(true);
          setUserProfilePic('src/assets/images/default_user.png');
          setUserRole(decoded.role || null);
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          setToken(null);
        }
      } else {
        setIsAuthenticated(false);
        setUserProfilePic(null);
        setUserRole(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token]);

  const user = useMemo(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return {
          id: decoded.id || '',
          username: decoded.username || 'Usuario',
        };
      } catch (error) {
        console.error('Error decoding token for user:', error);
        return { id: '', username: '' };
      }
    }
    return { id: '', username: '' };
  }, [token]);

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
        <Route path="/app/ubicacion" element={<DealersPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/app/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
        <Route
          path="/app/administracion"
          element={<ProtectedRoute element={<Administracion />} requireAdmin={true} />}
        />
        <Route
          path="/app/admin"
          element={<ProtectedRoute element={<ContactsPageAdmin />} requireAdmin={true} />}
        />
        <Route
          path="/app/validacion_coches"
          element={<ProtectedRoute element={<ValidacionVehiculos />} requireAdmin={true} />}
        />
        <Route
          path="/app/liveChat"
          element={<ProtectedRoute element={<LiveChat token={token} user={user} />} />}
        />
        <Route
          path="/join"
          element={<ProtectedRoute element={<JoinChat token={token} user={user} />} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;