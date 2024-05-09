<script lang="ts">
    import LL from '$i18n/i18n-svelte';
    import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
</script>

<svelte:head>
    <title>{$LL.blogPage.meta.title()}</title>
    <meta name="description" content={$LL.blogPage.meta.description()} />
</svelte:head>

<div class="relative w-full max-w-[900px] h-full flex justify-center items-center flex-col gap-10">
    <h1 class="text-center font-medium text-3xl mt-10">Blog</h1>
    <p class="w-full text-center text-gray-500 dark:text-gray-400">{$LL.blogPage.summary()}</p>
    <div class="relative w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {#each data.articles as { attributes, filename }}
            <ArticleCard {attributes} {filename} />
        {/each}
    </div>
</div>
