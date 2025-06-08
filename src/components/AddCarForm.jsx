import React, { useState } from "react";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    vehicle_number: "",
    model: "",
    color: "",
    year: "",
    type: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    setMessage("");
    setErrors({});

    try {
      const response = await fetch("http://localhost:8000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        setMessage("❌ Server returned non-JSON: " + text.slice(0, 100));
        return;
      }

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ រថយន្តត្រូវបានបញ្ចូលដោយជោគជ័យ");
        setFormData({
          vehicle_number: "",
          model: "",
          color: "",
          year: "",
          type: "",
        });
      } else if (response.status === 422) {
        setErrors(data.errors || {});
      } else {
        setMessage("❌ បញ្ហាផ្សេងៗ: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      setMessage("❌ បញ្ហា connection: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold">បញ្ចូលព័ត៌មានរថយន្ត</h2>

      <div>
        <label className="block">លេខផ្ទាំង</label>
        <input
          type="text"
          name="vehicle_number"
          value={formData.vehicle_number}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.vehicle_number && (
          <p className="text-red-500">{errors.vehicle_number[0]}</p>
        )}
      </div>

      <div>
        <label className="block">ម៉ូដែល</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {errors.model && <p className="text-red-500">{errors.model[0]}</p>}
      </div>

      <div>
        <label className="block">ពណ៌</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block">ឆ្នាំផលិត</label>
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block">ប្រភេទ</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
      </div>

      {message && <p className="mt-2 text-blue-600">{message}</p>}

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        បញ្ចូលរថយន្ត
      </button>
    </form>
  );
};

export default AddCarForm;
