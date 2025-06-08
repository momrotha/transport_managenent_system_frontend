import React from "react";

const Sidebar = () => (
  <aside className="w-64 bg-white shadow-lg p-6">
    <h2 className="text-xl font-bold mb-6">Driver Panel</h2>
    <nav className="space-y-4">
      <a href="#bookings" className="block text-blue-600 font-semibold">📦 Bookings</a>
      <a href="#add-car" className="block text-blue-600 font-semibold">🚗 Add Car</a>
    </nav>
  </aside>
);

export default Sidebar;
