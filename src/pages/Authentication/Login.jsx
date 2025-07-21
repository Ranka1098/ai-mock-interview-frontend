import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import GoogleLoginButton from "../../components/GoogleLoginButton";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState("");

  const [loading, setLoading] = useState(false);

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      setUser(res.data);

      if (res.status === 200) {
        toast.success("login in successfully");
        navigate("/");
        setFormData({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "failed to login");
    } finally {
      setLoading(false);
    }

    console.log(user);
    if (formData)
      setFormData({
        email: "",
        password: "",
      });
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Login</h1>
          <h3 className="text-gray-600">Welcome back to AI Mocked Interview</h3>
        </div>
        <div>
          <GoogleLoginButton />
        </div>

        <div className="flex items-center gap-4 my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="username"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email Here..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="Enter Password Here..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                className="absolute right-5 top-8 cursor-pointer"
                type="button"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaRegEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-500 cursor-pointer text-white font-semibold py-2 rounded-lg hover:bg-purple-600 transition-all duration-300"
            >
              {loading ? "Wait for signin..." : "Sign In"}
            </button>
          </div>
        </form>

        {/* Sign-up Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-purple-500 hover:underline cursor-pointer"
            onClick={() => {
              navigate("/register");
            }}
          >
            Sign Up
          </span>
        </p>
        {/* - */}
        <p
          className="text-center text-sm text-gray-600 mt-4 cursor-pointer hover:underline"
          onClick={() => {
            navigate("/forgetpassword");
          }}
        >
          Forget password
        </p>
      </div>
    </div>
  );
};

export default Login;
