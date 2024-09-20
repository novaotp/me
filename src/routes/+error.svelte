<script lang="ts">
    import { goto } from '$app/navigation';
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconArrowRight from '@tabler/icons-svelte/icons/arrow-right';
</script>

<svelte:head>
    <title>{$LL.pageNotFound.meta.title()}</title>
    <meta name="description" content={$LL.pageNotFound.meta.description()} />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-center items-start gap-10 p-10">
    <h1 class="text-6xl flex">{$LL.pageNotFound.title()}</h1>
    <p>{$LL.pageNotFound.paragraph()}</p>
    <button
        on:click={() => goto(`/${$locale}`)}
        class="bg-indigo-700 dark:bg-sky-300 py-2 px-6 rounded text-white dark:text-zinc-800 flex gap-5 items-center"
    >
        {$LL.pageNotFound.backToHome()}
        <IconArrowRight />
    </button>
</main>
