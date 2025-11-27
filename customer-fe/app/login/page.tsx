/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { BACKEND_URL } from '@/config';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // check if phone number is valid
    if (phoneNumber.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/customer/gen-otp`,
        { phoneNumber },
        { headers: { "Content-Type": "application/json" } }
      );

      const json = res.data;
      if (json.success) {
        toast.success("OTP sent successfully!");
        setShowOTP(true);
      } else {
        toast.error(json.message || "Failed to send OTP");
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Something went wrong while sending OTP.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
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

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/customer/login/verify`,
        { 
          phoneNumber,
          otp: otpCode 
        },
        
        { headers: { "Content-Type": "application/json" }, withCredentials:true }
      );

      const json = res.data;
      if (json.success) {
        toast.success("Login successful!");
        
        // Store authentication token if provided
        if (json.token) {
          localStorage.setItem("auth_token", json.token);
        }
        
        // Store user data if provided
        if (json.user) {
          localStorage.setItem("user_data", JSON.stringify(json.user));
        }
        
        // Remove the registration phone number
        localStorage.removeItem("register_phone");
        
        // Redirect to dashboard or home
        router.push('/dashboard');
      } else {
        toast.error(json.message || "Invalid OTP. Please try again.");
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Failed to verify OTP. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${BACKEND_URL}/customer/gen-otp`,
        { phoneNumber },
        { headers: { "Content-Type": "application/json" } }
      );

      const json = res.data;
      if (json.success) {
        toast.success("OTP resent successfully!");
        // Clear existing OTP inputs
        setOTP(['', '', '', '', '', '']);
        // Focus first input
        const firstInput = document.getElementById('otp-0');
        firstInput?.focus();
      } else {
        toast.error(json.message || "Failed to resend OTP");
      }
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Something went wrong while resending OTP.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeNumber = () => {
    setShowOTP(false);
    setOTP(['', '', '', '', '', '']);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3 md:gap-4 hover:opacity-80 transition-opacity">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-gray-800 font-bold text-sm md:text-lg tracking-tight">DEPARTMENT OF</h1>
              <p className="text-orange-600 text-xs md:text-sm font-medium">ANIMAL HUSBANDRY AND DAIRYING</p>
              <p className="text-orange-500 text-xs">GOVERNMENT OF INDIA</p>
            </div>
          </a>
          <select className="bg-white text-gray-700 px-3 md:px-4 py-2 rounded-lg border-2 border-gray-300 hover:border-orange-500 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>
      </header>

      {/* Login Form */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-6 md:p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-orange-50 text-sm md:text-base">
                  Login to track your orders
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {!showOTP ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 md:px-4 bg-gray-100 border-2 border-r-0 border-gray-300 rounded-l-xl text-gray-700 font-medium text-sm md:text-base">
                        +91
                      </span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10-digit number"
                        className="flex-1 px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm md:text-base"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phoneNumber.length !== 10 || isLoading}
                    className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 md:py-3 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Send OTP
                      </>
                    )}
                  </button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs md:text-sm">
                      <span className="px-4 bg-white text-gray-500">New to the portal?</span>
                    </div>
                  </div>

                  <a 
                    href="/register" 
                    className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 md:py-3 rounded-xl transition-all text-sm md:text-base"
                  >
                    Create an Account
                  </a>
                </form>
              ) : (
                <form onSubmit={handleVerify} className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <label className="block text-gray-700 font-semibold text-sm md:text-base">
                        Enter OTP
                      </label>
                      <button
                        type="button"
                        onClick={handleChangeNumber}
                        className="text-orange-500 hover:text-orange-600 text-xs md:text-sm font-medium flex items-center gap-1 transition-colors"
                        disabled={isLoading}
                      >
                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        Change
                      </button>
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm mb-4">
                      Sent to +91 {phoneNumber}
                    </p>
                    <div className="flex gap-2 md:gap-3 justify-center">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          inputMode="numeric"
                          value={digit}
                          onChange={(e) => handleOTPChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-10 h-12 md:w-12 md:h-14 text-center text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          maxLength={1}
                          disabled={isLoading}
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={otp.some(digit => !digit) || isLoading}
                    className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 md:py-3 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Verify & Login
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="w-full text-orange-500 hover:text-orange-600 font-semibold text-xs md:text-sm transition-colors disabled:opacity-50"
                  >
                    Did not receive? Resend OTP
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-4 md:mt-6 bg-blue-50 border-2 border-blue-200 rounded-xl md:rounded-2xl p-3 md:p-4">
            <div className="flex items-start gap-2 md:gap-3">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-gray-800 font-semibold text-xs md:text-sm mb-1">Secure Login</h4>
                <p className="text-gray-600 text-xs">Your information is protected with bank-level security</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}