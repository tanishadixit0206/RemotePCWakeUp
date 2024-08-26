'use client'
import React, { useEffect, useState } from 'react';
import DeviceItem from './DeviceItem';
import { Device } from '@/types';
import { getDevices } from '@/services/getDevices';

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const data = await getDevices();
        setDevices(data);
      } catch (err) {
        setError('Failed to load devices');
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  if (loading) return <p className="text-gray-500">Loading devices...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {devices.map((device) => (
        <li key={device.MAC}>
        <DeviceItem device={device} />
        </li>
      ))}
    </div>
  );
};

export default DeviceList;
