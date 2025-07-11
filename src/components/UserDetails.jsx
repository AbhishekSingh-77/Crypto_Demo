import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Trash2, UserCircle, Upload, ArrowBigLeft } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { API_URLS } from "../api/config";

const UserDetails = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    dob: "",
    created_at: "",
    photo_url: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentSecurityAnswer: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const photoInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/login");
      return;
    }

    axios
      .get(API_URLS.PROFILE(email))
      .then((res) => {
        const { username, email, dob, created_at, photo_url } = res.data;
        setProfile({ username, email, dob, created_at, photo_url });
      })
      .catch((err) => {
        console.error("Failed to fetch profile:", err);
        toast.error("Failed to load profile.");
      });
  }, [navigate]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    axios
      .post(API_URLS.PHOTO_UPLOAD(profile.email), formData)
      .then((res) => {
        toast.success("Photo uploaded!");
        setProfile((prev) => ({
          ...prev,
          photo_url: res.data.photo_url + `?v=${Date.now()}` || "",
        }));
      })
      .catch((err) => {
        console.error("Photo upload failed:", err);
        toast.error("Failed to upload photo.");
      });
  };

  const handlePhotoDelete = async () => {
    try {
      const response = await axios.delete(API_URLS.PHOTO_DELETE(profile.email));
      toast.success(response.data.message);
      setProfile((prev) => ({ ...prev, photo_url: null }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete photo.");
    }
  };

  const logoutHandler = () => {
    toast.success("Logged out.", { autoClose: 1000 });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    setTimeout(() => navigate("/login"), 1300);
  };

  const deleteAccountHandler = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This cannot be undone."
    );
    if (!confirmed) return;
    axios
      .delete(API_URLS.PROFILE(profile.email))
      .then(() => {
        toast.success("Account deleted.", { autoClose: 1500 });
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("email");
        setTimeout(() => navigate("/register"), 2200);
      })
      .catch((err) => {
        console.error("Error deleting account:", err);
        toast.error("Failed to delete account.");
      });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { currentSecurityAnswer, newPassword, confirmPassword } =
      passwordData;

    if (!currentSecurityAnswer || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    axios
      .put(API_URLS.PROFILE(profile.email), {
        current_security_answer: currentSecurityAnswer,
        new_password: newPassword,
        confirm_password: confirmPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
        setPasswordData({
          currentSecurityAnswer: "",
          newPassword: "",
          confirmPassword: "",
        });
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.error || "Failed to update password.";
        toast.error(errorMsg);
      });
  };

  return (
    <section className="max-w-6xl mx-2 xl:mx-auto mt-20 p-6 border rounded-2xl shadow-xl bg-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Panel */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          {profile.photo_url ? (
            <img
              src={profile.photo_url}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-600 shadow mb-3 object-cover"
            />
          ) : (
            <UserCircle
              size={120}
              strokeWidth={1.5}
              className="text-green-600 mb-3"
            />
          )}

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => photoInputRef.current.click()}
              className="flex items-center gap-1 text-sm text-green-600 hover:underline cursor-pointer"
            >
              <Upload size={16} /> Change Photo
            </button>
            <button
              type="button"
              onClick={handlePhotoDelete}
              className="flex items-center gap-1 text-sm text-red-600 hover:underline cursor-pointer"
            >
              <Trash2 size={16} /> Delete Photo
            </button>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={photoInputRef}
            className="hidden"
            onChange={handlePhotoUpload}
          />

          <div className="space-y-3 mt-6 w-full bg-gray-50 rounded-xl p-4 shadow-md border border-gray-200">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold w-28">Username:</span>
              <span>{profile.username}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold w-28">Email:</span>
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold w-28">D.O.B.:</span>
              <span>
                {profile.dob
                  ? new Date(profile.dob).toLocaleDateString("en-IN")
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold w-28">Created:</span>
              <span>
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleString("en-IN")
                  : "N/A"}
              </span>
            </div>
          </div>

          <Link
            to="/profile"
            className="flex items-center justify-center gap-2 w-full px-5 py-3 mt-4 text-lg font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
          >
            <ArrowBigLeft size={22} />
            Back To Dashboard
          </Link>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-2/3 space-y-6">
          <h2 className="text-2xl font-bold text-green-700">
            Change Your Account Password
          </h2>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label className="block font-semibold mb-1">
                Security Question Answer:
              </label>
              <input
                type="text"
                value={passwordData.currentSecurityAnswer}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    currentSecurityAnswer: e.target.value,
                  })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="Your favorite color"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">New Password:</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="New password"
                />
                <span
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">
                Confirm New Password:
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                  placeholder="Confirm new password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full my-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
            >
              Update Password
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={logoutHandler}
              className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
            >
              <LogOut size={18} /> Logout
            </button>

            <button
              onClick={deleteAccountHandler}
              className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition cursor-pointer"
            >
              <Trash2 size={18} /> Delete Account
            </button>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        toastClassName="text-lg font-bold bg-green-600 text-white rounded-lg shadow-lg"
        bodyClassName="text-lg"
        closeButton
      />
    </section>
  );
};

export default UserDetails;
