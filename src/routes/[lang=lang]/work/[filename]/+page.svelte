<script lang="ts">
    let { data } = $props();

    let work = $derived(data.work);
</script>

<svelte:head>
    <title>{work.metadata.title}</title>
    <meta name="description" content={work.metadata.description} />
</svelte:head>

<h1>{work.metadata.title}</h1>
<p>{work.metadata.description}</p>
<article>
    {@html work.html}
</article>
