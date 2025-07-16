import React, { useState } from 'react';

interface RegisterFormProps {
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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
      const response = await fetch(`${baseUrl}/api/v1/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Registration failed');
      }
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 p-6 ">
      <h2 className="text-xl font-bold text-black">Register</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="w-full p-2 rounded" />
      <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="w-full p-2 rounded" />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full p-2 rounded" />
      <input name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} required className="w-full p-2 rounded" />
      <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} required className="w-full p-2 rounded" />
      <button type="submit" disabled={loading} className="w-full bg-blue-500 text-black p-2 rounded font-bold">{loading ? 'Registering...' : 'Register'}</button>
      {error && <div className="text-red-400">{error}</div>}
      {success && <div className="text-green-400">Registration successful!</div>}
    </form>
  );
};

export default RegisterForm; 