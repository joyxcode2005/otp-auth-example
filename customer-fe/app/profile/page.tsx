/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { BACKEND_URL } from '@/config';
import { useState,useEffect } from 'react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    phoneNumber: '',
    gstNumber: '',
    email: '',
    fullAddress: '',
    selectedAnimal: '',
    feedTypes: ['', '', '', '', '', ''],
    paymentMethod: '',
    additionalNotes: '',
  });

  useEffect(() => {
  async function loadProfile() {
    try {
      const res = await fetch(`${BACKEND_URL}/customer/info`, {
        method: "GET",
        credentials: "include", // if you're using cookies / JWT in cookies
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch profile");
        return;
      }

      const response = await res.json();
      const data = response.customer;
      console.log("Fetched profile:", data);

      // Map API data into your page state
      setProfileData({
        name: data.name || "",
        phoneNumber: data.phone || "",
        gstNumber: data.gstNumber || "",
        email: data.email || "",
        fullAddress: data.address || "",
        selectedAnimal: data.selectedAnimal || "",
        feedTypes: data.feedTypes || ["", "", "", "", "", ""],
        paymentMethod: data.paymentMethod || "",
        additionalNotes: data.additionalNotes || "",
      });

    } catch (err) {
      console.error("Error loading profile:", err);
    }
  }

  loadProfile();
}, []);

  const handleInputChange = (field: string, value: string) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleFeedTypeChange = (index: number, value: string) => {
    const newFeedTypes = [...profileData.feedTypes];
    newFeedTypes[index] = value;
    setProfileData({ ...profileData, feedTypes: newFeedTypes });
  };

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(`${BACKEND_URL}/customer/info`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });

    const result = await res.json();
    console.log("Updated profile:", result);

    setIsEditing(false);

  } catch (err) {
    console.error("Error updating profile:", err);
  }
};


  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-gray-800 font-bold text-sm md:text-base">DEPARTMENT OF</h1>
              <p className="text-orange-600 text-xs md:text-sm">ANIMAL HUSBANDRY AND DAIRYING</p>
              <p className="text-orange-500 text-xs">GOVERNMENT OF INDIA</p>
            </div>
          </a>
          <div className="flex items-center gap-3 md:gap-4">
            <select className="bg-white text-gray-700 px-3 md:px-4 py-2 rounded-lg border-2 border-gray-300 text-sm">
              <option>English</option>
              <option>हिन्दी</option>
            </select>
            <a href="/profile" className="text-orange-500 hover:text-orange-600 transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Page Header */}
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-5 md:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                    My Profile
                  </h2>
                  <p className="text-orange-50 text-sm md:text-base">
                    View and manage your account details
                  </p>
                </div>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Profile Content */}
            <form onSubmit={handleUpdate} className="p-4 md:p-6">
              <div className="space-y-5 md:space-y-6">
                {/* Personal Information */}
                <div className="border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Personal Information</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                        />
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base">{profileData.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">Phone Number</label>
                      {isEditing ? (
                        <div className="flex">
                          <span className="inline-flex items-center px-3 bg-gray-100 border-2 border-r-0 border-gray-300 rounded-l-lg text-gray-700 text-sm">
                            +91
                          </span>
                          <input
                            type="tel"
                            value={profileData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                          />
                        </div>
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base">+91 {profileData.phoneNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">GST Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profileData.gstNumber}
                          onChange={(e) => handleInputChange('gstNumber', e.target.value.toUpperCase())}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                        />
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base">{profileData.gstNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm md:text-base"
                        />
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base">{profileData.email}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">Full Address</label>
                      {isEditing ? (
                        <textarea
                          value={profileData.fullAddress}
                          onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-sm md:text-base"
                        />
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base">{profileData.fullAddress}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Animal & Feed Information */}
                <div className="border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Animal & Feed Information</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">Animal Type</label>
                      {isEditing ? (
                        <select
                          value={profileData.selectedAnimal}
                          onChange={(e) => handleInputChange('selectedAnimal', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-sm md:text-base"
                        >
                          <option value="cattle">🐄 Cattle</option>
                          <option value="buffalo">🐃 Buffalo</option>
                          <option value="goat">🐐 Goat</option>
                          <option value="sheep">🐑 Sheep</option>
                          <option value="poultry">🐔 Poultry</option>
                        </select>
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base capitalize">
                          {profileData.selectedAnimal === 'cattle' && '🐄 Cattle'}
                          {profileData.selectedAnimal === 'buffalo' && '🐃 Buffalo'}
                          {profileData.selectedAnimal === 'goat' && '🐐 Goat'}
                          {profileData.selectedAnimal === 'sheep' && '🐑 Sheep'}
                          {profileData.selectedAnimal === 'poultry' && '🐔 Poultry'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-2">Feed Types</label>
                      {isEditing ? (
                        <div className="grid md:grid-cols-2 gap-2 md:gap-3">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <select
                              key={index}
                              value={profileData.feedTypes[index]}
                              onChange={(e) => handleFeedTypeChange(index, e.target.value)}
                              className="px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-sm"
                            >
                              <option value="">Feed type {index + 1}</option>
                              <option value="Concentrates">Concentrates</option>
                              <option value="Roughage">Roughage</option>
                              <option value="Minerals & Vitamins">Minerals & Vitamins</option>
                              <option value="Supplements">Supplements</option>
                              <option value="Silage">Silage</option>
                            </select>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {profileData.feedTypes.filter(f => f).map((feed, index) => (
                            <span key={index} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium">
                              {feed}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment & Additional Information */}
                <div className="border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-gray-800">Payment & Additional Info</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">Preferred Payment Method</label>
                      {isEditing ? (
                        <select
                          value={profileData.paymentMethod}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-sm md:text-base"
                        >
                          <option value="cash">Cash on Delivery</option>
                          <option value="upi">UPI</option>
                          <option value="card">Card Payment</option>
                          <option value="netbanking">Net Banking</option>
                        </select>
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base capitalize">
                          {profileData.paymentMethod === 'cash' && 'Cash on Delivery'}
                          {profileData.paymentMethod === 'upi' && 'UPI'}
                          {profileData.paymentMethod === 'card' && 'Card Payment'}
                          {profileData.paymentMethod === 'netbanking' && 'Net Banking'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 text-xs md:text-sm font-medium mb-1">Additional Notes</label>
                      {isEditing ? (
                        <textarea
                          value={profileData.additionalNotes}
                          onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-sm md:text-base"
                          placeholder="Any special requirements..."
                        />
                      ) : (
                        <p className="text-gray-800 font-semibold text-sm md:text-base">{profileData.additionalNotes || 'No additional notes'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2.5 md:py-3 rounded-xl transition-all text-sm md:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 md:py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 md:py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Update Profile
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}