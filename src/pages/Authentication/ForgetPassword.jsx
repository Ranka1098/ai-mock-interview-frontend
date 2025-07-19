import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [isEmail, setIsemail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClicked = async () => {
    try {
      if (isEmail.length === "") {
        return toast.error("enter email id");
      }
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/auth/forgetpassword",
        {
          email: isEmail,
        }
      );

      if (res.status === 200) {
        toast.success("otp sends your email");
        setIsemail("");
        navigate("/verifyPassword", { state: { email: isEmail } });
      }
    } catch (error) {
      toast.error(error.response?.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen p-2 flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Forgot Password
        </h2>

        <label htmlFor="email" className="block text-gray-600 font-medium mb-2">
          Email Address
        </label>
        <input
          id="email"
          value={isEmail}
          onChange={(e) => setIsemail(e.target.value)}
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={handleClicked}
          disabled={loading}
          className={`w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200 mb-4  loading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-600" `}
        >
          {loading ? "otp is endiing your email.." : "reset password"}
        </button>

        <p
          className="text-center text-sm text-gray-500 hover:underline cursor-pointer"
          onClick={() => {
            navigate("/login");
          }}
        >
          ← Back to login
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
