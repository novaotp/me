<script lang="ts">
	import { page } from '$app/stores';

	export let href: string;
	export let label: string;

	const colors =
		$page.url.pathname !== href
			? 'bg-transparent text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
			: 'bg-black dark:bg-white text-white dark:text-black';
</script>

<!--
@component

Renders a link represented as an icon for the navbar.

If the current path is the same as the href, the css will highlight it.
-->

<li class="relative h-full aspect-square sm:aspect-auto">
	<a {href} class="relative h-full flex justify-center items-center rounded-md {colors} sm:px-5">
		<p class="hidden sm:flex ml-[10px] relative h-full justify-center items-center">
			{label}
		</p>
	</a>
</li>
