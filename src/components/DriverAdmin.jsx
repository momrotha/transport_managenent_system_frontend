import React, { useState, useEffect } from 'react';
import { CarFront, BadgePlus, LayoutDashboard, Users, LogOut, Pencil, Trash2 } from 'lucide-react';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const carTypeOptions = [
  { value: 'Sedan', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'Truck', label: 'Truck' },
  { value: 'Van', label: 'Van' },
  { value: 'Motorbike', label: 'Motorbike' },
];

const DriverAdmin = () => {
  const [formData, setFormData] = useState({
    carName: '',
    model: '',
    type: null,
    plateNumber: '',
    color: '',
  });

  const [cars, setCars] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
      setCars(res.data);
    } catch (error) {
      console.error('Error fetching cars', error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (selectedOption) => {
    setFormData({ ...formData, type: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, type: formData.type?.value || '' };
      if (editMode) {
        await axios.put(`${import.meta.env.VITE_API_URL}/cars/${editId}`, payload);
        alert('Car updated successfully!');
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/cars`, payload);
        alert('Car added successfully!');
      }
      setFormData({ carName: '', model: '', type: null, plateNumber: '', color: '' });
      setEditMode(false);
      setEditId(null);
      fetchCars();
    } catch (error) {
      alert('Error saving car');
      console.error(error);
    }
  };

  const handleEdit = (car) => {
    setFormData({
      carName: car.carName,
      model: car.model,
      type: car.type ? { label: car.type, value: car.type } : null,
      plateNumber: car.plateNumber,
      color: car.color,
    });
    setEditMode(true);
    setEditId(car.id);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this car?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${id}`);
        fetchCars();
      } catch (error) {
        alert('Error deleting car');
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-5 space-y-6">
        <div className="text-2xl font-bold text-blue-600">Admin Panel</div>
        <nav className="flex flex-col space-y-4 text-gray-700 font-medium">
          <a href="#" className="flex items-center gap-2 hover:text-blue-600">
            <LayoutDashboard size={18} /> Dashboard
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-600">
            <CarFront size={18} /> Manage Cars
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-blue-600">
            <Users size={18} /> Users
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-red-500 mt-10">
            <LogOut size={18} /> Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="bg-white rounded-2xl shadow p-8 max-w-3xl mx-auto">
          <div className="flex items-center mb-6 space-x-3">
            <CarFront className="text-blue-600" size={30} />
            <h2 className="text-2xl font-bold text-gray-700">
              {editMode ? 'Edit Car Details' : 'Add Car Details'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-600 font-medium mb-1">Car Name</label>
              <input
                type="text"
                name="carName"
                value={formData.carName}
                onChange={handleChange}
                placeholder="e.g. Toyota Prius"
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="e.g. 2023"
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Car Type</label>
              <CreatableSelect
                isClearable
                onChange={handleTypeChange}
                options={carTypeOptions}
                value={formData.type}
                placeholder="Select or type car type"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    borderColor: state.isFocused ? '#3b82f6' : '#d1d5db',
                    boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : undefined,
                    borderRadius: '0.5rem',
                    padding: '2px',
                    minHeight: '3rem',
                  }),
                }}
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Plate Number</label>
              <input
                type="text"
                name="plateNumber"
                value={formData.plateNumber}
                onChange={handleChange}
                placeholder="e.g. 2X-2025"
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="e.g. White"
                className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-md w-full transition"
            >
              <BadgePlus size={20} /> {editMode ? 'Update Car' : 'Add Car'}
            </button>
          </form>
        </div>

        {/* List of Cars */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6 max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Car List</h3>
          <table className="w-full table-auto text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Model</th>
                <th className="p-3">Type</th>
                <th className="p-3">Plate</th>
                <th className="p-3">Color</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="border-t border-gray-200">
                  <td className="p-3">{car.carName}</td>
                  <td className="p-3">{car.model}</td>
                  <td className="p-3">{car.type}</td>
                  <td className="p-3">{car.plateNumber}</td>
                  <td className="p-3">{car.color}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(car)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DriverAdmin;
