<script lang="ts">
    import { goto } from '$app/navigation';
    import { locale } from '$i18n/i18n-svelte';
    import type { ArticleMetadata } from '$/lib/server/article';
    import { mapTagToColor } from './utils';
    import { constructUrl } from '$/lib/utils/construct-url';
    import { base } from '$app/paths';

    export let filename: string;
    export let metadata: ArticleMetadata;
    $: ({ title, description, banner, bannerAlt, creationDate, tags } = metadata);
</script>

<button
    on:click={() => goto(constructUrl($locale, `/blog/${filename}`), { noScroll: false })}
    class="relative rounded-lg shadow-[0_0_15px_0px_rgba(0,0,0,0.25)] duration-150 flex flex-col items-start overflow-hidden {$$restProps.class ?? ''}
           hover:scale-105 hover:shadow-[0_0_25px_0px_rgba(0,0,0,0.25)]
           dark:bg-zinc-700"
>
    <div style="background-image: url('{base}{banner}');" class="relative w-full h-[200px] bg-center bg-cover flex justify-center items-center overflow-hidden"></div>
    <div class="relative w-full flex flex-col items-start gap-[10px] p-10">
        <div class="relative w-full flex flex-wrap gap-2">
            {#each tags as tag}
                {@const colors = mapTagToColor(tag)}
                <span class="relative px-3 py-1 {colors} rounded-full">#{tag}</span>
            {/each}
        </div>
        <h2 class="relative w-full text-start text-xl">{title}</h2>
        <time class="text-gray-500 dark:text-gray-400 text-sm">{creationDate.toLocaleDateString("fr-CH")}</time>
        <p class="text-justify text-gray-500 dark:text-gray-400 line-clamp-3">{description}</p>
    </div>
</button>
