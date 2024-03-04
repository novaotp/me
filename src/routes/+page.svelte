<script lang="ts">
	import { IconPointFilled } from '@tabler/icons-svelte';
</script>

<svelte:head>
	<title>Home - Sajidur Rahman</title>
</svelte:head>

<div class="relative w-full h-full flex justify-center items-start flex-col gap-10">
	<h1 class="">Bonjour, je suis Sajidur Rahman.</h1>
	<p class="text-justify text-3xl">
		Un développeur web axé sur les interfaces utilisateur pour un design fluide et une satisfaction
		client optimale.
	</p>
	<ul class="relative flex flex-wrap">
		<li>Design</li>
		<li><IconPointFilled /></li>
		<li>Développement</li>
		<li><IconPointFilled /></li>
		<li>Maintenance</li>
	</ul>
	<a href="/contact">
		<span
			class="relative py-3 px-10 flex justify-center items-center bg-indigo-700 text-white rounded-t-lg"
			>Un projet en tête ?</span
		>
		<span
			class="relative py-3 px-10 flex justify-center items-center border-2 border-indigo-700 rounded-b-lg"
			>Parlons-en</span
		>
	</a>
</div>
