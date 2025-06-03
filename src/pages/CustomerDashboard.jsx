import React from "react";
import { useAuth } from "../hooks/useAuth";

const CustomerDashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-800">
          Customer Dashboard
        </h2>
        {user && (
          <p className="text-lg mb-6">
            Welcome, Customer! Your token:{" "}
            <span className="font-mono text-sm break-all">{user.token}</span>
          </p>
        )}
        <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;
