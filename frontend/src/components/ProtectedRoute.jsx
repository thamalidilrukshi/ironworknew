import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for token in cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    // Redirect to login page if no token is found
    if (!token) {
      navigate('/Customers');  // Updated to '/Loging'
    }
  }, [navigate]);

  // If token exists, render children components (e.g., Customers)
  return children;
};

export default ProtectedRoute;
