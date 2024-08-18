import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { Device } from '$lib/types';
import axios from 'axios'
export async function getDevices():Promise<Device[]>{
    try{
        const res=await axios.get<Device[]>(`${PUBLIC_BACKEND_URL}`,{});
        return res.data;
    }catch(error){
        console.log(error);
    }
    return [];
}