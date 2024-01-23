<script lang="ts">
	import { page } from '$app/stores';
	import type { ComponentType } from 'svelte';

	export let icon: ComponentType;
	export let href: string;
	export let label: string;

	$: colors =
		$page.url.pathname === href
			? 'text-white bg-black'
			: 'text-black hover:bg-gray-200';
</script>

<!--
@component

Renders a link represented as an icon for the navbar.

If the current path is the same as the href, the css will highlight it.
-->

<li class="relative h-full aspect-square sm:aspect-auto">
	<a {href} class="relative h-full flex justify-center items-center rounded-md {colors} sm:px-5">
		<svelte:component this={icon} />
		<p class="hidden sm:flex ml-[10px] relative h-full justify-center items-center">
			{label}
		</p>
	</a>
</li>
