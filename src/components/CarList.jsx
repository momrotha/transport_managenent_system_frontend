// components/CarList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2 } from 'lucide-react';

const CarList = ({ onEdit }) => {
  const [cars, setCars] = useState([]);

  const fetchCars = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/cars`);
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this car?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${id}`);
        fetchCars(); // Refresh
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-10">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Car List</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Model</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Plate</th>
              <th className="p-3 border">Color</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car.id} className="hover:bg-gray-50">
                <td className="p-3 border">{index + 1}</td>
                <td className="p-3 border">{car.carName}</td>
                <td className="p-3 border">{car.model}</td>
                <td className="p-3 border">{car.type}</td>
                <td className="p-3 border">{car.plateNumber}</td>
                <td className="p-3 border">{car.color}</td>
                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => onEdit(car)}
                    className="text-blue-500 hover:underline"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(car.id)}
                    className="text-red-500 hover:underline"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarList;
