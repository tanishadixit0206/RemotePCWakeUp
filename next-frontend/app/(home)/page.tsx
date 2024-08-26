import DeviceList from '@/components/DeviceList';
import React from 'react';


const Home:React.FC= () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200">
      <div className="bg-gray-800 shadow-lg py-6 px-8 mb-10">
        <h1 className="text-3xl font-extrabold text-blue-300">Remote PC Wakeup</h1>
      </div>
      <div className="container mx-auto p-4 max-w-7xl">
        <DeviceList />
      </div>
    </div>
  );
};


export default Home;
