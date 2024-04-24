<script lang="ts">
    import IconPointFilled from "@tabler/icons-svelte/IconPointFilled.svelte";
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
    <a href="{base}/{$locale}/contact" aria-label="Go to the contact page" class="sm:flex">
        <span class="relative py-3 px-10 flex justify-center items-center bg-indigo-700 text-white rounded-t-lg sm:rounded-tr-none sm:rounded-l-lg">
            {$LL.homePage.contact.idea()}
        </span>
        <span class="relative py-3 px-10 flex justify-center items-center border-2 border-indigo-700 rounded-b-lg sm:rounded-bl-none sm:rounded-r-lg">
            {$LL.homePage.contact.letsTalk()}
        </span>
    </a>
</div>
