<script lang="ts">
    export let type: 'text' | 'email' = 'text';
    export let value: string;
    export let placeholder: string;
</script>

<input
    {type}
    {value}
    on:change={event => (value = event.currentTarget.value)}
    {placeholder}
    class="relative w-full h-[50px] rounded bg-gray-100 dark:bg-zinc-700 px-5 text-[14px] resize-none"
/>
