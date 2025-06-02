import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import SignUpComponent from './components/SignUpComponent';
import CustomerAdmin from './components/CustomerAdmin';
import DriverAdmin from './components/DriverAdmin';
import AvailableCars from './components/AvailableCars';
import NotFound from './components/NotFound';
import AdminLayout from './components/layout/AdminLayout';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Root path redirect based on login */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/admin/driver" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/availableCar" element={<AvailableCars />} />

        <Route
          path="/admin/customer"
          element={
            <PrivateRoute>
              <AdminLayout>
                <CustomerAdmin />
              </AdminLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/driver"
          element={
            <PrivateRoute>
              <AdminLayout>
                <DriverAdmin />
              </AdminLayout>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
