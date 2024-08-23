import { sendWol } from '@/services/sendWol';
import { DeviceItemProps } from '@/types';
import React from 'react';

const DeviceItem: React.FC<DeviceItemProps> = ({ device }) => {
  const handleToggle = async (mac:string) => {
    try {
        if(device.Status!='On'){
            sendWol(mac)
        }else{
    
        }     
    } catch (error) {
        console.log(error)
    }

  };

  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <div>
        <p className="font-semibold text-lg text-gray-900">{device.MAC}</p>
        <p className="text-sm text-gray-500">{device.IP}</p>
      </div>
      <button
        onClick={()=>handleToggle(device.MAC)}
        className={`px-6 py-2 rounded-full text-white transition-colors duration-300 ease-in-out ${
          device.Status === 'On'
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {device.Status === 'On' ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
};


export default DeviceItem;
