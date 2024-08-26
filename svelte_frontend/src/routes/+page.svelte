<script lang="ts">
	import { getDevices } from "$lib/api/getDevices";
	import googleLogin from "$lib/api/googleLogin";
	import type { Device } from "$lib/types";
	import { signOut } from "@auth/sveltekit/client";
	import { onMount } from "svelte";

  let devices: Device[] = [];
  let isLoading = true;

  onMount(async()=>{
    try{
      // await googleLogin();
      devices=await getDevices();
      console.log(devices,JSON.stringify(devices[0]));
      isLoading=false;
    }catch(error){
      console.log(error);
    }
  })

  async function handleSignOut(){
    try{
      await signOut();
    }catch(error){
      console.log(error);
    }
  }
	// function handleAddDevice() {}
	function toggleDevice( status: string): any {}

</script>
 
 <main class="p-4">
  <h1 class="text-2xl font-bold mb-4">My Devices</h1>
  <button on:click={handleSignOut} class="bg-green-500 text-white px-4 py-2 rounded mb-4">SignOut</button>
  <!-- <button on:click={handleAddDevice} class="bg-green-500 text-white px-4 py-2 rounded mb-4">Add Device</button> -->

  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <ul>
      {#each devices as device}
        <li class="flex items-center justify-between mb-2 p-2 bg-white shadow rounded">
          <span>{device.IP}</span>
          <span>{device.MAC}</span>

          {#if device.Status === 'On'}
            <button on:click={() => toggleDevice(device.MAC)} class="bg-red-500 text-white px-4 py-2 rounded">Turn Off</button>
          {:else}
            <button on:click={() => toggleDevice(device.MAC)} class="bg-blue-500 text-white px-4 py-2 rounded">Turn On</button>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</main>

