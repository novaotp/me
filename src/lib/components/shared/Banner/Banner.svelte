<script lang="ts">
    import SuccessIcon from '@tabler/icons-svelte/IconCheck.svelte';
    import ErrorIcon from '@tabler/icons-svelte/IconExclamationMark.svelte';
    import InfoIcon from '@tabler/icons-svelte/IconInfoCircle.svelte';
    import CloseIcon from '@tabler/icons-svelte/IconX.svelte';

    export let type: 'success' | 'error' | 'info';
    let show = true;

    $: icon = type === 'success' ? SuccessIcon : type === 'error' ? ErrorIcon : InfoIcon;
    $: bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
</script>

{#if show}
    <aside role="banner" class="relative w-full flex justify-center items-center gap-4 px-4 py-2 {bgColor}">
        <div class="relative w-full max-w-[1200px] h-full flex justify-center items-center gap-4 px-4 py-2 text-neutral-50">
            <svelte:component this={icon} class="min-h-6 min-w-6" />
            <p class="text-sm flex-grow">
                <slot />
            </p>
            <button class="border-none bg-transparent text-neutral-50" on:click={() => (show = false)}>
                <CloseIcon class="size-6" />
            </button>
        </div>
    </aside>
{/if}
