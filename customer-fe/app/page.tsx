export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
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
          </div>
          <select className="bg-slate-700/80 text-white px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option>English</option>
            <option>हिन्दी</option>
          </select>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Main Card */}
          <div className="bg-linear-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-12 border border-slate-700/50 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-12">
                <p className="text-slate-400 text-lg mb-3 font-medium">
                  Track your orders & deliveries with ease
                </p>
                <h1 className="text-6xl font-bold mb-4 leading-tight">
                  <span className="text-white">Welcome to the </span>
                  <span className="bg-linear-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">Customer </span>
                  <span className="bg-linear-to-r from-green-400 to-green-500 bg-clip-text text-transparent">Portal</span>
                </h1>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Seamless feed management and delivery tracking for animal husbandry excellence
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-6 justify-center items-center flex-wrap">
                <a 
                  href="/register"
                  className="group relative bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/50 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Register Now
                  <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                </a>
                
                <a 
                  href="/login"
                  className="group relative bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/50 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                  <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity"></span>
                </a>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-orange-500/50 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Order Tracking</h3>
              <p className="text-slate-400 text-sm">Real-time updates on your feed orders and delivery status</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-green-500/50 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Quality Assured</h3>
              <p className="text-slate-400 text-sm">Government-backed quality standards for all products</p>
            </div>

            <div className="bg-slate-800/40 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Fast Delivery</h3>
              <p className="text-slate-400 text-sm">Quick and efficient delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}