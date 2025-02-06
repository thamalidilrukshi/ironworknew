import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/css/styles.css';
import './assets/css/Home.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';

import Projects from './components/Projects';
import SignUp from './components/Signup';
import Login from './components/Loging';
import Logout from './components/Logout';
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AboutUs from "./components/About_us";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Loging from './components/Loging';
import ImageUploader from './components/ImageUploader';
import ImageGallery from "./components/ImageGallery";
import Navbar from './components/Header';
import ServicePage from './components/ServicePage';
import Customers from './components/Customers';

import ProtectedRoute from './components/ProtectedRoute';
import ImageDetail from './components/ImageDetail';
import CustomerForm from './components/CustomerForm.js';






const App = () => {
  return (
    <Router>
     <Navbar />
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/login" element={<AdminLogin />} />
<Route path="/admin/dashboard" element={<AdminDashboard />} />
<Route path="/loging" element={<Loging />} />
<Route path="/logout" element={<Logout />} />
<Route path="/AdminDashboard" element={<AdminDashboard />} />
<Route path="/ImageUploader" element={<ImageUploader />} />
<Route path="/ImageGallery" element={<ImageGallery />} />
<Route path="/ServicePage" element={<ServicePage />} />
<Route path="/Customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
<Route path="/ProtectedRoute" element={<ProtectedRoute />} />

<Route path="/image/:id" element={<ImageDetail />} />
<Route path="/customer/:id" element={<CustomerForm />} />

       
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
