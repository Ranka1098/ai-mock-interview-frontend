import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ResendOtp = ({ email }) => {
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [timer > 0]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleClicked = async () => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/resendotp", {
        email: email,
      });
      if (res.status === 200) {
        toast.success("resend otp successfully");
        setTimer(60);
      }
    } catch (error) {
      toast.error(error.responce?.data?.messge);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        {timer > 0 ? (
          <p className="text-center">Remaning Time : {formatTime(timer)}</p>
        ) : (
          <button
            onClick={handleClicked}
            disabled={loading}
            className="w-full py-2 border border-indigo-500 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Resend OTP"}
          </button>
        )}{" "}
      </div>
    </div>
  );
};

export default ResendOtp;
