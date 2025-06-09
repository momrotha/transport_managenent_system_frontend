import React from "react";
import { useAuth } from "../hooks/useAuth";

const ProfileCard = () => {
  const { user } = useAuth();

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-bold mb-4">👋 សូមស្វាគមន៍ {user.name}</h2>
      {/* <p><strong> Email:</strong> {user.email}</p> */}
      {user.phone_number && (
        <p><strong>លេខទូរស័ព្ទ:</strong> {user.phone_number}</p>
      )}
    </div>
  );
};

export default ProfileCard;
