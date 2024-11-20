<script lang="ts">
    import type { HTMLTextareaAttributes } from 'svelte/elements';

    interface Props extends HTMLTextareaAttributes {}

    let { placeholder, value = $bindable(), ...restProps }: Props = $props();
</script>

<textarea
    bind:value
    {placeholder}
    class="relative w-full h-[150px] xsm:h-[200px] rounded bg-gray-100 dark:bg-zinc-700 p-5 text-[14px] resize-none"
    {...restProps}
></textarea>
