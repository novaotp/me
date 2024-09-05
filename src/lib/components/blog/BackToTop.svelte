<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import IconArrowNarrowUp from '@tabler/icons-svelte/icons/arrow-narrow-up';

    let minY = $state(150);
    let isShown = $state(false);

    const goTop = () => {
        document.body.scrollIntoView();
    }

    const handleOnScroll = () => {
        if (!document.documentElement) {
            return;
        }

        isShown = document.documentElement.scrollTop > minY;
    }

    onMount(() => {
        handleOnScroll();
    });
</script>

<svelte:window onscroll={handleOnScroll} />

{#if isShown}
    <button
        onclick={goTop}
        transition:fade
        class="fixed bottom-5 right-5 bg-blue-700 dark:bg-sky-300 p-5 rounded-full text-white dark:text-zinc-800 shadow-lg z-10"
    >
        <IconArrowNarrowUp class="pointer-events-none" />
    </button>
{/if}
