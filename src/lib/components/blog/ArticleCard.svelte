<script lang="ts">
    export let title: string;
    export let description: string;
    export let url: string;
</script>

<a href={url} class="border border-black rounded-lg shadow-lg p-10 flex flex-col gap-5">
    <h1 class="text-xl">{title}</h1>
    <p class="text-gray-500">{description}</p>
</a>
