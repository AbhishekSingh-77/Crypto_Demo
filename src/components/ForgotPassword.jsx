import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import { API_URLS } from "../api/config";

const ForgotPassword = () => {
  const [form, setForm] = useState({
    email: "",
    question: "",
    new_password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = (field, value, formState = form) => {
    let newErrors = { ...errors };
    const data = field ? { ...formState, [field]: value } : formState;

    // Validations
    if (!data.email.trim()) newErrors.email = "*Email is required.";
    else delete newErrors.email;

    if (!data.question.trim()) newErrors.question = "*Answer is required.";
    else delete newErrors.question;

    if (!data.new_password) newErrors.new_password = "*Password is required.";
    else if (data.new_password.length < 7)
      newErrors.new_password = "*Minimum 7 characters.";
    else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(data.new_password))
      newErrors.new_password =
        "*Must have 1 uppercase, 1 number, and 1 special character.";
    else delete newErrors.new_password;

    if (!data.confirm_password)
      newErrors.confirm_password = "*Confirm your password.";
    else if (data.confirm_password !== data.new_password)
      newErrors.confirm_password = "*Passwords do not match.";
    else delete newErrors.confirm_password;

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    const validationErrors = validate(name, value, updatedForm);
    setErrors(validationErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(null, null, form);
    if (Object.keys(validationErrors).length !== 0) {
      setErrors(validationErrors);
      toast.error("Please fix the errors before submitting.", {
        autoClose: 1200,
      });
      return;
    }

    axios
      .post(API_URLS.RESET_PASSWORD, form)
      .then(() => {
        toast.success("Password reset successful!", { autoClose: 1200 });
        setTimeout(() => navigate("/login"), 1800);
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message)
          toast.error(err.response.data.message, { autoClose: 1500 });
        else
          toast.error("Reset failed. Please try again.", { autoClose: 1500 });
      });
  };

  return (
    <section className="p-8 max-w-md mx-2 md:mx-auto mt-24 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* E-mail */}
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
            value={form.email}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="abc@example.com"
          />
          {errors.email && (
            <div className="text-red-500 text-sm mt-1">{errors.email}</div>
          )}
        </div>

        <div className="mb-4">
          {/* Security Question */}
          <label
            htmlFor="question"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Security Question (Favourite Color):
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={form.question}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Blue"
          />
          {errors.question && (
            <div className="text-red-500 text-sm mt-1">{errors.question}</div>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label
            htmlFor="new_password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            New Password:
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new_password"
              name="new_password"
              value={form.new_password}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.new_password && (
            <div className="text-red-500 text-sm mt-1">
              {errors.new_password}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
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
              value={form.confirm_password}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
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

        {/* Reset Button */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 ease-in-out cursor-pointer"
        >
          Reset Password
        </button>
      </form>

      {/* Login */}
      <p className="mt-6 text-center text-gray-600 text-sm">
        Remembered your password?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-semibold"
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

export default ForgotPassword;
