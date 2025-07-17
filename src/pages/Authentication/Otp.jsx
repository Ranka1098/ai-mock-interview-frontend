import React, { useEffect, useRef, useState } from "react";
import ResendOtp from "./ResendOtp";
import { useNavigate } from "react-router-dom";

const otpLength = new Array(6).fill("");

const Otp = () => {
  const [otpFields, setOtpFields] = useState(otpLength);
  const ref = useRef([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    ref.current[0].focus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Enter OTP
        </h2>

        <div className="flex justify-center gap-4 mb-6">
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

        <div className="flex flex-col gap-3">
          <ResendOtp />

          <button
            onClick={() => {
              navigate("/login");
            }}
            className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition"
          >
            Verify OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
