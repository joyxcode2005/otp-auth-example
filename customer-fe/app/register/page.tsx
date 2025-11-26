"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const sendOTP = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/v1/customer/otp/generate", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const json = await res.json();
    if (json.success) {
      localStorage.setItem("register_phone", phone);
      router.push("/register/otp");
    } else {
      alert(json.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form onSubmit={sendOTP} className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Verify Phone Number</h1>

        <label className="block mb-3 font-medium">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className="w-full px-4 py-3 rounded-md border"
          placeholder="Enter 10-digit phone number"
          required
        />

        <button
          type="submit"
          disabled={phone.length !== 10}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg mt-4"
        >
          Send OTP
        </button>
      </form>
    </div>
  );
}
