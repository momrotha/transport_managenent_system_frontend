import React, { useState } from 'react';
import { UserPlus, Users, LayoutDashboard, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerAdmin = () => {
  const [customers, setCustomers] = useState([
    { id: 1, name: 'John Doe', email: 'john@gmail.com', phone: '0123456789' },
    { id: 2, name: 'Jane Smith', email: 'jane@gmail.com', phone: '0987654321' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const newCustomer = { ...formData, id: customers.length + 1 };
    setCustomers((prev) => [...prev, newCustomer]);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <nav className="space-y-3">
          <Link to="/admin/customer" className="flex items-center gap-2 hover:text-yellow-300">
            <Users size={20} /> Customers
          </Link>
          <Link to="/admin/driver" className="flex items-center gap-2 hover:text-yellow-300">
            <LayoutDashboard size={20} /> Drivers
          </Link>
          <Link to="/login" className="flex items-center gap-2 hover:text-yellow-300">
            <LogOut size={20} /> Logout
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="text-blue-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Customer Management</h2>
            </div>
            <p className="text-sm text-gray-500">Welcome, Admin</p>
          </div>

          <form onSubmit={handleAddCustomer} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Customer Name"
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="p-3 border border-gray-300 rounded-lg"
              required
            />
            <button
              type="submit"
              className="col-span-1 sm:col-span-3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex justify-center items-center gap-2 transition"
            >
              <UserPlus size={20} /> Add Customer
            </button>
          </form>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border border-gray-300 rounded-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Phone</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-t">
                    <td className="p-3">{customer.id}</td>
                    <td className="p-3">{customer.name}</td>
                    <td className="p-3">{customer.email}</td>
                    <td className="p-3">{customer.phone}</td>
                  </tr>
                ))}
                {customers.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center p-4 text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerAdmin;
