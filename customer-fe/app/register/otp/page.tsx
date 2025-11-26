"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OTPVerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const phone = typeof window !== "undefined" ? localStorage.getItem("register_phone") : "";

  useEffect(() => {
    if (!phone) router.push("/register");
  }, [phone, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const verifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/v1/customer/otp/verify", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp: otp.join("") }),
    });

    const json = await res.json();
    if (json.success) {
      router.push("/register/form");
    } else {
      alert(json.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 via-white to-gray-50 px-4">
      <form onSubmit={verifyOTP} className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-200 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
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
          disabled={otp.some((d) => !d)}
          className="w-full py-3 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-all shadow-lg"
        >
          Verify OTP
        </button>

        <button
          type="button"
          className="w-full mt-4 text-orange-500 hover:text-orange-600 font-medium text-sm transition-colors"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
}