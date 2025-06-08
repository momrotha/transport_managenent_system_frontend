import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const pollingIntervalRef = useRef(null);

  const fetchAvailableBookings = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/bookings/available", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailableBookings();
    pollingIntervalRef.current = setInterval(fetchAvailableBookings, 10000);
    return () => clearInterval(pollingIntervalRef.current);
  }, []);

  const doAction = async (url, successMsg, errMsg, id) => {
    try {
      await axios.post(url, { id }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(successMsg);
      fetchAvailableBookings();
    } catch {
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
            <div key={b.id} className="bg-gray-50 p-4 rounded shadow-sm flex flex-col md:flex-row md:justify-between md:items-center">
              <div>
                <p><strong>ID:</strong> {b.id}</p>
                <p><strong>Customer:</strong> {b.customer_id}</p>
                <p><strong>Type:</strong> {b.booking_type}</p>
                <p><strong>Status:</strong> {b.status}</p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <button onClick={() => doAction("http://127.0.0.1:8000/api/driver/accept", "អនុម័តបាន", "មិនអនុម័តបាន", b.id)} className="bg-green-600 text-white px-3 py-1 rounded">✅</button>
                <button onClick={() => doAction("http://127.0.0.1:8000/api/driver/cancel", "បោះបង់បាន", "មិនបោះបង់បាន", b.id)} className="bg-yellow-600 text-white px-3 py-1 rounded">❌</button>
                <button onClick={() => doAction("http://127.0.0.1:8000/bookings/complete", "បញ្ចប់បាន", "មិនបានបញ្ចប់", b.id)} className="bg-blue-600 text-white px-3 py-1 rounded">➤</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default BookingList;
