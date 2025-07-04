// client/src/components/SignUp.tsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [glowEffect, setGlowEffect] = useState(false);

  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    // Parse full name into first and last name
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || firstName; // Use first name as last name if only one name provided

    try {
      await register({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
        password_confirm: confirmPassword,
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle different types of errors
      if (error.response?.data) {
        const errorData = error.response.data;
        
        // Handle field-specific errors
        if (errorData.email) {
          setError(`Email: ${errorData.email[0]}`);
        } else if (errorData.password) {
          setError(`Password: ${errorData.password[0]}`);
        } else if (errorData.non_field_errors) {
          setError(errorData.non_field_errors[0]);
        } else if (errorData.detail) {
          setError(errorData.detail);
        } else if (errorData.error) {
          setError(errorData.error);
        } else if (typeof errorData === 'string') {
          setError(errorData);
        } else {
          setError('Registration failed. Please try again.');
        }
      } else if (error.message) {
        setError(error.message);
      } else {
        setError('An error occurred during registration');
      }
    }
  };

  return (
    <div className="bg-black text-white overflow-hidden relative flex items-center justify-center py-16 px-4">
      {/* Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Pure black base */}
        <div className="absolute inset-0 bg-black"></div>
        
        {/* Subtle light blue accents */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-cyan-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Sign Up Card */}
        <div className={`transform transition-all duration-1500 ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'}`}>
          <div className="relative group">
            {/* Dynamic glow effect */}
            <div className={`absolute -inset-4 bg-gradient-to-r from-sky-400/20 via-blue-400/20 to-cyan-400/20 rounded-2xl blur-xl transition-all duration-1000 ${glowEffect ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}></div>
            
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-gray-900/40 to-gray-800/40 border border-sky-400/30 rounded-2xl p-6 hover:border-sky-400/50 transition-all duration-500">
              
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-black bg-gradient-to-r from-sky-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent mb-1">
                  Join NeoBank
                </h1>
                <p className="text-gray-400 text-sm">Create your account to get started</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Sign Up Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name Field */}
                <div className="space-y-1">
                  <label className="text-xs text-sky-300 uppercase tracking-wide font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-black/40 border border-sky-400/30 rounded-xl px-3 py-3 text-white placeholder-gray-500 focus:border-sky-400/60 focus:outline-none transition-all duration-300 backdrop-blur-lg text-sm"
                      placeholder="Enter your full name"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-1">
                  <label className="text-xs text-sky-300 uppercase tracking-wide font-medium">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/40 border border-sky-400/30 rounded-xl px-3 py-3 text-white placeholder-gray-500 focus:border-sky-400/60 focus:outline-none transition-all duration-300 backdrop-blur-lg text-sm"
                      placeholder="Enter your email"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="text-xs text-sky-300 uppercase tracking-wide font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-black/40 border border-sky-400/30 rounded-xl px-3 py-3 text-white placeholder-gray-500 focus:border-sky-400/60 focus:outline-none transition-all duration-300 backdrop-blur-lg text-sm"
                      placeholder="Create a password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-300 text-gray-400 hover:text-sky-400 text-sm"
                      disabled={isLoading}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1">
                  <label className="text-xs text-sky-300 uppercase tracking-wide font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-black/40 border border-sky-400/30 rounded-xl px-3 py-3 text-white placeholder-gray-500 focus:border-sky-400/60 focus:outline-none transition-all duration-300 backdrop-blur-lg text-sm"
                      placeholder="Confirm your password"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-110 transition-transform duration-300 text-gray-400 hover:text-sky-400 text-sm"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group w-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl py-3 font-semibold hover:shadow-xl hover:shadow-sky-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </span>
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
                <span className="px-3 text-xs text-gray-400 uppercase tracking-wide">OR</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent"></div>
              </div>

              {/* Social Sign Up Options */}
              <div className="space-y-2">
                <button 
                  type="button"
                  className="w-full bg-black/40 border border-sky-400/20 rounded-xl py-2.5 px-3 text-gray-300 hover:border-sky-400/40 hover:bg-black/60 transition-all duration-300 flex items-center justify-center text-sm"
                  disabled={isLoading}
                >
                  Continue with Google
                </button>
                <button 
                  type="button"
                  className="w-full bg-black/40 border border-sky-400/20 rounded-xl py-2.5 px-3 text-gray-300 hover:border-sky-400/40 hover:bg-black/60 transition-all duration-300 flex items-center justify-center text-sm"
                  disabled={isLoading}
                >
                  Continue with Facebook
                </button>
              </div>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    className="text-sky-400 hover:text-sky-300 font-semibold transition-colors duration-300"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className={`mt-6 text-center transform transition-all duration-1500 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-lg border border-sky-400/20 rounded-full px-3 py-1.5">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"></div>
            <span className="text-xs text-gray-400">256-bit SSL Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
}