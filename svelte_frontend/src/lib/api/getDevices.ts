import { PUBLIC_BACKEND_URL } from '$env/static/public';
import axios from 'axios'
export async function getDevices():Promise<string[]>{
    try{
        const res=await axios.get(`${PUBLIC_BACKEND_URL}`,{});
        return res.data;
    }catch(error){
        console.log(error);
    }
    return [];
}