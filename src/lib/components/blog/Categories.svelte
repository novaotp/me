<script lang="ts">
    import LL from "$/i18n/i18n-svelte";
    import { changeSearchParams } from "$/lib/utils/change-search-params";
    import { page } from "$app/stores";

    export let categories: string[];

    $: selectedCategory = $page.url.searchParams.get("category") ?? "all";

    const categoryName = (category: string) => {
        // @ts-expect-error
        return $LL.blogPage.categories[category]()
    }
</script>

<ul class="relative w-full flex flex-nowrap gap-5 overflow-auto">
    <button
        on:click={() => changeSearchParams("category", null)}
        class="relative px-4 py-2 rounded-lg {selectedCategory === "all" ? "bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800" : "text-black dark:text-white"}"
    >
        {$LL.blogPage.categories.all()}
    </button>
    {#each categories as category}
        <button
            on:click={() => changeSearchParams("category", category)}
            class="relative px-4 py-2 rounded-lg {selectedCategory === category ? "bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800" : "text-black dark:text-white"}"
        >
            {categoryName(category)}
        </button>
    {/each}
</ul>
