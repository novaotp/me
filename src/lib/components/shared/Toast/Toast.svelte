<script lang="ts">
    import { fade } from 'svelte/transition';
    import CloseIcon from '@tabler/icons-svelte/icons/x';
    import { BG_COLOR_MAP, ICONS_MAP } from './defaults';
    import type { Snippet } from 'svelte';
    import type { Toast } from '$stores/toast/index.svelte';

    interface Props {
        type: Toast["type"],
        ondismiss: () => void,
        children: Snippet
    }

    let { children, ondismiss, type }: Props = $props();

    let Icon = $derived(ICONS_MAP[type]);
    let bgColor = $derived(BG_COLOR_MAP[type]);
</script>

<article class="relative w-full flex items-center gap-4 rounded px-4 py-2 text-neutral-50 {bgColor}" role="alert" transition:fade>
    <Icon class="min-h-6 min-w-6" />
    <p class="text-sm flex-grow">
        {@render children()}
    </p>
    <button class="border-none bg-transparent text-neutral-50" onclick={ondismiss}>
        <CloseIcon class="size-6" />
    </button>
</article>
