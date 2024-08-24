'use client'
import React, { FormEvent, useState } from 'react';
import Link from 'next/link';
import { signup } from '@/services/signup';
import hashPassword from '@/utils/hashPassword';

const Signup: React.FC = () => {
  const [username,setUsername]:[string|null,(username:string|null)=>void]=useState<string|null>(null);
  const [password,setPassword]:[string|null,(password:string|null)=>void]=useState<string|null>(null);
  const [email,setEmail]:[string|null,(email:string|null)=>void]=useState<string|null>(null);

    async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
      event.preventDefault()  
      try {
          setUsername(event.currentTarget.username.value)
          setPassword(event.currentTarget.password.value)
          setEmail(event.currentTarget.email.value)
          if(username!==null&&password!==null&&email!==null){
            // const hashedPassword=await hashPassword(password)
            const response=await signup(username,email,password)
            console.log(response)
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
        <h2 className="text-3xl font-extrabold text-orange-400 mb-8 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-200 mb-2">Username</label>
            <input type="username" id="username" name="username" className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
            <input type="email" id="email" name="email" className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-200 mb-2">Password</label>
            <input type="password" id="password" name="password" className="w-full p-3 rounded bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />
          </div>
          <button type="submit" className="w-full p-3 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition-colors">Sign Up</button>
        </form>
        <p className="mt-6 text-gray-400 text-center">
          Already have an account? <Link href="login" className="text-orange-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
