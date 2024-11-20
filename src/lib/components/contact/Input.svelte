<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements';

    interface Props extends HTMLInputAttributes {}

    let { placeholder, type = 'text', value = $bindable(), ...restProps }: Props = $props();
</script>

<input
    bind:value
    {type}
    {placeholder}
    class="relative w-full h-[50px] rounded bg-gray-100 dark:bg-zinc-700 px-5 text-[14px] resize-none"
    {...restProps}
/>
