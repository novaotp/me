<script lang="ts">
    import LL from '$i18n/i18n-svelte';
    import Card from './Card.svelte';
</script>

<div class="relative w-full h-full grid grid-cols-1 lg:grid-cols-2 justify-center items-center flex-col gap-10">
    <h2 class="text-center text-3xl">{$LL.homePage.services.title()}</h2>
    <div class="flex flex-col gap-10">
        <Card title={$LL.homePage.services.benefits.title()}>{$LL.homePage.services.benefits.description()}</Card>
        <Card title={$LL.homePage.services.performance.title()}>{$LL.homePage.services.performance.description()}</Card>
        <Card title={$LL.homePage.services.collaboration.title()}>{$LL.homePage.services.collaboration.description()}</Card>
    </div>
</div>
