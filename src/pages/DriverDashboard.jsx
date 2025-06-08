import React from "react";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import BookingList from "../components/BookingList";
import AddCarForm from "../components/AddCarForm";

const DriverDashboard = () => {
  const { signOut } = useAuth();

  const handleCancel = () => {
    if (window.confirm("តើអ្នកពិតជាចង់ចាកចេញមែនទេ?")) {
      signOut();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 space-y-6">
          <BookingList />
          <AddCarForm />

          {/* ប៊ូតុង Logout */}
          <button
            onClick={handleCancel}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Cancel and Logout
          </button>
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;
