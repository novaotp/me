<script lang="ts">
    export let value: string;
    export let placeholder: string;
</script>

<textarea
    bind:value
    {placeholder}
    class="relative w-full h-[150px] xsm:h-[200px] rounded bg-gray-100 dark:bg-zinc-700 p-5 text-[14px] resize-none"
></textarea>
