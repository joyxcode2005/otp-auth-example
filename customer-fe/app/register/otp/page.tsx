/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { BACKEND_URL } from "@/config";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function OTPVerifyPage() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const phone =
    typeof window !== "undefined" ? localStorage.getItem("register_phone") : "";

  const [otp, setOtp] = useState(Array(6).fill(""));

  // Redirect if no phone found
  useEffect(() => {
    if (!phone) router.replace("/register");
  }, [phone, router]);

  // Handle digit updates
  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    const { data } = await axios.post(
      `${BACKEND_URL}/customer/register/verify`,
      {
        phoneNumber: phone,
        otp: otp.join(""),
      },
      { withCredentials: true }
    );

    if (data.success) router.push("/register/form");
    else toast.error(data.message);
  } catch (err: any) {
    if (err.response?.status === 409) {
      toast.error("Customer already exists!!!");
    } else {
      toast.error("Something went wrong while verifying OTP.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    // existing UI unchanged
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-50 px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        onSubmit={verifyOTP}
        className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md"
      >
        {/* ... your entire UI stays identical ... */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h1>
          <p className="text-gray-600 text-sm">Sent to +91 {phone}</p>
        </div>

        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-10 h-12 md:w-12 md:h-14 text-center border-2 border-gray-300 rounded-lg text-xl font-bold focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
            />
          ))}
        </div>

        <button
  type="submit"
  disabled={otp.some((d) => !d) || loading}
  className="w-full py-3 bg-linear-to-r from-green-500 to-green-600 
             hover:from-green-600 hover:to-green-700 
             disabled:from-gray-300 disabled:to-gray-400 
             disabled:cursor-not-allowed text-white rounded-lg 
             font-semibold transition-all shadow-lg flex items-center 
             justify-center gap-2"
>
  {loading ? (
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    "Verify OTP"
  )}
</button>

      </form>
    </div>
  );
}
