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
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <h1 className="text-white font-semibold text-lg">DEPARTMENT OF</h1>
              <p className="text-orange-400 text-sm">ANIMAL HUSBANDRY AND DAIRYING,</p>
              <p className="text-orange-400 text-xs">GOVERNMENT OF INDIA</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600">
              <option>English</option>
              <option>हिन्दी</option>
            </select>
            <button className="text-white hover:text-orange-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Page Header */}
            <div className="bg-linear-to-r from-orange-500 to-orange-600 p-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                Orders Page
              </h2>
              <p className="text-orange-100">
                Track and manage your orders
              </p>
            </div>

            {/* Orders List */}
            <div className="p-6">
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          Order #{order.id}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          Placed on {order.date}
                        </p>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Items</p>
                        <p className="font-semibold text-gray-800">{order.items}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Amount</p>
                        <p className="font-semibold text-gray-800">{order.amount}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">Status</p>
                        <p className="font-semibold text-gray-800">{order.status}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors">
                        Track Order
                      </button>
                      <button className="flex-1 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 py-2 px-4 rounded-lg font-semibold transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State (if no orders) */}
              {orders.length === 0 && (
                <div className="text-center py-12">
                  <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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