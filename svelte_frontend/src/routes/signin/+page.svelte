<script lang="ts">
  import { signIn } from "@auth/sveltekit/client"
  function handleSignIn(){
      signIn("google",{callbackUrl:'/'});
  }
</script>

<main class="flex items-center justify-center min-h-screen bg-gray-100">
<div class="bg-white p-8 rounded shadow-md">
  <div class="text-2xl font-bold mb-4">
    <button class="bg-blue-500 text-white px-4 py-2 rounded" on:click={handleSignIn}>Sign In with Google</button>
  </div>
</div>
</main>