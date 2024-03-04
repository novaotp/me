<script lang="ts">
	import '../app.css';
	import ToastContainer from '$lib/shared/Toast/ToastContainer.svelte';
	import Navbar from '$lib/shared/Navbar/Navbar.svelte';
	import NavPage from '$lib/shared/Navbar/NavPage.svelte';

	let show: boolean = false;
</script>

<NavPage bind:show />
<Navbar bind:show />
<ToastContainer />
<main class="relative w-full min-h-[calc(100%-5rem)] flex-grow p-10 flex justify-center items-center flex-col">
	<slot />
</main>
