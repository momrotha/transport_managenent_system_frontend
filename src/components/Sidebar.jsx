// import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { CarFront, Users } from 'lucide-react';

// const Sidebar = () => {
//   return (
//     <aside className="w-64 bg-white shadow-lg p-4 hidden sm:block">
//       <h2 className="text-xl font-bold text-blue-600 mb-6">Admin Dashboard</h2>
//       <nav className="space-y-2">
//         <NavLink
//           to="/drivers"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${
//               isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
//             }`
//           }
//         >
//           <CarFront size={20} /> Manage Drivers
//         </NavLink>
//         <NavLink
//           to="/customers"
//           className={({ isActive }) =>
//             `flex items-center gap-2 px-3 py-2 rounded-lg font-medium ${
//               isActive ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
//             }`
//           }
//         >
//           <Users size={20} /> Manage Customers
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
