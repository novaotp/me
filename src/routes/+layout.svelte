<script>
	import '../app.css';
	import Navbar from '$lib/shared/Navbar/Navbar.svelte';
	import ToastContainer from '$lib/shared/Toast/ToastContainer.svelte';
</script>

<div class="relative w-full h-full flex flex-col">
	<ToastContainer />
	<main class="relative w-full flex-grow p-10 flex justify-center items-center">
		<slot />
	</main>
	<Navbar />
</div>
