import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CustomerDashboard from "./pages/CustomerDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./hooks/useAuth.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/customer-dashboard"
          element={
            <PrivateRoute allowedUserType="customer">
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/driver-dashboard"
          element={
            <PrivateRoute allowedUserType="driver">
              <DriverDashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} /> {/* 404 Page */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
