<script lang="ts">
    import { goto } from "$app/navigation";
    import { locale } from "$i18n/i18n-svelte";
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
    $: ({ attributes, html } = data.article);
</script>

<svelte:head>
    <title>{attributes.title} - Sajidur Rahman</title>
    <meta name="description" content="{attributes.description}" />
</svelte:head>
  
<div class="">
    <button on:click={() => goto(`/${$locale}/blog`)}>Back</button>
    <article>
        <h1 class="section-header">{attributes.title}</h1>
        {@html html}
    </article>
</div>

<style lang="postcss">
    :global(article h2) {
        font-size: 24px;
    }
</style>
