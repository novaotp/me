<script lang="ts">
    import { page } from '$app/stores';
    import LL from '$i18n/i18n-svelte';
    import ArticleCard from '$lib/components/blog/ArticleCard.svelte';
    import type { PageServerData } from './$types';
    import { goto } from '$app/navigation';

    export let data: PageServerData;

    let selectedTagsParam: string = $page.url.searchParams.get('tags') ?? '';
    $: selectedTags = selectedTagsParam !== '' ? selectedTagsParam.split(',').slice(1) : [];

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            selectedTags = selectedTags.filter((t) => t !== tag);
        } else {
            selectedTags = [...selectedTags, tag];
        }

        if (selectedTags.length === 0) {
            goto($page.url.pathname);
            return;
        }

        const newTagsParam = selectedTags.join(',');
        const searchParams = new URLSearchParams();
        searchParams.set('tags', newTagsParam);

        goto(`${$page.url.pathname}?${searchParams}`);
    };
</script>

<svelte:head>
    <title>{$LL.blogPage.meta.title()}</title>
    <meta name="description" content={$LL.blogPage.meta.description()} />
</svelte:head>

<div class="relative w-full h-full flex justify-center items-start gap-40 pt-10">
    <ul class="hidden sticky top-0 left-0 2xl:flex flex-col pt-[120px] gap-2">
        <h2 class="text-xl mb-5">Tags</h2>
        <button
            class="relative w-full flex gap-5 {selectedTags.length === 0
                ? 'dark:text-sky-300 text-indigo-700'
                : 'text-gray-500'} rounded hover:dark:text-sky-300 hover:text-indigo-700 group"
            on:click={() => {
                selectedTags = [];
                goto($page.url.pathname);
            }}
        >
            <span
                class="size-6 text-sm flex justify-center items-center {selectedTags.length === 0
                    ? 'dark:text-sky-300 text-indigo-700'
                    : 'text-gray-500'} group-hover:dark:text-sky-300 group-hover:text-indigo-700 rounded-full"
            >
                {data.articles.length}
            </span>
            <span>All</span>
        </button>
        {#each data.tagsWithCount as [tag, count]}
            {@const liColors = selectedTags.includes(tag) ? 'dark:text-sky-300 text-indigo-700' : 'text-gray-500'}
            {@const countColors = selectedTags.includes(tag) ? 'dark:text-sky-300 text-indigo-700' : 'text-gray-500'}
            <li class="relative w-full">
                <button
                    class="relative w-full flex gap-5 {liColors} rounded hover:dark:text-sky-300 hover:text-indigo-700 group"
                    on:click={() => toggleTag(tag)}
                >
                    <span
                        class="size-6 text-sm flex justify-center items-center {countColors} group-hover:dark:text-sky-300 group-hover:text-indigo-700 rounded-full"
                    >
                        {count}
                    </span>
                    <span>{tag}</span>
                </button>
            </li>
        {/each}
    </ul>
    <div class="relative w-full max-w-[980px] h-full flex justify-center items-center px-10 flex-col gap-10">
        <h1 class="text-center font-medium text-3xl">Blog</h1>
        <p class="w-full text-center text-gray-500 dark:text-gray-400">{$LL.blogPage.summary()}</p>
        <div class="relative w-full grid grid-cols-1 md:grid-cols-2 gap-10">
            {#each data.articles as { metadata, filename }}
                {#if selectedTags.length === 0 || metadata.tags.some((t) => selectedTags.includes(t))}
                    <ArticleCard {metadata} {filename} />
                {/if}
            {/each}
        </div>
    </div>
</div>
