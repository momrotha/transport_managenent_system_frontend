import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const ProfileCard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/customer/profile", {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        setProfile(res.data.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    if (user?.token) fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-xl font-bold mb-4">👋 សូមស្វាគមន៍ {profile.name}</h2>
      <p><strong>📧 Email:</strong> {profile.email}</p>
      {profile.phone && <p><strong>📱 លេខទូរស័ព្ទ:</strong> {profile.phone}</p>}
    </div>
  );
};

export default ProfileCard;
