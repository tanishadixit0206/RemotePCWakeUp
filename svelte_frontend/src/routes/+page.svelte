<script lang="ts">
  let devices: any[] = [];
  let isLoading = true;

	function handleAddDevice() {}
	function toggleDevice(id: number, status: string): any {}

</script>
 
 <main class="p-4">
  <h1 class="text-2xl font-bold mb-4">My Devices</h1>
  <button on:click={handleAddDevice} class="bg-green-500 text-white px-4 py-2 rounded mb-4">Add Device</button>

  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <ul>
      {#each devices as device}
        <li class="flex items-center justify-between mb-2 p-2 bg-white shadow rounded">
          <span>{device.name}</span>
          {#if device.status === 'off'}
            <button on:click={() => toggleDevice(device.id, 'on')} class="bg-blue-500 text-white px-4 py-2 rounded">Turn On</button>
          {:else}
            <button on:click={() => toggleDevice(device.id, 'off')} class="bg-red-500 text-white px-4 py-2 rounded">Turn Off</button>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</main>

