import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores { token, user_type }
  const [loading, setLoading] = useState(true); // To check if initial auth state is loaded
  const navigate = useNavigate();

  const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.token && parsedUser.user_type) {
          setUser(parsedUser);
          // Set up axios default headers for authenticated requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
        } else {
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log('Making sign-in request to:', `${API_BASE_URL}/sign-in`);
      const response = await axios.post(`${API_BASE_URL}/sign-in`, {
        email,
        password,
      });

      console.log('Sign-in response:', response.data);

      // Check if response has the correct structure
      if (response.data?.status === true && response.data?.data?.user) {
        const userData = {
          token: response.data.data.token,
          user_type: response.data.data.user.role,
        };
        console.log('Created user data:', userData);

        // Set up axios default headers for authenticated requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));

        console.log('Login successful, returning with user_type:', userData.user_type);
        return { success: true, user_type: userData.user_type };
      }

      // If we get here, something was wrong with the response format
      console.error("Unexpected response format:", response.data);
      return { 
        success: false, 
        error: "Unexpected response format from server"
      };
    } catch (error) {
      console.error("Sign in error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Invalid credentials",
      };
    }
  };

  const signUp = async (userData) => {
    try {
      console.log('Making sign-up request with:', { ...userData, password: '[REDACTED]' });
      const response = await axios.post(`${API_BASE_URL}/sign-up`, {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        password_confirmation: userData.password_confirmation,
        phone_number: userData.phone_number,
        user_type: userData.user_type
      });

      console.log('Sign-up response:', response.data);

      // Check if response has the correct structure
      if (response.data?.status === true && response.data?.data?.user) {
        const newUser = {
          token: response.data.data.token,
          user_type: response.data.data.user.role,
        };
        console.log('Created new user data:', newUser);

        // Set up axios default headers for authenticated requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${newUser.token}`;
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));

        console.log('Registration successful, returning with user_type:', newUser.user_type);
        return { success: true, user_type: newUser.user_type };
      }

      // If we get here, something was wrong with the response format
      console.error("Unexpected response format:", response.data);
      return { 
        success: false, 
        error: "Unexpected response format from server"
      };
    } catch (error) {
      console.error("Sign up error:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Remove the Authorization header
    delete axios.defaults.headers.common['Authorization'];
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
