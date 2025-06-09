import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const AddBookingForm = () => {
  const { user } = useAuth();

  const [bookingType, setBookingType] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ error: "", success: "" });

    if (!bookingType) {
      setMessage({ error: "សូមបំពេញប្រភេទកក់", success: "" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/booking",
        { booking_type: bookingType },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      setMessage({ success: "ការកក់ត្រូវបានបង្កើតដោយជោគជ័យ!", error: "" });
      setBookingType("");
    } catch (err) {
      console.error("Booking creation error", err);
      setMessage({ error: "មានបញ្ហា, សូមព្យាយាមម្ដងទៀត", success: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">
        បង្កើតការកក់ថ្មី
      </h2>

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
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="ឧ. ride, delivery"
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
