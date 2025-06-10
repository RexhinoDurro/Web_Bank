import { useState, useEffect } from 'react';

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Glow effect interval
    const glowTimer = setInterval(() => {
      setGlowEffect(prev => !prev);
    }, 3000);

    return () => {
      clearInterval(glowTimer);
    };
  }, []);

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Add your login logic here
      console.log('Login attempted with:', { email, password });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Pure black base */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Subtle light blue accents */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Login Card */}
        <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
          <div className="relative group">
            {/* Dynamic glow effect */}
            <div className={`absolute -inset-6 bg-gradient-to-r from-sky-400/20 via-blue-400/20 to-cyan-400/20 rounded-3xl blur-2xl transition-all duration-1000 ${glowEffect ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}></div>
            
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-sky-400/30 rounded-3xl p-8 hover:border-sky-400/50 transition-all duration-500">
              
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-black bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-400">Sign in to your NeoBank account</p>
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-sm text-sky-300 uppercase tracking-wide font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-sky-400/30 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:border-sky-400/60 focus:outline-none transition-all duration-300 backdrop-blur-lg"
                      placeholder="Enter your email"
                      required
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-5 h-5 bg-gradient-to-r from-sky-400 to-blue-500 rounded-md"></div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-sm text-sky-300 uppercase tracking-wide font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/40 border border-sky-400/30 rounded-2xl px-4 py-4 text-white placeholder-gray-500 focus:border-sky-400/60 focus:outline-none transition-all duration-300 backdrop-blur-lg"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-300"
                    >
                      <div className={`w-5 h-5 rounded-md transition-all duration-300 ${showPassword ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-gray-500 to-gray-600'}`}></div>
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl py-4 font-semibold text-lg hover:shadow-2xl hover:shadow-sky-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Log In
                        <div className="w-5 h-5 bg-white rounded-md group-hover:translate-x-1 transition-transform duration-300"></div>
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Divider */}
              <div className="my-8 flex items-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
                <span className="px-4 text-sm text-gray-400 uppercase tracking-wide">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
              </div>

              {/* Social Login Options */}
              
               
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <button className="text-sky-400 hover:text-sky-300 font-semibold transition-colors duration-300">
                    Sign up here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className={`mt-8 text-center transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-lg border border-sky-400/20 rounded-full px-4 py-2">
            <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            <span className="text-sm text-gray-400">256-bit SSL Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
}