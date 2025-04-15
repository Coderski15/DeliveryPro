import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Authentication
import Login from './pages/Auth/Login';
import Registration from './pages/auth/Registration';

// Pages
import LandingPage from './pages/clientPages/LandingPage.jsx';
import Services from './pages/clientPages/Services.jsx';
import Pricing from './pages/clientPages/Pricing.jsx';
import Contact from './pages/clientPages/Contact.jsx';
import AdminDashboard from './pages/adminPages/AdminDashboard.jsx';
import CustomerDashboard from './pages/customer/CustomerDashboard.jsx';
import DeliveryDashboard from './pages/delivery/DeliveryDashboard.jsx';

// Redux Store
import { selectUser, selectUserIsAdmin, selectUserRole } from './redux/features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading, setError } from "./redux/features/auth/authSlice.jsx";
import client from './lib/axios';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectUserIsAdmin);
  const role = useSelector(selectUserRole);
  const navigate = useNavigate(); // <-- initialize here
  // Fetch token and authenticate user on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          dispatch(setLoading(true));
          const response = await client.get("/auth/verify-user", {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success && response.data.user) {
            const userData = response.data.user;
            dispatch(login(userData));

            // 🔁 Navigate based on role immediately
            if (userData.role === "delivery") {
              navigate("/delivery-dashboard");
            } else if (userData.role === "customer") {
              navigate("/customer-dashboard");
            } else if (userData.isAdmin) {
              navigate("/admindashboard");
            }
          } else {
            dispatch(setError("Authentication failed"));
          }
        } catch (error) {
          dispatch(setError("Token verification failed"));
          console.error("Error during token verification:", error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user.name} />
      <Routes>
        <Route path="/" element={role ? (
          role === "delivery" ? (
            <Navigate to="/delivery-dashboard" />
          ) : role === "customer" ? (
            <Navigate to="/customer-dashboard" />
          ) : isAdmin ? (
            <Navigate to="/admindashboard" />
          ) : null
        ) :
          (
            <LandingPage />

          )} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={role ? (
          role === "delivery" ? (
            <Navigate to="/delivery-dashboard" />
          ) : role === "customer" ? (
            <Navigate to="/customer-dashboard" />
          ) : isAdmin ? (
            <Navigate to="/admindashboard" />
          ) : null
        ) :
          (
            <Login />

          )} />
        <Route path="/register" element={role ? (
          role === "delivery" ? (
            <Navigate to="/delivery-dashboard" />
          ) : role === "customer" ? (
            <Navigate to="/customer-dashboard" />
          ) : isAdmin ? (
            <Navigate to="/admindashboard" />
          ) : null
        ) :
          (
            <Registration />

          )} />
        <Route path="/admindashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/customer-dashboard" element={role === 'customer' ? <CustomerDashboard /> : <Navigate to="/" />} />
        <Route path="/delivery-dashboard" element={role === 'delivery' ? <DeliveryDashboard /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
