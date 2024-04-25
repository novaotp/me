<script lang="ts">
	import IconArrowRight from "@tabler/icons-svelte/IconArrowRight.svelte";
	import IconMenu from "@tabler/icons-svelte/IconMenu.svelte";
	
	import { page } from '$app/stores';
    import LL, { locale } from "$i18n/i18n-svelte";
    import { base } from "$app/paths";

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

<nav class="lg:hidden relative w-full h-20 px-10 py-5 flex justify-start items-center">
	<button on:click={showMenu} aria-label="Open the menu">
		<span role="img">
			<IconMenu class="size-6" />
		</span>
	</button>
</nav>

<nav class="lg:flex hidden w-full h-20 px-10 py-5 justify-between items-center">
	<a href="{base}/{$locale}" class="py-1 border-b-2 hover:border-black {pathname === "/" ? "border-black" : "border-transparent"}">
		Sajidur Rahman
	</a>
	<div class="flex items-center gap-12">
		<a href="{base}/{$locale}/work" class="py-1 border-b-2 hover:border-black {pathname === "/work" ? "border-black" : "border-transparent"}">
			{$LL.navigation.workPage()}
		</a>
		<a href="{base}/{$locale}/blog" class="py-1 border-b-2 hover:border-black {pathname === "/blog" ? "border-black" : "border-transparent"}">
			{$LL.navigation.blogPage()}
		</a>
		<a href="{base}/{$locale}/contact" class="bg-indigo-700 py-2 px-6 rounded text-[#fff6ea] flex gap-5 items-center">
			{$LL.navigation.contact.letsWorkTogether()} <IconArrowRight />
		</a>
	</div>
</nav>
