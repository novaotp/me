<script lang="ts">
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import IconCopy from '@tabler/icons-svelte/IconCopy.svelte';
    import IconCopyCheck from '@tabler/icons-svelte/IconCopyCheck.svelte';
    import { goto } from '$app/navigation';
    import LL, { locale } from '$i18n/i18n-svelte';
    import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
    import type { PageServerData } from './$types';
    import BackToTop from './BackToTop.svelte';
    import { afterUpdate } from 'svelte';
    import { addToast } from '$/lib/stores/toast';

    export let data: PageServerData;
    $: ({ metadata, html } = data.article);

    afterUpdate(() => {
        document.querySelectorAll<HTMLButtonElement>('button.codeblock-copy-button').forEach(async (copyButton: HTMLButtonElement) => {
            copyButton.addEventListener('click', () => {
                if (navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(copyButton.getAttribute('data-content')!);
                    addToast({ type: 'success', message: $LL.articlePage.copy.success() });
                    copyButton.innerHTML = '';
                    new IconCopyCheck({ target: copyButton });
                    setTimeout(() => {
                        copyButton.innerHTML = '';
                        new IconCopy({ target: copyButton });
                    }, 2000);
                } else {
                    addToast({ type: 'error', message: $LL.articlePage.copy.fail() });
                }
            });
        });
    });
</script>

<svelte:head>
    <title>{metadata.shortTitle ?? metadata.title} - Sajidur Rahman</title>
    <meta name="description" content={metadata.description} />
</svelte:head>

<div class="relative h-full w-full max-w-[760px] mt-10 px-10 lg:mt-20 flex flex-col justify-start items-start gap-10 mb-10">
    <button on:click={() => goto(`/${$locale}/blog`)} class="flex gap-5">
        <IconChevronLeft />
        <span>{$LL.articlePage.back()}</span>
    </button>
    <article class="relative w-full flex flex-col justify-start items-start gap-5 text-justify">
        <div class="relative w-full flex flex-col justify-start items-start gap-5">
            <h1 class="text-3xl font-semibold">{metadata.title}</h1>
            <p>{metadata.description}</p>
            <span class="text-sm rounded text-gray-500">{$LL.articlePage.postedAt()} {metadata.creationDate.toLocaleDateString('fr-CH')}</span>
            <img src={metadata.banner} alt={metadata.bannerAlt ?? metadata.shortTitle ?? metadata.title} class="w-full" />
        </div>
        <aside class="flex flex-col gap-5">
            <h2 class="text-2xl font-semibold pt-5">{$LL.articlePage.summary()}</h2>
            <ul class="flex flex-col gap-2 list-decimal">
                {#each data.summary as { heading, slug }}
                    <li class="ml-5">
                        <a href="#{slug}" class="text-start no-underline">{heading}</a>
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
            <h2 class="text-3xl font-semibold">{$LL.articlePage.latestArticles()}</h2>
            {#each data.latest as { metadata, filename }}
                <ArticleCard {metadata} {filename} class="w-full" />
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
        font-family: 'Cascadia Code', sans-serif;
    }

    :global(div.blog-article span[data-highlighted-line]='') {
        background-color: rgba(200, 200, 255, 0.1);
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
        @apply list-disc ml-10 mb-5;
    }

    :global(div.blog-article a) {
        @apply text-indigo-700 dark:text-sky-300 font-semibold;
    }

    :global(div.blog-article p) {
        @apply mb-5;
    }

    :global(div.blog-article h2 > p) {
        @apply mb-0;
    }

    :global(div.blog-article figure) {
        @apply relative w-full text-white mb-5;
    }

    :global(div.blog-article figure pre code) {
        @apply overflow-auto rounded-b-lg;
    }

    :global(div.blog-article code),
    :global(div.blog-article code span) {
        color: var(--shiki-light);
        background-color: var(--shiki-light-bg);
    }

    :global(html.dark div.blog-article code),
    :global(html.dark div.blog-article code span) {
        color: var(--shiki-dark);
        background-color: var(--shiki-dark-bg);
    }
</style>
