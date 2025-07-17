import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ResendOtp from "./ResendOtp";

const otpLength = new Array(6).fill("");

const VerifyPassword = () => {
  const [otpFields, setOtpFields] = useState(otpLength);

  const ref = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value.trim())) return;

    const copyOtp = [...otpFields];
    copyOtp[index] = value.slice(-1);
    setOtpFields(copyOtp);

    if (index < otpFields.length - 1) {
      ref.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;
    const copyOtp = [...otpFields];

    if (key === "Backspace") {
      if (copyOtp[index]) {
        copyOtp[index] = "";
        setOtpFields(copyOtp);
      } else if (index > 0) {
        copyOtp[index - 1] = "";
        setOtpFields(copyOtp);
        ref.current[index - 1].focus();
      }
    }

    if (key === "ArrowLeft" && index > 0) {
      ref.current[index - 1].focus();
    }

    if (key === "ArrowRight" && index < otpFields.length - 1) {
      ref.current[index + 1].focus();
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  return (
    <div className="min-h-screen p-2 flex items-center justify-center bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Verify Password
        </h2>

        <label className="block text-gray-600 font-medium mb-2">OTP</label>
        <div className="flex justify-between gap-1 mb-2">
          {otpFields.map((field, index) => (
            <input
              key={index}
              ref={(el) => (ref.current[index] = el)}
              type="text"
              maxLength={1}
              value={field}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ))}
        </div>
        <ResendOtp />

        <label className="block text-gray-600 font-medium mb-2">
          New Password
        </label>
        <input
          type="text"
          placeholder="Enter your new password"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex justify-center items-center w-full  border border-gray-300 rounded-lg bg-green-500  ">
          <button className="block  font-medium mb-2 p-1 text-white ">
            Update Password
          </button>
        </div>
        <p
          className="text-center text-gray-400 mt-2 cursor-pointer hover:underline"
          onClick={() => {
            navigate("/forgetpassword");
          }}
        >
          forget password
        </p>
      </div>
    </div>
  );
};

export default VerifyPassword;
