import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const pollingRef = useRef(null);

  // <-- Updated API endpoint here -->
  const fetchAvailableBookings = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/driver/bookings",  // <-- change this to your real endpoint
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookings(res.data.data || []);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setBookings([]); // clear bookings on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableBookings();
    pollingRef.current = setInterval(fetchAvailableBookings, 10000);
    return () => clearInterval(pollingRef.current);
  }, []);

  const doAction = async (endpoint, successMsg, errMsg, id) => {
    try {
      await axios.post(
        `http://127.0.0.1:8000${endpoint}`,
        { id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(successMsg);
      fetchAvailableBookings();
    } catch (err) {
      console.error(`Error calling ${endpoint}:`, err);
      alert(errMsg);
    }
  };

  if (loading) return <p id="bookings">កំពុងផ្ទុក...</p>;

  return (
    <section id="bookings" className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">📦 ការកក់រងចាំ</h2>
      {bookings.length === 0 ? (
        <p>មិនមានការកក់រងចាំទេ</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-gray-50 p-4 rounded shadow-sm flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p><strong>ID:</strong> {b.id}</p>
                <p><strong>Customer:</strong> {b.customer_id}</p>
                <p><strong>Type:</strong> {b.booking_type}</p>
                <p><strong>Status:</strong> {b.status}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button
                  onClick={() =>
                    doAction(
                      "/api/driver/accept",
                      "✅ បានអនុម័តការកក់!",
                      "❌ មិនអនុម័តបាន។",
                      b.id
                    )
                  }
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  ✅
                </button>
                <button
                  onClick={() =>
                    doAction(
                      "/api/driver/cancel",
                      "បានបោះបង់ការកក់!",
                      "មិនអាចបោះបង់បាន។",
                      b.id
                    )
                  }
                  className="bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  ❌
                </button>
                <button
                  onClick={() =>
                    doAction(
                      "/bookings/complete",
                      "➤ បានបញ្ចប់ដំណើរការ!",
                      "⚠️ មិនអាចបញ្ចប់បាន។",
                      b.id
                    )
                  }
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  ➤
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BookingList;
