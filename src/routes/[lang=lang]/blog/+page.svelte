<script lang="ts">
    import { page } from '$app/stores';
    import LL from '$i18n/i18n-svelte';
    import Categories from '$/lib/components/blog/Categories.svelte';
    import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;

    $: selectedCategory = $page.url.searchParams.get("category") ?? "all";
    $: filteredArticles = data.articles.filter(({ metadata }) => selectedCategory === "all" || metadata.category === selectedCategory);
</script>

<svelte:head>
    <title>{$LL.blogPage.meta.title()}</title>
    <meta name="description" content={$LL.blogPage.meta.description()} />
</svelte:head>

<div class="relative w-full h-full flex justify-center items-center gap-40 pt-10">
    <div class="relative w-full max-w-[980px] h-full flex justify-center items-center px-10 flex-col gap-10">
        <h1 class="text-center font-medium text-3xl">Blog</h1>
        <p class="w-full text-center text-gray-500 dark:text-gray-400">{$LL.blogPage.summary()}</p>
        <Categories categories={data.categories} />
        <div class="relative w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            {#each filteredArticles as article (article.filename)}
                <ArticleCard metadata={article.metadata} filename={article.filename} />
            {/each}
        </div>
    </div>
</div>
