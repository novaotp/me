<script lang="ts">
    import { mount } from 'svelte';
    import { addToast } from '$stores/toast.svelte';
    import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
    import IconCopy from '@tabler/icons-svelte/icons/copy';
    import IconCopyCheck from '@tabler/icons-svelte/icons/copy-check';
    import LL, { locale } from '$i18n/i18n-svelte';
    import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
    import BackToTop from '$components/blog/filename/BackToTop.svelte';
    import { goto } from '$app/navigation';
    import ArticleBody from '$components/blog/filename/ArticleBody.svelte';
    import TableOfContents from '$components/blog/filename/TableOfContents.svelte';
    import EstimatedReadTime from '$components/blog/filename/EstimatedReadTime.svelte';
    import PublishedAt from '$components/blog/filename/PublishedAt.svelte';

    let { data } = $props();

    const ICON_CHECKED_MS = 3000;

    let metadata = $derived(data.article.metadata);
    let html = $derived(data.article.html);

    const copyTextToClipboard = (text: string): boolean => {
        if (navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text);
            return true;
        }

        return false;
    };

    const swapIconAfterCopy = (copyButton: HTMLButtonElement): void => {
        copyButton.innerHTML = '';
        mount(IconCopyCheck, { target: copyButton });

        setTimeout(() => {
            copyButton.innerHTML = '';
            mount(IconCopy, { target: copyButton });
        }, ICON_CHECKED_MS);
    };

    const onCopyButtonClick = (copyButton: HTMLButtonElement) => {
        const copied = copyTextToClipboard(copyButton.getAttribute('data-content')!);

        if (!copied) {
            return addToast({ type: 'error', message: $LL.articlePage.copy.fail() });
        }

        addToast({ type: 'success', message: $LL.articlePage.copy.success() });
        swapIconAfterCopy(copyButton);
    };

    $effect(() => {
        const copyButtons = document.querySelectorAll<HTMLButtonElement>('button.codeblock-copy-button');

        copyButtons.forEach((copyButton) => {
            copyButton.addEventListener('click', () => onCopyButtonClick(copyButton));
        });

        return () => {
            copyButtons.forEach((copyButton) => {
                copyButton.removeEventListener('click', () => onCopyButtonClick(copyButton));
            });
        };
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
                <PublishedAt creationDate={metadata.creationDate} />
                <div class="h-5 w-[1px] bg-gray-500"></div>
                <EstimatedReadTime readTime={metadata.readTime} />
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
        <TableOfContents headings={data.article.summaryHeadings} />
        <ArticleBody {html} />
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
