<script lang="ts">
    import IconPointFilled from '@tabler/icons-svelte/IconPointFilled.svelte';
    import IconArrowNarrowRight from '@tabler/icons-svelte/IconArrowNarrowRight.svelte';
    import Card from './Card.svelte';
    import { base } from '$app/paths';
    import LL, { locale } from '$i18n/i18n-svelte';
</script>

<svelte:head>
    <title>Home - Sajidur Rahman</title>
</svelte:head>

<div class="relative w-full max-w-[900px] flex flex-col items-center gap-32 my-10">
    <div class="relative w-full h-full flex justify-center items-start flex-col gap-14">
        <p>{$LL.homePage.greet()}</p>
        <h1 class="text-justify text-3xl max-w-[1400px] 2xl:text-5xl">{$LL.homePage.briefDescription()}</h1>
        <ul class="relative flex flex-wrap">
            <li>{$LL.homePage.keywords.design()}</li>
            <li><IconPointFilled /></li>
            <li>{$LL.homePage.keywords.development()}</li>
            <li><IconPointFilled /></li>
            <li>{$LL.homePage.keywords.maintenance()}</li>
        </ul>
        <a
            href="{base}/{$locale}/contact"
            aria-label="Go to the contact page"
            class="relative py-3 px-10 flex gap-[6px] flex-col xsm:flex-row justify-center items-center bg-indigo-700 text-white rounded"
        >
            <span>{$LL.homePage.contact.idea()}</span>
            <div class="flex gap-2">
                <span>{$LL.homePage.contact.letsTalk()}</span>
                <IconArrowNarrowRight />
            </div>
        </a>
    </div>
    <div class="relative w-full h-full flex flex-col justify-center items-center gap-16">
        <h2 class="w-full text-start text-3xl">{$LL.homePage.services.title()}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <Card title={$LL.homePage.services.benefits.title()}>{$LL.homePage.services.benefits.description()}</Card>
            <Card title={$LL.homePage.services.performance.title()}>{$LL.homePage.services.performance.description()}</Card>
            <Card title={$LL.homePage.services.collaboration.title()}>{$LL.homePage.services.collaboration.description()}</Card>
            <Card title={$LL.homePage.services.accessibility.title()}>{$LL.homePage.services.accessibility.description()}</Card>
        </div>
    </div>
    <div class="relative w-full h-full flex justify-center items-start flex-col gap-10">
        <h2 class="text-center text-3xl">{$LL.homePage.aboutMe.title()}</h2>
        <div class="text-justify flex flex-col gap-5">
            <p>{$LL.homePage.aboutMe.studies()}</p>
            <p>{$LL.homePage.aboutMe.hobbies()}</p>
            <p>{$LL.homePage.aboutMe.availability()}</p>
        </div>
    </div>
</div>
