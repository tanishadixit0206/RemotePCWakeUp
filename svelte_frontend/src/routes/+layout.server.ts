import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({locals,url}) => {

    if(url.pathname==='/signin'){
        return {}
    }
    const session = await locals.auth();
    console.log("printing session",session);
    if (!session) {
        throw redirect(303, '/signin');
    }else{
      console.log("session found",session);
    }
    return {
        session
    };
};