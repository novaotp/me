<script lang="ts">
	import About from '$lib/components/home/About.svelte';
	import Main from '$lib/components/home/Main.svelte';
	import Services from '$lib/components/home/services/Services.svelte';
	import IconCopyright from '@tabler/icons-svelte/IconCopyright.svelte';
</script>

<svelte:head>
	<title>Home - Sajidur Rahman</title>
</svelte:head>

<div class="relative flex flex-col items-center gap-32">
	<Main />
	<Services />
	<About />
</div>
<footer class="flex gap-2 mt-10">
	<IconCopyright /> 2024 - Sajidur Rahman
</footer>