<script lang="ts">
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { locale } from '$i18n/i18n-svelte';
    import type { MarkdownAttributes } from '$lib/server/markdown';

    export let filename: string;
    export let attributes: MarkdownAttributes;
    $: ({ title, description, creationDate } = attributes);
</script>

<button
    on:click={() => goto(`${base}/${$locale}/blog/${filename}`, { noScroll: false })}
    class="relative border border-black rounded-lg shadow-lg p-10 flex flex-col gap-5 items-start {$$restProps.class ?? ''}"
>
    <h1 class="relative w-full text-start text-xl">{title}</h1>
    <time>{creationDate.toLocaleDateString($locale)}</time>
    <p class="text-justify text-gray-500">{description}</p>
</button>
