import React, { FormEvent } from 'react';
import Link from 'next/link';
import { login } from '@/services/login';

const Login: React.FC = () => {
    function handleSubmit(event: FormEvent<HTMLButtonElement>): void {
        try {
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-orange-400 mb-8 text-center">Login</h2>
        <form>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
            <input type="email" id="email" className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 mb-2">Password</label>
            <input type="password" id="password" className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <button type="submit" onSubmit={handleSubmit} className="w-full p-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors">Login</button>
        </form>
        <p className="mt-6 text-gray-400 text-center">
          Don&apos;t have an account? <Link href="auth/signup" className="text-orange-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
