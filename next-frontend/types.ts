
export interface Device {
    IP: string;
    MAC: string;
    Status: string;
  }

export interface DeviceItemProps {
    device: Device;
  }