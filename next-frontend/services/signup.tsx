import axios from 'axios'
export async function signup(username:string,email:string,password:string){
    try{
        const res=await axios.post(`${process.env.NEXT_PUBLIC_AUTHSERVICE_URL}/auth/signup`,{
            username:username,
            password:password,
            email:email,
        });
        return res;
    }catch(error){
        console.log(error);
    }
    return [];
}