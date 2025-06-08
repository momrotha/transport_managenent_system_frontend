import React from "react";
import { useAuth } from "../hooks/useAuth";
import ProfileCard from "../components/ProfileCard";
import CurrentBooking from "../components/CurrentBooking";
import BookingHistory from "../components/BookingHistory";
import AddBookingForm from "../components/AddBookingForm";

const CustomerDashboard = () => {
  const { signOut } = useAuth();

  const handleSignOut = () => {
    if (window.confirm("តើអ្នកពិតជាចង់ចាកចេញមែនទេ?")) {
      signOut();
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-8">
      <ProfileCard />
      <CurrentBooking />
      <BookingHistory />
      <AddBookingForm />
      <div className="flex justify-center">
        <button
          onClick={handleSignOut}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          ចេញពីប្រព័ន្ធ
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
