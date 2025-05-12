import { createContext, useContext, useState, useEffect, useMemo } from "react";
import api from "../api"; // Assuming you have an axios instance
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is authenticated on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/auth/verify", { withCredentials: true });
        setUser(response.data);
        console.log("User verified:", response.data);
      } catch (error) {
        setUser(null);
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); // Check user authentication status
  }, []);

  const login = async (credentials) => {
    try {
      // Attempt login
      await api.post("/api/auth/login", credentials, { withCredentials: true });
  
      // Fetch and set the authenticated user
      const verifyResponse = await api.get("/api/auth/verify", { withCredentials: true });
      const userData = verifyResponse.data;
      setUser(userData);
  
      // Navigate based on user role
      const role = userData.role?.toLowerCase();
      switch (role) {
        case 'employer':
          navigate('/employer/dashboard');
          break;
        case 'jobseeker':
        case 'seeker':
          navigate('/seeker/dashboard');
          break;
        default:
          navigate('/');
          break;
      }
  
      return { success: true }; // ✅ Login successful
    } catch (error) {
      console.error("Login failed:", error?.response?.data?.message || error.message);
      setUser(null);
      return { success: false, message: error?.response?.data?.message || "Invalid credentials" };
    }
  };
  

  const logout = async () => {
    try {
      // Send logout request and clear cookies
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  // Get the route for the respective dashboard based on role
  const getDashboardRoute = (role) => {
    const roleRoutes = {
      employer: "/employer/",
      seeker: "/seeker/",
    };
    return roleRoutes[role.toLowerCase()] || "/"; // Default to home if no match
  };

  // Memoize the context value to prevent unnecessary re-renders
  const authContextValue = useMemo(() => ({
    user,
    login,
    logout,
    loading,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);
