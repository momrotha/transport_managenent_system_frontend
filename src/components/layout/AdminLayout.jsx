import { LayoutDashboard, Users, CarFront, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 space-y-6">
        <div className="text-2xl font-bold text-blue-600">Admin Panel</div>
        <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
          <Link to="/admin/customer" className="flex items-center gap-2 hover:text-blue-600">
            <Users size={18} /> Customers
          </Link>
          <Link to="/admin/driver" className="flex items-center gap-2 hover:text-blue-600">
            <CarFront size={18} /> Drivers
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-500 mt-10">
            <LogOut size={18} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
