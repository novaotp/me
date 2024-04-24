<script lang="ts">
    import ArticleCard from "$lib/components/blog/ArticleCard.svelte";
    import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>Blog - Sajidur Rahman</title>
</svelte:head>

<div class="relative w-full h-full flex justify-center items-center flex-col gap-10">
	<h1 class="text-center font-medium text-3xl">Blog</h1>
	<div class="relative w-full grid grid-cols-1 gap-5">
		{#each data.articles as { title, description, url }}
			<ArticleCard {title} {description} {url} />
		{/each}
	</div>
</div>
