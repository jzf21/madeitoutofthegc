"use client"

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { X, Plane } from 'lucide-react';

interface RegisterFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onClose, onSwitchToLogin }) => {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    first_name: "",
    last_name: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
 
  

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function getErrorMessage(err: unknown): string {
    if (typeof err === 'object' && err && 'message' in err && typeof (err as { message?: unknown }).message === 'string') {
      return (err as { message: string }).message;
    }
    return 'Registration failed';
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'https://ai-travel-agent-d8wv.onrender.com';
      const response = await fetch(`${baseUrl}/api/v1/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || "Registration failed")
      }
      const data = await response.json();
      setSuccess(true);
      login(data); // Use context login if user data is returned
      if (onSuccess) onSuccess();
      setTimeout(() => navigate('/'), 1000);
    } catch (err: unknown) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false)
    }
  }

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
            <h2 className="text-2xl font-bold text-[#24424D] mb-2">Create Account</h2>
            <p className="text-[#283F45]/70">Start planning your perfect trip</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="first_name" className="block text-[#24424D] text-sm font-semibold mb-2">First Name</label>
                <input
                  id="first_name"
                  name="first_name"
                  placeholder="First name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
                />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-[#24424D] text-sm font-semibold mb-2">Last Name</label>
                <input
                  id="last_name"
                  name="last_name"
                  placeholder="Last name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-[#24424D] text-sm font-semibold mb-2">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-[#24424D] text-sm font-semibold mb-2">Username</label>
              <input
                id="username"
                name="username"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-[#24424D] text-sm font-semibold mb-2">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-[#E3E1DD] rounded-2xl bg-[#EBE8DF]/20 text-[#24424D] placeholder-[#283F45]/50 focus:outline-none focus:ring-2 focus:ring-[#266267] focus:border-[#266267] transition-all duration-300"
              />
            </div>
           
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#266267] to-[#24424D] text-white py-3 px-6 rounded-2xl font-semibold text-lg hover:from-[#266267]/90 hover:to-[#24424D]/90 focus:outline-none focus:ring-4 focus:ring-[#266267]/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
            {/* Error Message */}
            {error && (
              <div className="bg-[#E87851]/10 border border-[#E87851]/30 text-[#E87851] px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Registration successful! Welcome aboard!</span>
                </div>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#283F45]/70">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#266267] hover:text-[#24424D] font-medium transition-colors"
              >
                Sign in
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

export default RegisterForm;
