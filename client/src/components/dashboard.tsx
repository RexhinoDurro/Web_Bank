import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedBalance, setAnimatedBalance] = useState(0);
  const [glowEffect, setGlowEffect] = useState(false);


  // User data
  const userData = {
    firstName: "Alexander",
    lastName: "Rodriguez",
    balance: 127589.45,
    id: "NB2024789456",
    accountType: "Premium Elite"
  };

  useEffect(() => {
    setIsVisible(true);
    
    // Animate balance counter
    const duration = 2000;
    const increment = userData.balance / (duration / 50);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= userData.balance) {
        current = userData.balance;
        clearInterval(timer);
      }
      setAnimatedBalance(current);
    }, 50);

    // Glow effect interval
    const glowTimer = setInterval(() => {
      setGlowEffect(prev => !prev);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(glowTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Simple Background with Light Blue Accents */}
      <div className="fixed inset-0 z-0">
        {/* Pure black base */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Subtle light blue accents */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative z-10 p-8">
        {/* Header Section */}
        <div className={`mb-12 transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-6xl md:text-8xl font-black bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4 tracking-tight">
                Dashboard
              </h1>
              <div className="flex items-center gap-4 text-sky-300">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-lg">Welcome back, {userData.firstName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          {/* User Identity Card - Left */}
          <div className={`lg:col-span-1 transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <div className="relative group">
              {/* Glow effect */}
              <div className={`absolute -inset-4 bg-gradient-to-r from-sky-400/20 to-blue-400/20 rounded-3xl blur-xl transition-all duration-1000 ${glowEffect ? 'opacity-100' : 'opacity-50'}`}></div>
              
              <div className="relative backdrop-blur-xl bg-gray-900/30 border border-sky-400/20 rounded-3xl p-8 hover:border-sky-400/40 transition-all duration-500">
                {/* Profile Avatar */}
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 bg-gradient-to-br from-sky-400 to-blue-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 mx-auto shadow-2xl shadow-sky-400/30">
                      {userData.firstName[0]}{userData.lastName[0]}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-black flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* User Info */}
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-sky-300 mb-2 uppercase tracking-wide">User Information</div>
                    <div className="text-3xl font-bold text-white mb-2">
                      {userData.firstName} {userData.lastName}
                    </div>
                    <div className="text-sky-300 font-medium">
                      {userData.accountType}
                    </div>
                  </div>

                  {/* ID Display */}
                  <div className="bg-black/40 rounded-2xl p-4 border border-sky-400/30">
                    <div className="text-sm text-sky-300 mb-1 uppercase tracking-wide">Account ID</div>
                    <div className="font-mono text-xl text-white tracking-wider">
                      {userData.id}
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 rounded-xl p-3 border border-green-400/20">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 uppercase tracking-wide">Status</span>
                      </div>
                      <span className="text-green-400 font-semibold">Verified</span>
                    </div>
                    <div className="bg-black/40 rounded-xl p-3 border border-blue-400/20">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-xs text-blue-400 uppercase tracking-wide">Tier</span>
                      </div>
                      <span className="text-blue-400 font-semibold">Premium</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Card - Center/Right */}
          <div className={`lg:col-span-2 transform transition-all duration-1500 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <div className="relative group h-full">
              {/* Dynamic glow effect */}
              <div className={`absolute -inset-6 bg-gradient-to-r from-cyan-400/15 via-sky-400/15 to-blue-400/15 rounded-3xl blur-2xl transition-all duration-1000 ${glowEffect ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}></div>
              
              <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-sky-400/30 rounded-3xl p-12 h-full hover:border-sky-400/50 transition-all duration-500">
                
                {/* Balance Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-2xl text-sky-300 font-medium">Current Balance</div>
                  </div>
                  <div className="w-full h-1 bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-400 rounded-full"></div>
                </div>

                {/* Balance Display */}
                <div className="text-center mb-12">
                  <div className="text-8xl md:text-9xl font-black bg-gradient-to-r from-sky-300 via-blue-300 to-cyan-200 bg-clip-text text-transparent tracking-tight mb-4">
                    ${animatedBalance.toLocaleString('en-US', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </div>
                  <div className="text-sky-400 text-xl uppercase tracking-wide">Available Balance</div>
                </div>

                {/* Balance Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-black/30 rounded-2xl border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300 group">
                    <div className="text-green-400 text-xl font-bold">+12.5%</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wide">This Month</div>
                  </div>
                  
                  <div className="text-center p-4 bg-black/30 rounded-2xl border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300 group">
                    <div className="text-blue-400 text-xl font-bold">Elite</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wide">Status</div>
                  </div>
                  
                  <div className="text-center p-4 bg-black/30 rounded-2xl border border-sky-400/20 hover:border-sky-400/40 transition-all duration-300 group">
                    <div className="text-cyan-400 text-xl font-bold">Secure</div>
                    <div className="text-gray-400 text-sm uppercase tracking-wide">Protected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info Row */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 max-w-7xl mx-auto transform transition-all duration-1500 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          <div className="backdrop-blur-xl bg-gray-900/30 border border-sky-400/20 rounded-2xl p-6 hover:border-sky-400/40 transition-all duration-300 group">
            <div className="text-sky-300 text-sm mb-1 uppercase tracking-wide">Bank Branch</div>
            <div className="text-white font-semibold">Downtown Elite</div>
          </div>

          <div className="backdrop-blur-xl bg-gray-900/30 border border-sky-400/20 rounded-2xl p-6 hover:border-sky-400/40 transition-all duration-300 group">
            <div className="text-sky-300 text-sm mb-1 uppercase tracking-wide">Last Login</div>
            <div className="text-white font-semibold">2 mins ago</div>
          </div>

          <div className="backdrop-blur-xl bg-gray-900/30 border border-sky-400/20 rounded-2xl p-6 hover:border-sky-400/40 transition-all duration-300 group">
            <div className="text-sky-300 text-sm mb-1 uppercase tracking-wide">Location</div>
            <div className="text-white font-semibold">New York, USA</div>
          </div>

          <div className="backdrop-blur-xl bg-gray-900/30 border border-sky-400/20 rounded-2xl p-6 hover:border-sky-400/40 transition-all duration-300 group">
            <div className="text-sky-300 text-sm mb-1 uppercase tracking-wide">Quick Access</div>
            <div className="text-white font-semibold">Enabled</div>
          </div>
        </div>
      </div>
    </div>
  );
}