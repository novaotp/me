<script lang="ts">
    import { goto } from '$app/navigation';
    import IconArrowRight from '@tabler/icons-svelte/icons/arrow-right';
</script>

<svelte:head>
    <title>Page not found - Sajidur Rahman</title>
    <meta name="description" content="The page you're looking for doesn't exist..." />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-center items-start gap-10 p-10">
    <h1 class="text-6xl flex">Wrong path...</h1>
    <p>It seems that you got lost...</p>
    <button
        on:click={() => goto('/')}
        class="bg-indigo-700 dark:bg-sky-300 py-2 px-6 rounded text-white dark:text-zinc-800 flex gap-5 items-center"
    >
        Back to home
        <IconArrowRight />
    </button>
</main>
