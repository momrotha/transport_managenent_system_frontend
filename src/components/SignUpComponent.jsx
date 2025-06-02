import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert('Please accept the Terms & Conditions');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!formData.userType) {
      alert('Please select a user type');
      return;
    }

    const postData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPassword, // Laravel expects this field
      userType: formData.userType,
    };

    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error: ' + (errorData.message || JSON.stringify(errorData.errors)));
        return;
      }

      await response.json();
      alert('✅ ចុះឈ្មោះជោគជ័យ!');

      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
        termsAccepted: false,
      });

      // Redirect to login page after successful signup
      navigate('/login');

    } catch (error) {
      alert('Failed to fetch API: ' + error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <section className="bg-[#200052] min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex rounded-[30px] mx-auto p-8 flex-col items-center gap-5 bg-[#270082] w-[700px]"
        >
          <h1 className="pt-2 mx-auto text-white text-5xl font-bold font-['Quicksand'] tracking-widest">
            Sign up
          </h1>

          <div className="flex w-full gap-8">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-white text-[20px] font-medium tracking-wide">First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full text-white bg-[#270082] focus:border-white outline-none py-3 px-8 text-xl rounded-[50px] border-[3px] border-[#7A0BC0]"
                required
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label className="text-white text-[20px] font-medium tracking-wide">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full text-white bg-[#270082] focus:border-white outline-none py-3 px-8 text-xl rounded-[50px] border-[3px] border-[#7A0BC0]"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-white text-[20px] font-medium tracking-wide">Email</label>
            <input
              type="email"
              name="email"
              placeholder="johndoe@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full text-white bg-[#270082] focus:border-white outline-none py-3 px-8 text-xl rounded-[50px] border-[3px] border-[#7A0BC0]"
              required
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-white text-[20px] font-medium tracking-wide">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full text-white bg-[#270082] focus:border-white outline-none py-3 px-8 text-xl rounded-[50px] border-[3px] border-[#7A0BC0]"
              required
              minLength={6}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-white text-[20px] font-medium tracking-wide">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="********"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full text-white bg-[#270082] focus:border-white outline-none py-3 px-8 text-xl rounded-[50px] border-[3px] border-[#7A0BC0]"
              required
              minLength={6}
            />
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-white text-[20px] font-medium tracking-wide">I am a:</label>
            <div className="flex gap-8 text-white text-[18px] font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="customer"
                  checked={formData.userType === 'customer'}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#7a0bc0]"
                  required
                />
                Customer
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  value="driver"
                  checked={formData.userType === 'driver'}
                  onChange={handleChange}
                  className="w-5 h-5 accent-[#7a0bc0]"
                />
                Driver
              </label>
            </div>
          </div>

          <div className="flex gap-2 items-center w-full">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-[23px] h-[23px] appearance-none bg-[#270082] border-2 border-[#7a0bc0] rounded-[5px] checked:bg-[#7a0bc0] checked:border-[#270082] focus:ring-2 focus:ring-[#7a0bc0] transition"
              required
            />
            <span className="text-white text-[15px] font-normal tracking-tight">
              I hereby confirm that I have read all the Terms & Conditions carefully and I agree with the same.
            </span>
          </div>

          <button
            type="submit"
            disabled={!formData.termsAccepted}
            className={`w-[300px] h-[62px] rounded-[10px] shadow-[4px_4px_60px_0px_rgba(0,0,0,0.25)] text-white text-[32px] font-bold tracking-wide ${
              formData.termsAccepted
                ? 'bg-gradient-to-r from-[#7a0bc0] to-[#fa58b6]'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Sign up
          </button>

          <span className="text-white text-[15px] font-medium tracking-tight">
            Already have an account?{' '}
            <Link to="/login" className="text-[#fa58b6] underline cursor-pointer">
              Log in
            </Link>
          </span>
        </form>
      </section>
    </div>
  );
};

export default SignUpComponent;
