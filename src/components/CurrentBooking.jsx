import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import dayjs from "dayjs";

const CurrentBooking = () => {
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [message, setMessage] = useState({ error: "", success: "" });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://127.0.0.1:8000/api/booking/current", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setBooking(res.data.data);
      } catch (err) {
        console.error("Fetch booking error", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) fetchBooking();
  }, [user]);

  const handleCancel = async () => {
    if (!booking) return;
    setCancelLoading(true);
    try {
      await axios.delete(`http://127.0.0.1:8000/api/booking/${booking.id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setMessage({ success: "ការកក់ត្រូវបានបោះបង់ដោយជោគជ័យ", error: "" });
      setBooking(null);
    } catch (err) {
      setMessage({ success: "", error: "មិនអាចបោះបង់បាន សូមព្យាយាមម្ដងទៀត" });
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center py-6">
        <div className="loader border-4 border-blue-600 border-t-transparent rounded-full w-8 h-8 animate-spin"></div>
        <style>{`.loader { border-top-color: transparent; animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-semibold mb-4">🚗 ការកក់ប្រចាំថ្ងៃ</h2>
      {booking ? (
        <>
          <p><strong>ID:</strong> {booking.id}</p>
          <p><strong>ប្រភេទ:</strong> {booking.booking_type}</p>
          <p><strong>ស្ថានភាព:</strong> {booking.status}</p>
          <p><strong>តម្លៃ:</strong> {booking.price} {booking.currency}</p>
          <p><strong>កាលបរិច្ឆេទ:</strong> {dayjs(booking.created_at).format("DD/MM/YYYY HH:mm")}</p>

          {["pending", "accepted"].includes(booking.status) && (
            <button
              onClick={handleCancel}
              disabled={cancelLoading}
              className={`mt-4 px-4 py-2 rounded text-white ${
                cancelLoading ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {cancelLoading ? "កំពុងបោះបង់..." : "បោះបង់ការកក់"}
            </button>
          )}

          {message.error && <p className="text-red-600 mt-2">{message.error}</p>}
          {message.success && <p className="text-green-600 mt-2">{message.success}</p>}
        </>
      ) : (
        <p className="text-gray-600">មិនមានការកក់ប្រចាំថ្ងៃទេ។</p>
      )}
    </div>
  );
};

export default CurrentBooking;
