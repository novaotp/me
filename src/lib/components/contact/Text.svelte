<script lang="ts">
    interface Props {
        placeholder: string;
        value: string;
    }

    let { placeholder, value = $bindable() }: Props = $props();
</script>

<textarea bind:value {placeholder} class="relative w-full h-[150px] xsm:h-[200px] rounded bg-gray-100 dark:bg-zinc-700 p-5 text-[14px] resize-none"
></textarea>
