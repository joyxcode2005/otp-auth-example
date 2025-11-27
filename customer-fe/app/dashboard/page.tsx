'use client';

import { useState } from 'react';

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: 'ORD001',
      date: '2024-11-20',
      items: 'Cattle Feed - 50kg',
      status: 'Delivered',
      amount: '₹2,500',
    },
    {
      id: 'ORD002',
      date: '2024-11-22',
      items: 'Mineral Supplements - 25kg',
      status: 'In Transit',
      amount: '₹1,800',
    },
    {
      id: 'ORD003',
      date: '2024-11-24',
      items: 'Roughage Bundle',
      status: 'Processing',
      amount: '₹3,200',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <h1 className="text-gray-800 font-bold text-sm md:text-base">DEPARTMENT OF</h1>
              <p className="text-orange-600 text-xs md:text-sm">ANIMAL HUSBANDRY AND DAIRYING</p>
              
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <select className="bg-white text-gray-700 px-3 md:px-4 py-2 rounded-lg border-2 border-gray-300 text-sm">
              <option>English</option>
              <option>हिन्दी</option>
            </select>
            <button className="text-gray-700 hover:text-orange-500 transition-colors">
              <a href="/profile" className="text-gray-700 hover:text-orange-500 transition-colors">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </a>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            {/* Page Header */}
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-5 md:p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1 md:mb-2">
                My Orders
              </h2>
              <p className="text-orange-50 text-sm md:text-base">
                Track and manage your orders
              </p>
            </div>

            {/* Orders List */}
            <div className="p-4 md:p-6">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 hover:shadow-lg hover:border-orange-300 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                          Order #{order.id}
                        </h3>
                        <p className="text-gray-600 text-xs md:text-sm mt-1">
                          Placed on {order.date}
                        </p>
                      </div>
                      <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-semibold border-2 whitespace-nowrap ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm">Items</p>
                        <p className="font-semibold text-gray-800 text-sm md:text-base">{order.items}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm">Amount</p>
                        <p className="font-semibold text-gray-800 text-sm md:text-base">{order.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-xs md:text-sm">Status</p>
                        <p className="font-semibold text-gray-800 text-sm md:text-base">{order.status}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-4">
                      <button className="flex-1 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-2 md:py-2.5 px-4 rounded-lg font-semibold transition-all text-sm md:text-base">
                        Track Order
                      </button>
                      <button className="flex-1 border-2 border-orange-500 text-orange-600 hover:bg-orange-50 py-2 md:py-2.5 px-4 rounded-lg font-semibold transition-all text-sm md:text-base">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State (if no orders) */}
              {orders.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-20 h-20 md:w-24 md:h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Orders Yet</h3>
                  <p className="text-gray-500">Your orders will appear here once you place them.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}