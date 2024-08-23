import axios from 'axios'
export async function signup(username:string,email:string,password:string){
    try{
        const res=await axios.post('',{
            username:username,
            password:password,
            email:email,
        });
        return res.data;
    }catch(error){
        console.log(error);
    }
    return [];
}