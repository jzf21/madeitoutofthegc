import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
  onSuccess?: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
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
      login(data); // Store user info
      if (onSuccess) onSuccess(data);
      navigate('/'); // Redirect to home
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 rounded-xl">
      <h2 className="text-xl font-bold text-white">Login</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 rounded" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-2 rounded" />
      <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded font-bold">{loading ? 'Logging in...' : 'Login'}</button>
      {error && <div className="text-red-400">{error}</div>}
      {success && <div className="text-green-400">Login successful!</div>}
    </form>
  );
};

export default LoginForm; 