'use client'
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { login } from '@/services/login';
import setCookie from '@/utils/setCookie';
import hashPassword from '@/utils/hashPassword';

const Login: React.FC = () => {
  const [username,setUsername]:[string|null,(username:string|null)=>void]=useState<string|null>(null);
  const [password,setPassword]:[string|null,(password:string|null)=>void]=useState<string|null>(null);
  const [email,setEmail]:[string|null,(email:string|null)=>void]=useState<string|null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault()
      try {
          console.log(username,password,email)
          
          if(username!==null&&password!==null&&email!==null){
            // const hashedPassword=await hashPassword(password)
            const response=await login(username,email,password)
            if(response==200){
              setCookie('auth','true',30)
              console.log(document.cookie)
              window.location.href='/'
            }
          }else{
            console.log("Null credentials")
          }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-extrabold text-orange-400 mb-8 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-6">
            <label htmlFor="username" className="block text-gray-200 mb-2">Username</label>
            <input type="username" id="username" name='username' onChange={(e) => setUsername(e.target.value)} className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
            <input type="email" id="email" name='email' onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 mb-2">Password</label>
            <input type="password" id="password" name='password' onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <button type="submit" className="w-full p-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors">Login</button>
        </form>
        <p className="mt-6 text-gray-400 text-center">
          Don&apos;t have an account? <Link href="signup" className="text-orange-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
