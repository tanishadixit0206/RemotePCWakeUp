import { Device } from '@/types';
import axios from 'axios'
export async function sendWol(mac: string){
    try{
        const res=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wol`,{
            mac:mac,
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
    return [];
}