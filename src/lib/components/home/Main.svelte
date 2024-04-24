<script lang="ts">
	import { IconPointFilled } from '@tabler/icons-svelte';
</script>

<div class="relative w-full h-full flex justify-center items-start flex-col gap-14">
	<p>Bonjour, je suis Sajidur Rahman.</p>
	<h1 class="text-justify text-3xl max-w-[1400px] 2xl:text-5xl">
		Un développeur web axé sur les interfaces utilisateur pour un design fluide et une satisfaction
		client optimale.
	</h1>
	<ul class="relative flex flex-wrap">
		<li>Design</li>
		<li><IconPointFilled /></li>
		<li>Développement</li>
		<li><IconPointFilled /></li>
		<li>Maintenance</li>
	</ul>
	<a href="/contact" aria-label="Go to the contact page" class="sm:flex">
		<span
			class="relative py-3 px-10 flex justify-center items-center bg-indigo-700 text-white rounded-t-lg sm:rounded-tr-none sm:rounded-l-lg"
			>Un projet en tête ?</span
		>
		<span
			class="relative py-3 px-10 flex justify-center items-center border-2 border-indigo-700 rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg"
			>Parlons-en</span
		>
	</a>
</div>
