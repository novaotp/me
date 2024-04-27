<script lang="ts">
    import IconArrowNarrowUp from "@tabler/icons-svelte/IconArrowNarrowUp.svelte";
    import { fade } from "svelte/transition";

    let showAfterYScroll = 150;
    let hidden = false;

    $: {
        if (scrollContainer() && scrollContainer().scrollTop > showAfterYScroll) {
            hidden = false;
        } else {
            hidden = true;
        }
    }

    function goTop() {
        document.body.scrollIntoView();
    }

    function scrollContainer() {
        return document.documentElement || document.body;
    }

    function handleOnScroll() {
        if (!scrollContainer()) {
            return;
        }

        if (scrollContainer().scrollTop > showAfterYScroll) {
            hidden = false;
        } else {
            hidden = true;
        }
    }
</script>

<svelte:window on:scroll={handleOnScroll} />

{#if !hidden}
    <button class="fixed bottom-5 right-5 bg-blue-700 p-5 rounded-full text-white shadow-lg z-10" on:click|self={goTop} transition:fade>
        <IconArrowNarrowUp class="pointer-events-none" />
    </button>
{/if}
