import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log({
      email,
      password,
      projectId: "664ece853e17537b70918cde",
    });
    try {
      const response = await axios.post(
        "https://configstaging.trainright.fit/api/users/login",
        {
          email,
          password,
          projectId: "664ece853e17537b70918cde",
        }
      );
      console.log("Login successful", response.data);
      // Store user profile and token in localStorage
      localStorage.setItem(
        "UserDetails",
        JSON.stringify(response.data.profile)
      );
      localStorage.setItem("Token", response.data.authToken);
      navigate("/");
    } catch (err) {
      console.error("Login error", err);
      setError("Login failed. Please check your email and password.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="126939604567-fb0s64i0qssep1g10g9qma9e4sek8iqv.apps.googleusercontent.com">
      <div className="bg-black text-white min-h-screen flex items-center justify-center w-full absolute px-4 md:px-0">
        <div className="absolute top-20">
          <h1 className="text-2xl md:text-3xl font-semibold text-center">
            <span className="text-white">Talk</span>
            <span className="text-blue-500">Better</span>
          </h1>
        </div>
        <div className="w-full max-w-md md:max-w-lg p-4 md:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold mt-2">
              Sign into your account
            </h2>
            <p className="text-zinc-400 font-medium">
              Manage your autonomous voice assistants in one dashboard
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 bg-[#1F1B29] rounded-md text-white"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-400"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full py-2 px-3 p-2 bg-[#1F1B29] rounded-md text-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-6 focus:outline-none"
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="white"
                    viewBox="0 0 256 256"
                  >
                    <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="white"
                    viewBox="0 0 256 256"
                  >
                    <path d="M53.92,34.62A8,8,0,1,0,42.08,45.38L61.32,66.55C25,88.84,9.38,123.2,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208a127.11,127.11,0,0,0,52.07-10.83l22,24.21a8,8,0,1,0,11.84-10.76Zm47.33,75.84,41.67,45.85a32,32,0,0,1-41.67-45.85ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.16,133.16,0,0,1,25,128c4.69-8.79,19.66-33.39,47.35-49.38l18,19.75a48,48,0,0,0,63.66,70l14.73,16.2A112,112,0,0,1,128,192Zm6-95.43a8,8,0,0,1,3-15.72,48.16,48.16,0,0,1,38.77,42.64,8,8,0,0,1-7.22,8.71,6.39,6.39,0,0,1-.75,0,8,8,0,0,1-8-7.26A32.09,32.09,0,0,0,134,96.57Zm113.28,34.16a142.67,142.67,0,0,0-21.37,31.12A145.79,145.79,0,0,0,213.57,128a134.88,134.88,0,0,0-27.93-29.36l16.49-22.13a8,8,0,1,0-13.65-8.87L189,81.63a8,8,0,0,0-1.12,11.56ZM165.17,164.75a8,8,0,0,1-11.36,0l-17.91-19.43a32,32,0,0,1-51.83-23.09l-17.83-20.63a96,96,0,0,0,95.87,63.48Z"></path>
                  </svg>
                )}
              </button>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
            >
              Sign In
            </button>
          </form>

          <div className="text-center space-y-4 mt-4">
            <button
              onClick={handleGoogleSignIn}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Sign in with Google
            </button>

            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
