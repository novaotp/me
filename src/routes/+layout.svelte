<script lang="ts">
	import '../app.css';
	import ToastContainer from '$lib/components/shared/Toast/ToastContainer.svelte';
	import Navbar from '$lib/components/shared/Navbar/Navbar.svelte';
	import NavPage from '$lib/components/shared/Navbar/NavPage.svelte';
   	import { setLocale } from '../i18n/i18n-svelte'
    import type { LayoutData, LayoutServerData } from './$types';

	let show: boolean = false;

	export let data: LayoutData;

	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale)
</script>

<NavPage bind:show />
<Navbar bind:show />
<ToastContainer />
<main class="relative w-full min-h-[calc(100%-5rem)] flex-grow px-10 lg:px-[120px] flex justify-center items-center flex-col">
	<slot />
</main>
