<script lang="ts">
    import { goto } from '$app/navigation';
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconArrowRight from '@tabler/icons-svelte/icons/arrow-right';
    import IconHeartHandshake from '@tabler/icons-svelte/icons/heart-handshake';
</script>

<svelte:head>
    <title>{$LL.workPage.meta.title()}</title>
    <meta name="description" content={$LL.workPage.meta.description()} />
</svelte:head>

<div class="relative w-full max-w-[760px] h-full flex px-10 justify-center items-center flex-col gap-10">
    <h1 class="text-center font-medium text-3xl">{$LL.workPage.title()}</h1>
    <p class="text-justify">{$LL.workPage.notYet()}</p>
    <button
        onclick={() => goto(`/${$locale}/contact`)}
        class="bg-indigo-700 dark:bg-sky-300 py-2 px-6 w-full xsm:w-auto rounded text-white dark:text-zinc-800 flex gap-3 justify-center items-center"
    >
        <IconHeartHandshake />
        {$LL.navigation.contact.letsWorkTogether()}
        <IconArrowRight />
    </button>
</div>
