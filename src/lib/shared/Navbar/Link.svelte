<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	export let href: string;
	export let label: string;

	const dispatch = createEventDispatcher();

	$: colors = $page.url.pathname === href ? 'text-[#fff6ea] bg-black' : 'text-black';
</script>

<!--
@component

Renders a link represented as an icon for the navbar.

If the current path is the same as the href, the css will highlight it.
-->

<li class="relative">
	<a
		{href}
		on:click={() => dispatch('click')}
		class="relative px-10 p-4 flex justify-center items-center rounded-md {colors} sm:px-5"
		aria-label="Go to the {label} page"
	>
		{label}
	</a>
</li>
