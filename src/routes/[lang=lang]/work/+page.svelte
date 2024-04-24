<script lang="ts">
    import LL from '$i18n/i18n-svelte';
</script>

<svelte:head>
    <title>{$LL.workPage.meta.title()}</title>
</svelte:head>

<div class="relative w-full h-full flex justify-center items-center flex-col gap-10">
    <h1 class="text-center font-medium text-3xl">{$LL.workPage.title()}</h1>
    <p class="text-xl text-justify">{$LL.workPage.notYet()}</p>
</div>
