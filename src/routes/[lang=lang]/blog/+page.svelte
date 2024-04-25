<script lang="ts">
    import LL from "$i18n/i18n-svelte";
    import ArticleCard from "$lib/components/blog/ArticleCard.svelte";
    import { fade, fly } from "svelte/transition";
    import type { PageServerData } from "./$types";

	export let data: PageServerData;
</script>

<svelte:head>
	<title>{$LL.blogPage.meta.title()}</title>
</svelte:head>

<div class="relative w-full h-full flex justify-center items-center flex-col gap-10">
	<h1 class="text-center font-medium text-3xl">Blog</h1>
	<div class="relative w-full grid grid-cols-1 gap-5">
	{#each data.articles as { attributes, filename }}
			<ArticleCard {attributes} {filename} />
	{/each}
	</div>
</div>
