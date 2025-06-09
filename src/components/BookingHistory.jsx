import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import dayjs from "dayjs";

const BookingHistory = () => {
  const { user, signOut } = useAuth();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/booking/current", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setBooking(res.data.data || null);
      } catch (err) {
        console.error("Fetch booking error", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.token) fetchBooking();
  }, [user]);

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>📜</span> ប្រវត្តិកក់
        </h2>
        <button
          onClick={signOut}
          className="text-red-600 hover:text-red-700 font-semibold transition-colors duration-200"
          aria-label="Sign out"
        >
          ចេញពីប្រព័ន្ធ
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">កំពុងផ្ទុក...</p>
      ) : booking ? (
        <ul>
          <li className="border border-gray-200 rounded-lg p-5 bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-3">
              <span className="font-semibold text-gray-700">ID:</span>{" "}
              <span className="text-gray-900">{booking.id}</span>
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-700">ប្រភេទ:</span>{" "}
              <span className="text-blue-600 capitalize">{booking.booking_type}</span>
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-700">ស្ថានភាព:</span>{" "}
              <span
                className={`font-semibold ${
                  booking.status === "accepted"
                    ? "text-green-600"
                    : booking.status === "cancelled"
                    ? "text-red-600"
                    : "text-yellow-600"
                } capitalize`}
              >
                {booking.status}
              </span>
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-700">តម្លៃ:</span>{" "}
              <span className="text-gray-900">{booking.price} {booking.currency}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">កាលបរិច្ឆេទ:</span>{" "}
              <span className="text-gray-600">
                {dayjs(booking.created_at).format("DD/MM/YYYY HH:mm")}
              </span>
            </div>
          </li>
        </ul>
      ) : (
        <p className="text-center text-gray-500 italic mt-8">មិនមានប្រវត្តិការកក់ទេ។</p>
      )}
    </div>
  );
};

export default BookingHistory;
