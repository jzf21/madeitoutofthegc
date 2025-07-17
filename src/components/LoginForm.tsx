import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface LoginFormProps {
  onSuccess?: (data: any) => void;
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

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white/10 backdrop-blur-sm p-8  border border-white/20 shadow-xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-2">Welcome Back</h2>
          <p className="text-black/70">Sign in to your account</p>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-black/90">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-black/50" />
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
              className={`w-full pl-10 pr-4 py-3 bg-white/10 border  text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.email ? 'border-red-400' : 'border-white/20'
              }`}
            />
          </div>
          {errors.email && (
            <div className="flex items-center text-red-400 text-sm mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </div>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-black/90">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-black/50" />
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
              className={`w-full pl-10 pr-12 py-3 bg-white/10 border  text-black placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.password ? 'border-red-400' : 'border-white/20'
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-black/50 hover:text-black transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && (
            <div className="flex items-center text-red-400 text-sm mt-1">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.password}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !isFormValid}
          className={`w-full py-3 px-4  font-semibold text-black transition-all duration-200 ${
            loading || !isFormValid
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 shadow-lg'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin  h-5 w-5 border-b-2 border-white mr-2"></div>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Error Message */}
        {errors.general && (
          <div className="flex items-center text-red-400 text-sm bg-red-400/10 p-3 ">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            {errors.general}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex items-center text-green-400 text-sm bg-green-400/10 p-3 ">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            Login successful! Redirecting...
          </div>
        )}

        {/* Additional Links */}
        <div className="text-center">
          <a href="/forgot-password" className="text-sm text-black/70 hover:text-black transition-colors">
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;