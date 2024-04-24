<script lang="ts">
    import { base } from "$app/paths";
    import { locale } from "$i18n/i18n-svelte";
    import type { MarkdownAttributes } from "$lib/server/markdown";

    export let filename: string;
    export let attributes: MarkdownAttributes;
    $: ({ title, description, creationDate } = attributes);
</script>

<a href="{base}/{$locale}/blog/{filename}" class="border border-black rounded-lg shadow-lg p-10 flex flex-col gap-5">
    <h1 class="text-xl">{title}</h1>
    <time>{creationDate.toLocaleDateString($locale)}</time>
    <p class="text-gray-500">{description}</p>
</a>
