<script lang="ts">
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import { goto } from '$app/navigation';
    import LL, { locale } from '$i18n/i18n-svelte';
    import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
    import type { PageServerData } from './$types';
    import BackToTop from './BackToTop.svelte';

    export let data: PageServerData;
    $: ({ attributes, html } = data.article);
</script>

<svelte:head>
    <title>{attributes.shortTitle ?? attributes.title} - Sajidur Rahman</title>
    <meta name="description" content={attributes.description} />
</svelte:head>

<div class="relative h-full w-full max-w-[680px] mt-10 lg:mt-20 flex flex-col justify-start items-start gap-10 mb-10">
    <button on:click={() => goto(`/${$locale}/blog`)} class="flex gap-5">
        <IconChevronLeft />
        <span>{$LL.articlePage.back()}</span>
    </button>
    <article class="relative w-full flex flex-col justify-start items-start gap-5 text-justify">
        <div class="relative w-full flex flex-col justify-start items-start gap-5">
            <h1 class="text-3xl font-semibold">{attributes.title}</h1>
            <p>{attributes.description}</p>
            <span class="text-sm rounded text-gray-500">Posted on the {attributes.creationDate.toLocaleDateString('fr-CH')}</span>
            <img src={attributes.banner} alt={attributes.bannerAlt ?? attributes.shortTitle ?? attributes.title} class="w-full" />
        </div>
        <aside class="flex flex-col gap-5">
            <h2 class="text-2xl font-semibold pt-5">Summary</h2>
            <ul class="flex flex-col gap-2 list-decimal">
                {#each data.summary as { original, slug }}
                    <li class="ml-5">
                        <a href="#{slug}" class="text-start no-underline">{original}</a>
                    </li>
                {/each}
            </ul>
        </aside>
        <div class="blog-article relative w-full flex flex-col justify-start items-start text-justify">
            {@html html}
        </div>
    </article>
    {#if data.latest.length > 0}
        <aside class="relative w-full flex flex-col gap-5">
            <h2 class="text-3xl font-semibold">Latest Articles</h2>
            {#each data.latest as { attributes, filename }}
                <ArticleCard {attributes} {filename} class="w-full" />
            {/each}
        </aside>
    {/if}
    <BackToTop />
</div>

<style lang="postcss">
    @import url('https://fonts.cdnfonts.com/css/cascadia-code');

    :global(div.blog-article code) {
        @apply py-5;
        counter-reset: line;
    }

    :global(div.blog-article code *) {
        font-family: "Cascadia Code", sans-serif;
    }

    :global(div.blog-article span[data-highlighted-line]) {
        background-color: rgba(200,200,255,.1);
    }

    :global(div.blog-article code > [data-line]) {
        @apply px-5 py-[2px];
    }

    :global(div.blog-article code[data-line-numbers] > [data-line]::before) {
        counter-increment: line;
        content: counter(line);
        display: inline-block;
        width: 1rem;
        margin-right: 2rem;
        text-align: right;
        color: gray;
    }
    
    :global(div.blog-article h2) {
        @apply text-2xl font-semibold py-5;
    }

    :global(div.blog-article h3) {
        @apply text-xl font-semibold py-5;
    }

    :global(div.blog-article ul) {
        @apply list-disc ml-10;
    }

    :global(div.blog-article a) {
        @apply text-indigo-700 dark:bg-sky-300 font-semibold;
    }

    :global(div.blog-article p) {
        @apply mb-5;
    }

    :global(div.blog-article h2 > p) {
        @apply mb-0;
    }

    :global(div.blog-article figure) {
        @apply relative w-full rounded text-white overflow-auto mb-5 bg-[#282c34];
    }
</style>
