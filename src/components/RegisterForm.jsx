import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    user_type: "customer",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (formData.password !== formData.password_confirmation) {
      setError("Passwords do not match");
      return;
    }

    const result = await signUp(formData);

    if (result.success) {
      setMessage("Registration successful! Redirecting...");
      // Redirect immediately or after a short delay:
      setTimeout(() => {
        if (result.user_type === "driver") {
          navigate("/driver-dashboard");
        } else {
          navigate("/customer-dashboard");
        }
      }, 1000);
    } else {
      setError(result.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-purple-400  to-red-400 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
        {message && <div className="mb-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">{message}</div>}

        <form onSubmit={handleSubmit}>
          {/* name */}
          <label className="block text-sm font-bold mb-1">Name:</label>
          <input name="name" required value={formData.name} onChange={handleChange} className="mb-4 border rounded w-full py-2 px-3" />

          {/* email */}
          <label className="block text-sm font-bold mb-1">Email:</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} className="mb-4 border rounded w-full py-2 px-3" />

          {/* password */}
          <label className="block text-sm font-bold mb-1">Password:</label>
          <input type="password" name="password" minLength={6} required value={formData.password} onChange={handleChange} className="mb-4 border rounded w-full py-2 px-3" />

          {/* password confirmation */}
          <label className="block text-sm font-bold mb-1">Confirm Password:</label>
          <input type="password" name="password_confirmation" minLength={6} required value={formData.password_confirmation} onChange={handleChange} className="mb-4 border rounded w-full py-2 px-3" />

          {/* phone number */}
          <label className="block text-sm font-bold mb-1">Phone Number:</label>
          <input type="tel" name="phone_number" required value={formData.phone_number} onChange={handleChange} className="mb-4 border rounded w-full py-2 px-3" />

          {/* user type */}
          <label className="block text-sm font-bold mb-1">Register as:</label>
          <select name="user_type" value={formData.user_type} onChange={handleChange} className="mb-6 border rounded w-full py-2 px-3">
            <option value="customer">Customer</option>
            <option value="driver">Driver</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600 w-full">
            Register
          </button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
