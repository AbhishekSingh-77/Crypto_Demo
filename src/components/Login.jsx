import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { API_URLS } from "../api/config";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validate = (field, value, formState = form) => {
    let newErrors = { ...errors };
    const data = field ? { ...formState, [field]: value } : formState;

    // Validations
    if (!data.email.trim()) newErrors.email = "*Email is required.";
    else delete newErrors.email;

    if (!data.password) newErrors.password = "*Password is required.";
    else delete newErrors.password;

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    const validationErrors = validate(name, value, updatedForm);
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(null, null, form);

    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting!", {
        autoClose: 1000,
      });
      return;
    }

    try {
      const res = await axios.post(API_URLS.LOGIN, form);
      toast.success("Login successful!", { autoClose: 1000 });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("email", res.data.register_details.email);

      setTimeout(() => {
        setForm({ email: "", password: "" });
        setErrors({});
        navigate("/profile");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        const message =
          err.response.data.message || "Invalid email or password!";
        toast.error(message, { autoClose: 1000 });
      } else {
        toast.error("Network error. Please try again!", { autoClose: 1000 });
      }
    }
  };

  return (
    <section className="p-8 max-w-md mx-2 md:mx-auto mt-28 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500"
            placeholder="abc@example.com"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <div className="text-red-500 text-sm mt-1">{errors.password}</div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 cursor-pointer hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-200 ease-in-out"
        >
          Log In
        </button>
      </form>

      {/* Signup redirect */}
      <p className="mt-6 text-center text-gray-600 text-sm">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:underline font-semibold cursor-pointer"
        >
          Sign Up
        </Link>
      </p>

      {/* Forgot Password */}
      <p className="mt-3 text-center text-gray-600 text-sm">
        <span>Forgot your password? </span>
        <Link
          to="/forgotPassword"
          className="text-blue-600 hover:underline font-semibold cursor-pointer"
        >
          Reset it here
        </Link>
      </p>

      <ToastContainer
        position="top-center"
        autoClose={1000}
        toastClassName="text-lg font-bold bg-green-600 text-white rounded-lg shadow-lg"
        bodyClassName="text-lg"
        closeButton={true}
      />
    </section>
  );
};

export default Login;
