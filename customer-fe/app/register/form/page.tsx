/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import router from 'next/router';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    gstNumber: '',
    email: '',
    fullAddress: '',
    selectedAnimal: '',
    feedTypes: ['', '', '', '', '', ''],
    paymentMethod: '',
    additionalNotes: '',
    documents: null as File | null,
  });

  useEffect(() => {
  async function checkAuth() {
    const res = await fetch("http://localhost:5000/api/v1/customer/is-register-allowed", {
      credentials: "include",
    });
    const json = await res.json();

    if (!json.allowed) {
      router.push("/register"); // back to phone screen
    }
  }
  checkAuth();
}, []);


  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFeedTypeChange = (index: number, value: string) => {
    const newFeedTypes = [...formData.feedTypes];
    newFeedTypes[index] = value;
    setFormData({ ...formData, feedTypes: newFeedTypes });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, documents: e.target.files[0] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    // Add your registration logic here
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

      {/* Registration Form */}
      <main className="container mx-auto px-4 py-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-linear-to-r from-slate-800 to-slate-900 p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Customer Registration
                </h2>
                <p className="text-slate-300">Join our platform to track your orders</p>
                
                {/* Progress Bar */}
                <div className="flex justify-center gap-3 mt-6">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-20 rounded-full transition-all ${currentStep >= 1 ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                    <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-green-400' : 'text-slate-500'}`}>Basic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-20 rounded-full transition-all ${currentStep >= 2 ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                    <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-green-400' : 'text-slate-500'}`}>Details</span>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 md:p-10">
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 font-bold text-lg">1</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Basic Information</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

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
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange('phoneNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                          placeholder="10-digit number"
                          className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-2">
                        GST Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.gstNumber}
                        onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                        placeholder="22AAAAA0000A1Z5"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-2">
                        Full Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.fullAddress}
                        onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                        placeholder="Enter your complete address with pincode"
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-2">
                        Select Animal Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.selectedAnimal}
                        onChange={(e) => handleInputChange('selectedAnimal', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
                        required
                      >
                        <option value="">Choose animal type</option>
                        <option value="cattle">🐄 Cattle</option>
                        <option value="buffalo">🐃 Buffalo</option>
                        <option value="goat">🐐 Goat</option>
                        <option value="sheep">🐑 Sheep</option>
                        <option value="poultry">🐔 Poultry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-3">
                      Types of Feed Purchased
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <select
                          key={index}
                          value={formData.feedTypes[index]}
                          onChange={(e) => handleFeedTypeChange(index, e.target.value)}
                          className="px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
                        >
                          <option value="">Feed type {index + 1}</option>
                          <option value="concentrates">Concentrates</option>
                          <option value="roughage">Roughage</option>
                          <option value="minerals">Minerals & Vitamins</option>
                          <option value="supplements">Supplements</option>
                          <option value="silage">Silage</option>
                        </select>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-8 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                      Next Step
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 font-bold text-lg">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">Additional Information</h3>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Preferred Payment Method <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer"
                      required
                    >
                      <option value="">Select payment method</option>
                      <option value="cash">💵 Cash on Delivery</option>
                      <option value="upi">📱 UPI</option>
                      <option value="card">💳 Card Payment</option>
                      <option value="netbanking">🏦 Net Banking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.additionalNotes}
                      onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                      placeholder="Any special requirements or notes..."
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                      Upload KYC Documents <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-orange-500 transition-all cursor-pointer bg-slate-50 hover:bg-orange-50">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        required
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-slate-700 font-medium mb-1">
                          {formData.documents ? (
                            <span className="text-green-600">✓ {formData.documents.name}</span>
                          ) : (
                            'Click to upload or drag and drop'
                          )}
                        </p>
                        <p className="text-sm text-slate-500">PDF, JPG, PNG (Max 5MB)</p>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                      </svg>
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Submit Registration
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          <p className="text-center mt-8 text-slate-300 text-lg">
            Already have an account?{' '}
            <a href="/login" className="text-orange-400 hover:text-orange-300 font-semibold hover:underline transition-colors">
              Login here →
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}