<script lang="ts">
    import IconChevronLeft from "@tabler/icons-svelte/IconChevronLeft.svelte";
    import { goto } from "$app/navigation";
    import LL, { locale } from "$i18n/i18n-svelte";
    import ArticleCard from "$lib/components/blog/ArticleCard.svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
    $: ({ attributes, html } = data.article);
</script>

<svelte:head>
    <title>{attributes.title} - Sajidur Rahman</title>
    <meta name="description" content="{attributes.description}" />
</svelte:head>
  
<div class="relative h-full w-full max-w-[680px] mt-20 flex flex-col justify-start items-start gap-10 mb-10">
    <button on:click={() => goto(`/${$locale}/blog`)} class="flex gap-5">
        <IconChevronLeft />
        <span>{$LL.articlePage.back()}</span>
    </button>
    <article class="blog-article relative w-full flex flex-col justify-start items-start gap-5 text-justify">
        <div class="relative w-full flex flex-col justify-start items-start gap-5">
            <h1>{attributes.title}</h1>
            <p>{attributes.description}</p>
            <span class="text-sm rounded text-gray-500">Posted on the {attributes.creationDate.toLocaleDateString("fr-CH")}</span>
            <img src="{attributes.banner}" alt="{attributes.title}" class="w-full" />
        </div>
        {@html html}
    </article>
    {#if data.latest.length > 0}
        <aside class="flex flex-col gap-5">
            <h2 class="text-3xl font-semibold">Latest Articles</h2>
            {#each data.latest as { attributes, filename }}
                <ArticleCard {attributes} {filename} />
            {/each}
        </aside>
    {/if}
</div>

<style lang="postcss">
    :global(article.blog-article h1) {
        @apply text-3xl font-semibold;
    }

    :global(article.blog-article h2) {
        @apply underline text-2xl my-5;
    }

    :global(article.blog-article ul) {
        @apply list-disc pl-10;
    }

    :global(article.blog-article a) {
        @apply text-cyan-600 underline;
    }
</style>
