import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/core/providers/google";
import { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const {handle,signIn,signOut} = SvelteKitAuth({
    providers: [
        Google({
            clientId: VITE_GOOGLE_CLIENT_ID,
            clientSecret: VITE_GOOGLE_CLIENT_SECRET
        })
    ],
});
