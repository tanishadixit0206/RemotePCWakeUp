import { Device } from '@/types';
import axios from 'axios'
export async function sendWol(){
    try{
        const res=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/wol`,{
            
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
    return [];
}