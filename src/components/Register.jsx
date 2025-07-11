import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { API_URLS } from "../api/config";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    dob: "",
    security_question: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = (field, value, form = formData) => {
    let newErrors = { ...errors };
    const dataToValidate = field ? { ...form, [field]: value } : form;

    // Validations
    if (!dataToValidate.username.trim())
      newErrors.username = "*Username is required.";
    else if (!/^[A-Za-z\s]+$/.test(dataToValidate.username))
      newErrors.username = "*Only letters and spaces allowed.";
    else if (dataToValidate.username.trim().length < 3)
      newErrors.username = "*Username must be at least 3 characters.";
    else delete newErrors.username;

    if (!dataToValidate.email.trim()) newErrors.email = "*Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dataToValidate.email))
      newErrors.email = "*Please enter a valid email address.";
    else delete newErrors.email;

    if (!dataToValidate.password) newErrors.password = "*Password is required.";
    else if (dataToValidate.password.length < 7)
      newErrors.password = "*Password must contain at least 7 characters.";
    else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(dataToValidate.password)
    )
      newErrors.password =
        "*Must have 1 uppercase, 1 number, and 1 special character.";
    else delete newErrors.password;

    if (!dataToValidate.confirm_password)
      newErrors.confirm_password = "*Confirm your password.";
    else if (dataToValidate.confirm_password !== dataToValidate.password)
      newErrors.confirm_password = "*Passwords do not match.";
    else delete newErrors.confirm_password;

    if (!dataToValidate.dob) newErrors.dob = "*Date of birth is required.";
    else delete newErrors.dob;

    if (!dataToValidate.security_question.trim())
      newErrors.security_question = "*Answer is required.";
    else if (dataToValidate.security_question.length < 3)
      newErrors.security_question = "*At least 3 characters.";
    else delete newErrors.security_question;

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
    const validationErrors = validate(name, value, updatedForm);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(null, null, formData);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      return;
    }

    const { username, email, password, dob, security_question } = formData;
    axios
      .post(API_URLS.REGISTER, {
        username,
        email,
        password,
        dob,
        security_question,
      })
      .then(() => {
        toast.success("Registered successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
          dob: "",
          security_question: "",
        });
        setErrors({});
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errors = error.response.data;
          const errorMsgs = Object.values(errors)
            .map((arr) => arr[0])
            .join(" | ");
          toast.error(errorMsgs);
        } else {
          toast.error("Signup failed. Please try again.");
        }
      });
  };

  return (
    <section className="p-8 max-w-4xl mx-2 lg:mx-auto mt-18 mb-6 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Create Your Account
      </h2>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Your Full Name"
          />
          {errors.username && (
            <div className="text-red-500 text-sm mt-1">{errors.username}</div>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="abc@example.com"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        {/* Password */}
        <div>
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
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              placeholder="Enter your password"
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

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirm_password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password:
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirm_password && (
            <div className="text-red-500 text-sm mt-1">
              {errors.confirm_password}
            </div>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dob"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date of Birth:
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.dob && (
            <div className="text-red-500 text-sm mt-1">{errors.dob}</div>
          )}
        </div>

        {/* Security Question */}
        <div>
          <label
            htmlFor="security_question"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Security Question (Favourite Color):
          </label>
          <input
            type="text"
            id="security_question"
            name="security_question"
            value={formData.security_question}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. Blue"
          />
          {errors.security_question && (
            <div className="text-red-500 text-sm mt-1">
              {errors.security_question}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 cursor-pointer"
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-gray-600 text-sm">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-semibold cursor-pointer"
        >
          Login
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

export default Register;
