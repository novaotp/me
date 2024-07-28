<script lang="ts">
    import { goto } from '$app/navigation';
    import LL, { locale } from '$i18n/i18n-svelte';
    import type { ArticleMetadata } from '$lib/server/article';
    import { constructUrl } from '$lib/utils/construct-url';
    import { base } from '$app/paths';

    export let filename: string;
    export let metadata: ArticleMetadata;
    $: ({ title, description, banner, creationDate, readTime } = metadata);
</script>

<button
    on:click={() => goto(constructUrl($locale, `/blog/${filename}`), { noScroll: false })}
    class="relative rounded-lg shadow-[0_0_15px_0px_rgba(0,0,0,0.25)] duration-150 flex flex-col items-start overflow-hidden {$$restProps.class ?? ''}
           hover:scale-105 hover:shadow-[0_0_25px_0px_rgba(0,0,0,0.25)]
           dark:bg-zinc-700"
>
    <div role="img" style="background-image: url('{base}{banner}');" class="relative w-full h-[200px] bg-center bg-cover flex justify-center items-center overflow-hidden"></div>
    <div class="relative w-full flex flex-col items-start gap-[10px] p-10">
        <div class="flex gap-3 items-center">
            <time class="text-gray-400 text-sm">{creationDate.toLocaleDateString($locale)}</time>
            <div class="h-5 w-[1px] bg-gray-400 dark:bg-gray-500"></div>
            <time class="text-blue-700 dark:text-sky-300 text-sm">{$LL.blogPage.readTime(readTime).toUpperCase()}</time>
        </div>
        <h2 class="relative w-full text-start text-xl">{title}</h2>
        <p class="text-justify text-gray-500 dark:text-gray-400 line-clamp-3">{description}</p>
    </div>
</button>
