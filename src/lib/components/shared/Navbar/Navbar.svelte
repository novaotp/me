<script lang="ts">
	import { page } from '$app/stores';
	import { IconArrowRight, IconMenuDeep } from '@tabler/icons-svelte';

	export let show: boolean;

	const showMenu = () => {
		show = true;
		document.body.style.overflow = 'hidden';
	};

	$: pathname = $page.url.pathname;
</script>

<!--
@component

Renders a navbar adapted for devices under 1024px wide.
-->

<nav class="lg:hidden relative w-full h-20 px-10 py-5 flex justify-end">
	<button on:click={showMenu} aria-label="Open the menu">
		<span role="img">
			<IconMenuDeep size={32} />
		</span>
	</button>
</nav>

<nav class="lg:flex hidden w-full h-20 px-10 py-5 justify-between items-center">
	<a href="/" class="py-1 border-b-2 hover:border-black {pathname === "/" ? "border-black" : "border-transparent"}">Sajidur Rahman</a>
	<div class="flex items-center gap-12">
		<a href="/work" class="py-1 border-b-2 hover:border-black {pathname === "/work" ? "border-black" : "border-transparent"}">Mes travaux</a>
		<a href="/blog" class="py-1 border-b-2 hover:border-black {pathname === "/blog" ? "border-black" : "border-transparent"}">Blog</a>
		<a href="/contact" class="bg-indigo-700 py-2 px-6 rounded-lg text-[#fff6ea] flex gap-5 items-center">
			Travaillons ensemble <IconArrowRight />
		</a>
	</div>
</nav>
