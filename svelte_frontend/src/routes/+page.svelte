<script lang="ts">
    import { signIn } from "@auth/sveltekit/client"
    function handleSignIn(){
        signIn("google");
    }
 </script>
  
 <div>
   <button on:click={handleSignIn}>Sign In with Google</button>
 </div> 