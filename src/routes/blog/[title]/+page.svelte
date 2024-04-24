<script lang="ts">
    import type { PageServerData } from "./$types";

    export let data: PageServerData;
</script>

<svelte:head>
    <title>{data.blog.attributes.title} - Sajidur Rahman</title>
    <meta name="description" content="{data.blog.attributes.description}" />
</svelte:head>
  
<div class="">
    <article>
        <h1 class="section-header">{data.blog.attributes.title}</h1>
        {@html data.blog.html}
    </article>
</div>

<style lang="postcss">
    :global(article h2) {
        font-size: 24px;
    }
</style>
