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
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={verifyOTP} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Enter OTP</h1>
        <p className="text-center mb-4">Sent to +91 {phone}</p>

        <div className="flex gap-2 justify-center mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-14 text-center border rounded text-xl"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={otp.some((d) => !d)}
          className="w-full py-3 bg-green-600 text-white rounded-lg"
        >
          Verify OTP
        </button>
      </form>
    </div>
  );
}
