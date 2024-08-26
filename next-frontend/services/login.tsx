import axios from 'axios'
export async function login(username:string,email:string,password:string):Promise<number>{
    try{
        const res=await axios.post(`${process.env.NEXT_PUBLIC_AUTHSERVICE_URL}/auth/login`,{
            username:username,
            password:password,
            email:email,
        },{withCredentials:true});
        return res.status;
    }catch(error){
        console.log(error);
    }
    return 400;
}