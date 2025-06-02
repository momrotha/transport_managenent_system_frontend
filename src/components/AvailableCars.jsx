import React from 'react';
import { CarFront, Clock3, CalendarCheck2 } from 'lucide-react';

const carsData = [
  {
    id: 1,
    driver: 'Mr. Dara',
    carName: 'Toyota Hiace',
    route: 'Phnom Penh → Siem Reap',
    departureDate: '2025-06-05',
    departureTime: '07:00 AM',
    arrivalTime: '12:00 PM',
  },
  {
    id: 2,
    driver: 'Mrs. Sreyneang',
    carName: 'Hyundai Starex',
    route: 'Phnom Penh → Battambang',
    departureDate: '2025-06-06',
    departureTime: '08:30 AM',
    arrivalTime: '01:45 PM',
  },
];

const AvailableCars = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          <CarFront className="text-blue-600" /> Available Trips
        </h2>

        <div className="grid gap-6">
          {carsData.map((car) => (
            <div key={car.id} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{car.carName}</p>
                  <p className="text-sm text-gray-500">Driver: {car.driver}</p>
                  <p className="text-sm text-gray-600 mt-1">Route: <span className="font-medium">{car.route}</span></p>
                </div>

                <div className="text-sm text-gray-700 space-y-1">
                  <p className="flex items-center gap-2">
                    <CalendarCheck2 className="text-green-600" size={18} />
                    Departure: <span className="font-semibold">{car.departureDate}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock3 className="text-yellow-600" size={18} />
                    Time: <span className="font-semibold">{car.departureTime}</span> → <span className="font-semibold">{car.arrivalTime}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {carsData.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No cars available at this moment.</p>
        )}
      </div>
    </div>
  );
};

export default AvailableCars;
