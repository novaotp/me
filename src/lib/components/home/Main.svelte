<script lang="ts">
    import IconPointFilled from '@tabler/icons-svelte/IconPointFilled.svelte';
    import IconArrowNarrowRight from '@tabler/icons-svelte/IconArrowNarrowRight.svelte';
    import { base } from '$app/paths';
    import LL, { locale } from '$i18n/i18n-svelte';
</script>

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
