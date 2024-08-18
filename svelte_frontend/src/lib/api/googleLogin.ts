import { PUBLIC_BACKEND_URL } from '$env/static/public';
import axios from 'axios'
export default async function googleLogin():Promise<string[]>{
    try{
        console.log(document.cookie)
        
        const res=await axios.get(`${PUBLIC_BACKEND_URL}auth`,{
            headers:{

            },
            withCredentials: true,
    });
        return res.data;
    }catch(error){
        console.log(error);
    }
    return [];
}