<script lang="ts">
	import { IconMenuDeep } from '@tabler/icons-svelte';

	export let show: boolean;

	const showMenu = () => (show = true);
</script>

<!--
@component

Renders a navbar adapted for devices under 1024px wide.
-->

<nav
	class="lg:hidden relative w-full h-20 px-10 py-5 flex justify-end"
>
	<button on:click={showMenu} aria-label="Open the menu">
		<span role="img">
			<IconMenuDeep size={32} />
		</span>
	</button>
</nav>
