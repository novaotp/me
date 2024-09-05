<script lang="ts">
    interface Props {
        placeholder: string;
        type?: 'text' | 'email';
        value: string;
    }

    let { placeholder, type = 'text', value = $bindable() }: Props = $props();
</script>

<input
    {type}
    {value}
    {placeholder}
    onchange={(event) => (value = event.currentTarget.value)}
    class="relative w-full h-[50px] rounded bg-gray-100 dark:bg-zinc-700 px-5 text-[14px] resize-none"
/>
