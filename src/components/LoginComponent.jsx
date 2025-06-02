import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  // const [userType, setUserType] = useState('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://2971-202-62-62-131.ngrok-free.app/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // 👉 បើ Laravel ប្រើ Sanctum
        body: JSON.stringify({
          email,
          password,
          // user_type: userType,
        }),
      });

      const data = await response.json();
      console.log("Response:", response);
      console.log("Data:", data);

      if (response.ok && data.status) {
        // 👉 Save token if returned
        if (data.data?.token) {
          localStorage.setItem('auth_token', data.data.token);
        }

        localStorage.setItem('user_role', data.data.user.role);
        localStorage.setItem('user', JSON.stringify(data.data.user));

        alert('Login successful!');

        // 👉 Navigate based on role
        if (data.data.user.role === 'customer') {
          navigate('/customer');
        } else if (data.data.user.role === 'driver') {
          navigate('/driver');
        } else {
          setError('Invalid user role.');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error("Login error:", error);
      setError('Something went wrong. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <section className="bg-[#200052] min-h-screen flex flex-col justify-center items-center px-5 py-10">
      <form
        onSubmit={handleLogin}
        className="flex rounded-[30px] mx-auto p-5 flex-col items-center gap-8 bg-[#270082] w-[700px]"
      >
        <h1 className="pt-7 text-white text-6xl font-bold tracking-widest">Login</h1>

        <div className="flex gap-16 text-white font-semibold text-lg">
          {/* <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="customer"
              checked={userType === 'customer'}
              onChange={() => setUserType('customer')}
              className="w-5 h-5 accent-[#7a0bc0]"
            />
            Customer
          </label> */}
          {/* <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="userType"
              value="driver"
              checked={userType === 'driver'}
              onChange={() => setUserType('driver')}
              className="w-5 h-5 accent-[#7a0bc0]"
            />
            Driver
          </label> */}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-white text-[20px] font-medium">Email</label>
          <input
            type="email"
            required
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-white bg-[#270082] focus:border-white outline-none py-3 px-8 text-xl rounded-[50px] border-[3px] border-[#7A0BC0]"
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label className="text-white text-[20px] font-medium">Password</label>
          <input
            type="password"
            required
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full text-white bg-[#270082] focus:border-white outline-none py-3 px-8 text-xl rounded-[50px] border-[3px] border-[#7A0BC0]"
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-[300px] h-[62px] bg-gradient-to-r from-[#7a0bc0] to-[#fa58b6] rounded-[10px] shadow-lg text-white text-[32px] font-bold tracking-wide"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <span className="text-white text-[15px] font-medium">
          Don't have an account?{' '}
          <a href="/signup" className="text-[#fa58b6] underline">
            Sign up
          </a>
        </span>
      </form>
    </section>
  );
};

export default LoginComponent;
