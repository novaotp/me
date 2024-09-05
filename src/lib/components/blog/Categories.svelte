<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import LL, { locale } from '$i18n/i18n-svelte';
    import { constructUrl } from '$lib/utils/construct-url';

    interface Props {
        categories: string[];
    }

    let { categories }: Props = $props();

    let selectedCategory = $derived($page.params.category ?? 'all');

    const categoryName = (category: string) => {
        // @ts-expect-error
        return $LL.blogPage.categories[category]();
    };
</script>

<div class="relative w-full flex flex-nowrap gap-5 overflow-auto">
    <button
        onclick={() => goto(constructUrl($locale, '/blog'))}
        class="relative px-4 py-2 rounded-lg {selectedCategory === 'all'
            ? 'bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800'
            : 'text-black dark:text-white'}"
    >
        {$LL.blogPage.categories.all()}
    </button>
    {#each categories as category}
        <button
            onclick={() => goto(constructUrl($locale, `/blog/${category}`))}
            class="relative px-4 py-2 rounded-lg {selectedCategory === category
                ? 'bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800'
                : 'text-black dark:text-white'}"
        >
            {categoryName(category)}
        </button>
    {/each}
</div>
