<script lang="ts">
	import { IconCopyright, IconX } from '@tabler/icons-svelte';
	import { fly } from 'svelte/transition';
	import Link from './Link.svelte';

	export let show: boolean;

	const closeMenu = () => {
		show = false;
		document.body.style.overflow = 'auto';
	};
</script>

{#if show}
	<aside
		class="fixed w-full h-full flex flex-col justify-center items-center z-50 bg-[#fff6ea]"
		transition:fly={{ x: 400 }}
	>
		<nav class="lg:hidden relative w-full h-20 px-10 py-5 flex justify-end">
			<button on:click={closeMenu} aria-label="Close the menu">
				<span role="img">
					<IconX size={32} />
				</span>
			</button>
		</nav>
		<article
			class="relative w-full flex-grow flex flex-col justify-center items-center list-none gap-10"
		>
			<Link label="Home" href="/" on:click={closeMenu} />
			<Link label="Mes travaux" href="/work" on:click={closeMenu} />
			<Link label="Blog" href="/blog" on:click={closeMenu} />
			<a href="/contact" aria-label="Go to the contact page" on:click={closeMenu}>
				<span
					class="relative py-3 px-10 flex justify-center items-center bg-indigo-700 text-white rounded-t-lg"
					>Un projet en tête ?</span
				>
				<span
					class="relative py-3 px-10 flex justify-center items-center border-2 border-indigo-700 rounded-b-lg"
					>Parlons-en</span
				>
			</a>
		</article>
		<footer class="flex mb-10 gap-2">
			<IconCopyright /> 2024 - Sajidur Rahman
		</footer>
	</aside>
{/if}
