<script lang="ts">
    export let type: 'text' | 'email' = 'text';
    export let value: string;
    export let placeholder: string;
</script>

{#if type === 'text'}
    <input type="text" bind:value {placeholder} class="relative w-full h-[50px] rounded bg-gray-100 px-5 text-[14px] resize-none" />
{:else}
    <input type="email" bind:value {placeholder} class="relative w-full h-[50px] rounded bg-gray-100 px-5 text-[14px] resize-none" />
{/if}
