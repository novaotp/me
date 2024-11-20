<script lang="ts">
    import CloseIcon from '@tabler/icons-svelte/icons/x';
    import { BG_COLOR_MAP, ICONS_MAP } from './defaults';
    import type { Snippet } from 'svelte';

    interface Props {
        children?: Snippet;
        type: 'success' | 'error' | 'info';
    }

    let { children, type }: Props = $props();

    let show = $state(true);

    let Icon = $derived(ICONS_MAP[type]);
    let bgColor = $derived(BG_COLOR_MAP[type]);
</script>

{#if show}
    <aside role="banner" class="relative w-full flex justify-center items-center gap-4 px-4 py-2 {bgColor}">
        <div
            class="relative w-full max-w-[1200px] h-full flex justify-center items-center gap-4 px-4 py-2 text-neutral-50"
        >
            <Icon class="min-h-6 min-w-6" />
            <p class="text-sm flex-grow">
                {@render children?.()}
            </p>
            <button class="border-none bg-transparent text-neutral-50" onclick={() => (show = false)}>
                <CloseIcon class="size-6" />
            </button>
        </div>
    </aside>
{/if}
