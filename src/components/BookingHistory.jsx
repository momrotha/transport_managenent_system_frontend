import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import dayjs from "dayjs";

const BookingHistory = () => {
  const { user, signOut } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/booking/history", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setHistory(res.data.data || []);
      } catch (err) {
        console.error("Fetch history error", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchHistory();
  }, [user]);

  return (
    <div className="bg-white shadow-md rounded p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">📜 ប្រវត្តិកក់</h2>
        <button onClick={signOut} className="text-red-600 hover:underline">ចេញពីប្រព័ន្ធ</button>
      </div>

      {loading ? (
        <p>កំពុងផ្ទុកប្រវត្តិ...</p>
      ) : history.length === 0 ? (
        <p className="text-gray-600">មិនមានប្រវត្តិទេ។</p>
      ) : (
        <ul className="space-y-3">
          {history.map((b) => (
            <li key={b.id} className="border rounded p-4 bg-gray-50">
              <p><strong>ID:</strong> {b.id}</p>
              <p><strong>ប្រភេទ:</strong> {b.booking_type}</p>
              <p><strong>ស្ថានភាព:</strong> {b.status}</p>
              <p><strong>កាលបរិច្ឆេទ:</strong> {dayjs(b.created_at).format("DD/MM/YYYY HH:mm")}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
