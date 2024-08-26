import { Device } from '@/types';
import axios from 'axios'
export async function getDevices():Promise<Device[]>{
    try{
        const res=await axios.get<Device[]>(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api`,{});
        return res.data;
    }catch(error){
        console.log(error);
    }
    return [];
}