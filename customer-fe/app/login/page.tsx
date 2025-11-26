/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 10) {
      setShowOTP(true);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Verifying OTP:', otp.join(''));
    // Add your verification logic here
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-14 h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">DEPARTMENT OF</h1>
              <p className="text-orange-400 text-sm font-medium">ANIMAL HUSBANDRY AND DAIRYING</p>
              <p className="text-orange-400/80 text-xs">GOVERNMENT OF INDIA</p>
            </div>
          </a>
          <select className="bg-slate-700/80 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>
      </header>

      {/* Login Form */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-orange-100">
                  Login to track your orders
                </p>
              </div>
            </div>

            <div className="p-8">
              {!showOTP ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 bg-slate-100 border-2 border-r-0 border-slate-200 rounded-l-xl text-slate-700 font-medium">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit number"
                        className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phoneNumber.length !== 10}
                    className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Send OTP
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-500">New to the portal?</span>
                    </div>
                  </div>

                  <a 
                    href="/register" 
                    className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl transition-all"
                  >
                    Create an Account
                  </a>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-slate-700 font-semibold">
                        Enter OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowOTP(false)}
                        className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Change
                      </button>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">
                      Sent to +91 {phoneNumber}
                    </p>
                    <div className="flex gap-3 justify-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          maxLength={1}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={otp.some(digit => !digit)}
                    className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verify & Login
                  </button>

                  <button
                    type="button"
                    className="w-full text-orange-500 hover:text-orange-600 font-semibold text-sm transition-colors"
                  >
                    Did not receive? Resend OTP
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0 mt-1">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">Secure Login</h4>
                <p className="text-slate-400 text-xs">Your information is protected with bank-level security</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}