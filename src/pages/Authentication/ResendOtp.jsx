import React, { useEffect, useState } from "react";

const ResendOtp = () => {
  const [timer, setTimer] = useState(300);

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div>
      <div>
        {timer > 0 ? (
          <p className="text-center">Remaning Time : {formatTime(timer)}</p>
        ) : (
          <button
            onClick={() => {
              setTimer(300);
            }}
            className="w-full py-2 border border-indigo-500 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-100 transition"
          >
            Resend OTP
          </button>
        )}{" "}
      </div>
    </div>
  );
};

export default ResendOtp;
