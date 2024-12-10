import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setUserData } = useUser();

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("https://fullstack-intern-user-management-backend.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Login successful: ${data.message}`);
        
        setUserData(data.user);

        // Redirect based on user type
        navigate(`/dashboard`);

        // if (data.user.userType === "admin") {
        // }else if (data.user.userType === "agent") {
        //   navigate(`/dashboard/agent`);
        // } else if (data.user.userType === "user") {
        //   navigate(`/dashboard/user`);
        // }
      } else {
        setErrorMessage(data.message || "Login failed. Please try again.");
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-4xl shadow-lg bg-white">
        {/* Left side - Form Section */}
        <div className="w-1/2 p-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <p className="text-gray-500">
              Please login to continue with your account
            </p>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="jonas.kahnwald@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-purple-400 text-white py-2 rounded-md hover:bg-blue-400 transition"
            >
              Login
            </button>

            {/* Sign in option */}
            <p className="text-center text-gray-500 mt-4">
              Need an account?{" "}
              <Link to="/Signup" className="text-blue-600">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
