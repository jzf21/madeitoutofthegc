import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle, X, Plane } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: (data: unknown) => void;
  onClose?: () => void;
  onSwitchToRegister?: () => void;
}

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onClose, onSwitchToRegister }) => {
  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  // Real-time validation
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'email':
        { const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        break; }
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        break;
      default:
        return undefined;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(form).forEach(key => {
      const error = validateField(key, form[key as keyof FormData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear success state when user starts typing
    if (success) setSuccess(false);
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error, general: undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  function getErrorMessage(err: unknown): string {
    if (typeof err === 'object' && err && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
      return (err as { message: string }).message;
    }
    return 'Login failed';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    setSuccess(false);
    
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://ai-travel-agent-d8wv.onrender.com';
      const response = await fetch(`${baseUrl}/api/v1/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
      
      const data = await response.json();
      setSuccess(true);
      login(data); // Use context login
      
      if (onSuccess) onSuccess(data);
      
      // Small delay to show success message
      setTimeout(() => navigate('/'), 1000);
      
    } catch (err: unknown) {
      setErrors({ general: getErrorMessage(err) });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const isFormValid = Object.keys(errors).length === 0 && form.email && form.password;

  return (
    <div className="fixed inset-0 bg-[#24424D]/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Curved background elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#EBE8DF] to-[#E9E9DF] rounded-full opacity-40"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-gradient-to-tr from-[#266267]/10 to-[#24424D]/10 rounded-full"></div>
        </div>

        <div className="p-8 relative">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#266267] to-[#24424D] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Plane className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#24424D] mb-2">Welcome Back</h2>
            <p className="text-[#283F45]/70">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-[#24424D] text-sm font-semibold mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#283F45]/50" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full pl-10 pr-4 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300 ${errors.email ? 'border-[#E87851]' : ''}`}
                />
              </div>
              {errors.email && (
                <div className="flex items-center text-[#E87851] text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-[#24424D] text-sm font-semibold mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#283F45]/50" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className={`w-full pl-10 pr-12 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300 ${errors.password ? 'border-[#E87851]' : ''}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#283F45]/50 hover:text-[#24424D] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center text-[#E87851] text-sm mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="w-full bg-gradient-to-r from-[#266267] to-[#24424D] text-white py-3 px-6 rounded-2xl font-semibold text-lg hover:from-[#266267]/90 hover:to-[#24424D]/90 focus:outline-none focus:ring-4 focus:ring-[#266267]/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-b-2 border-white mr-2 rounded-full"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Error Message */}
            {errors.general && (
              <div className="flex items-center text-[#E87851] text-sm bg-[#E87851]/10 p-3 rounded-xl">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                {errors.general}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center text-green-600 text-sm bg-green-100 p-3 rounded-xl">
                <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                Login successful! Redirecting...
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#283F45]/70">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#266267] hover:text-[#24424D] font-medium transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#283F45]/50 hover:text-[#24424D] focus:outline-none focus:ring-2 focus:ring-[#266267]/30 rounded-lg p-2 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default LoginForm;