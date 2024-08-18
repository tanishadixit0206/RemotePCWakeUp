import { redirect } from "@sveltejs/kit";
import { signIn } from "../../auth"
import type { Actions, PageServerLoad } from "./$types"
export const actions: Actions = { default: signIn }

export const load:PageServerLoad=async(event)=>{
    const session=await event.locals.auth();
    console.log("trying to print session",session);
    if(session){
        throw redirect(303,'/');
    }
    return{};
}