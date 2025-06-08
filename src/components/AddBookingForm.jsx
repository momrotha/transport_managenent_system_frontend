import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const AddBookingForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    booking_type: "",
    price: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ error: "", success: "" });

    if (!formData.booking_type || !formData.price || !formData.date) {
      setMessage({ error: "សូមបំពេញទិន្នន័យទាំងអស់", success: "" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/booking",
        {
          booking_type: formData.booking_type,
          price: Number(formData.price),
          date: formData.date,
        },
        {
          headers: { Authorization: `Bearer ${user?.token}` },
        }
      );
      setMessage({ success: "ការកក់ត្រូវបានបង្កើតដោយជោគជ័យ!", error: "" });
      setFormData({ booking_type: "", price: "", date: "" });
    } catch (error) {
      setMessage({ error: "មានបញ្ហា សូមព្យាយាមម្តងទៀត", success: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">បង្កើតការកក់ថ្មី</h2>

      {message.error && (
        <p className="text-red-600 bg-red-100 p-2 rounded">{message.error}</p>
      )}
      {message.success && (
        <p className="text-green-600 bg-green-100 p-2 rounded">{message.success}</p>
      )}

      <div>
        <label className="block mb-1 font-medium" htmlFor="booking_type">
          ប្រភេទកក់
        </label>
        <input
          type="text"
          id="booking_type"
          name="booking_type"
          value={formData.booking_type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ដូចជា កក់រថយន្ត, កក់ផ្ទះ..."
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="price">
          តម្លៃ (រៀល)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          value={formData.price}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ដូចជា 50000"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium" htmlFor="date">
          កាលបរិច្ឆេទ
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "កំពុងដំណើរការ..." : "បញ្ជូន"}
      </button>
    </form>
  );
};

export default AddBookingForm;
