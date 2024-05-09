<script lang="ts">
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { locale } from '$i18n/i18n-svelte';
    import type { MarkdownAttributes } from '$lib/server/markdown';

    export let filename: string;
    export let attributes: MarkdownAttributes;
    $: ({ title, description, banner, bannerAlt, shortTitle, creationDate } = attributes);
</script>

<button
    on:click={() => goto(`${base}/${$locale}/blog/${filename}`, { noScroll: false })}
    class="relative rounded-lg shadow-[0_0_15px_0px_rgba(0,0,0,0.25)] duration-150 flex flex-col items-start overflow-hidden {$$restProps.class ?? ''}
           hover:scale-105 hover:shadow-[0_0_25px_0px_rgba(0,0,0,0.25)]
           dark:bg-zinc-700"
>
    <div class="relative w-full h-[200px] flex justify-center items-center overflow-hidden">
        <img src="{banner}" alt="{bannerAlt}" class="w-full bg-center bg-cover bg-no-repeat" />
    </div>
    <div class="relative w-full flex flex-col items-start gap-[10px] p-10">
        <h1 class="relative w-full text-start text-xl">{shortTitle ?? title}</h1>
        <time class="text-gray-500 dark:text-gray-400 text-sm">{creationDate.toLocaleDateString("fr-CH")}</time>
        <p class="text-justify text-gray-500 dark:text-gray-400 line-clamp-3">{description}</p>
    </div>
</button>
