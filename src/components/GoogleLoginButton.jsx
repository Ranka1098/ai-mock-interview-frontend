import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../utils/firebaseConfig.js";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GoogleLoginButton = () => {
  const [person, setPerson] = useState(null);

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const userData = res.user;

      const userInfo = {
        displayName: userData.displayName,
        email: userData.email,
        photoURL: userData.photoURL,
        firstName: userData.displayName?.split(" ")[0] || "",
        lastName: userData.displayName?.split(" ")[1] || "",
      };

      setPerson(userInfo); // Optional: only if you need it later

      // ✅ Use userInfo directly
      const response = await axios.post(
        "http://localhost:3000/api/auth/googleLogin",
        {
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          photoURL: userInfo.photoURL,
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
      console.log("Google backend response", response.data);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div
      onClick={handleGoogleLogin}
      className="flex justify-center items-center gap-5 cursor-pointer border p-1 rounded-md border-gray-300 hover:border-blue-500 "
    >
      <FcGoogle size={25} />
      <span className="font-semibold">Sign In With Google</span>
    </div>
  );
};

export default GoogleLoginButton;
