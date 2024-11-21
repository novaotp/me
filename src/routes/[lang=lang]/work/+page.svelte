<script lang="ts">
    import { goto } from '$app/navigation';
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconArrowRight from '@tabler/icons-svelte/icons/arrow-right';
    import IconHeartHandshake from '@tabler/icons-svelte/icons/heart-handshake';

    let { data } = $props();
</script>

<svelte:head>
    <title>{$LL.workPage.meta.title()}</title>
    <meta name="description" content={$LL.workPage.meta.description()} />
</svelte:head>

<div class="relative w-full max-w-[760px] h-full flex px-10 justify-center items-center flex-col gap-10">
    {#each data.works as work}
        <a href="/{$locale}/work/{work.filename}">{work.metadata.title}</a>
    {/each}
</div>
