<script lang="ts">
    import { mount } from 'svelte';
    import { addToast } from '$stores/toast.svelte';
    import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
    import IconCopy from '@tabler/icons-svelte/icons/copy';
    import IconCopyCheck from '@tabler/icons-svelte/icons/copy-check';
    import LL, { locale } from '$i18n/i18n-svelte';
    import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
    import BackToTop from '$lib/components/blog/BackToTop.svelte';
    import { goto } from '$app/navigation';

    let { data } = $props();

    const ICON_CHECKED_MS = 3000;

    let metadata = $derived(data.article.metadata);
    let html = $derived(data.article.html);

    $effect(() => {
        function copyTextToClipboard(text: string): boolean {
            if (navigator?.clipboard?.writeText) {
                navigator.clipboard.writeText(text);
                return true;
            }

            return false;
        }

        function swapIconAfterCopy(copyButton: HTMLButtonElement): void {
            copyButton.innerHTML = '';
            mount(IconCopyCheck, { target: copyButton });
            setTimeout(() => {
                copyButton.innerHTML = '';
                mount(IconCopy, { target: copyButton });
            }, ICON_CHECKED_MS);
        }

        document
            .querySelectorAll<HTMLButtonElement>('button.codeblock-copy-button')
            .forEach(async (copyButton: HTMLButtonElement) => {
                copyButton.addEventListener('click', async () => {
                    const copied = copyTextToClipboard(copyButton.getAttribute('data-content')!);

                    if (!copied) {
                        return addToast({ type: 'error', message: $LL.articlePage.copy.fail() });
                    }

                    addToast({ type: 'success', message: $LL.articlePage.copy.success() });
                    swapIconAfterCopy(copyButton);
                });
            });
    });
</script>

<svelte:head>
    <title>{metadata.title} - Sajidur Rahman</title>
    <meta name="description" content={metadata.description} />
</svelte:head>

<div
    class="relative h-full w-full max-w-[760px] mt-10 px-10 lg:mt-20 flex flex-col justify-start items-start gap-10 mb-10"
>
    <button onclick={() => goto(`/${$locale}/blog`)} class="flex gap-5">
        <IconChevronLeft />
        <span>{$LL.articlePage.back()}</span>
    </button>
    <article class="relative w-full flex flex-col justify-start items-start gap-5 text-justify">
        <div class="relative w-full flex flex-col justify-start items-start gap-5">
            <div class="flex gap-3 items-center">
                <time class="text-sm">
                    {$LL.articlePage.postedAt(
                        metadata.creationDate.toLocaleDateString($locale, {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })
                    )}
                </time>
                <div class="h-5 w-[1px] bg-gray-500"></div>
                <time class="text-blue-700 dark:text-sky-300 text-sm"
                    >{$LL.blogPage.readTime(metadata.readTime).toUpperCase()}</time
                >
            </div>
            <h1 class="text-3xl font-semibold">{metadata.title}</h1>
            <p>{metadata.description}</p>
            <img
                src={metadata.banner}
                alt={metadata.bannerAlt ?? metadata.shortTitle ?? metadata.title}
                class="w-full"
                fetchpriority="high"
            />
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

<style>
    @import url('https://fonts.cdnfonts.com/css/cascadia-code');

    :global(div.blog-article code) {
        padding: 20px 0;
        counter-reset: line;
    }

    :global(div.blog-article code *) {
        font-family: 'Cascadia Code', sans-serif;
    }

    :global(div.blog-article span[data-highlighted-line]) {
        background-color: rgba(200, 200, 255, 0.1);
    }

    :global(div.blog-article code > [data-line]) {
        padding: 2px 20px;
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
        font-size: 1.5rem;
        font-weight: 600;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }

    :global(div.blog-article h3) {
        font-size: 1.25rem;
        font-weight: 600;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }

    :global(div.blog-article ul) {
        list-style-type: disc;
        margin-left: 2.5rem;
        margin-bottom: 1.25rem;
    }

    :global(div.blog-article a span, div.blog-article a svg) {
        color: #4f46e5;
        font-weight: 600;
    }

    :global(html.dark div.blog-article a span, html.dark div.blog-article a svg) {
        color: #38bdf8;
        font-weight: 600;
    }

    :global(div.blog-article p) {
        margin-bottom: 1.25rem;
    }

    :global(div.blog-article h2 > p) {
        margin-bottom: 0;
    }

    :global(div.blog-article figure) {
        position: relative;
        width: 100%;
        color: #ffffff;
        margin-bottom: 1.25rem;
    }

    :global(div.blog-article figure pre code) {
        overflow: auto;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
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
