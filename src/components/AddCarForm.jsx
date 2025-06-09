import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const AddCarForm = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    vehicle_number: "",
    model: "",
    color: "",
    year: "",
    type: "",
  });
  const [message, setMessage] = useState({ success: "", error: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ success: "", error: "" });
    setErrors({});
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/vehicles",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setMessage({ success: "✅ រថយន្តត្រូវបានបញ្ចូលដោយជោគជ័យ", error: "" });
      setFormData({ vehicle_number: "", model: "", color: "", year: "", type: "" });
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 422 && data.errors) {
          setErrors(data.errors);
        } else if (data.message) {
          setMessage({ success: "", error: `❌ ${data.message}` });
        } else {
          setMessage({ success: "", error: "❌ មានបញ្ហាផ្សេងៗ។ សូមព្យាយាមម្ដងទៀត" });
        }
      } else {
        setMessage({ success: "", error: `❌ សម្គាល់កំហុស connection: ${err.message}` });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold">បញ្ចូលព័ត៌មានរថយន្ត</h2>

      {message.error && <p className="text-red-600">{message.error}</p>}
      {message.success && <p className="text-green-600">{message.success}</p>}

      {[
        {label: "លេខផ្ទាំង", name: "vehicle_number", type: "text"},
        {label: "ម៉ូដែល", name: "model", type: "text"},
        {label: "ពណ៌", name: "color", type: "text"},
        {label: "ឆ្នាំផលិត", name: "year", type: "number"},
        {label: "ប្រភេទ", name: "type", type: "text"},
      ].map(({label, name, type}) => (
        <div key={name}>
          <label className="block mb-1">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors[name] && <p className="text-red-500">{errors[name][0]}</p>}
        </div>
      ))}

      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "កំពុងដំណើរការ..." : "បញ្ចូលរថយន្ត"}
      </button>
    </form>
  );
};

export default AddCarForm;
