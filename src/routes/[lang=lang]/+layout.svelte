<script lang="ts">
    import ToastContainer from '$lib/components/shared/Toast/ToastContainer.svelte';
    import Navbar from '$lib/components/shared/Navbar/Navbar.svelte';
    import NavPage from '$lib/components/shared/Navbar/NavPage.svelte';
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconCopyright from '@tabler/icons-svelte/IconCopyright.svelte';
    import { constructUrl } from '$lib/utils/construct-url';
    import LanguageSelect from './LanguageSelect.svelte';
    import type { LayoutServerData } from './$types';
    import ThemeSwitch from './ThemeSwitch.svelte';

    export let data: LayoutServerData;

    let show: boolean = false;
</script>

<svelte:head>
    <meta name="keywords" content="web development, web design, portfolio, freelancer, developer, UI/UX design, creative solutions, client-focused development">
</svelte:head>

<NavPage bind:show />
<Navbar bind:show />
<ToastContainer />
<main class="relative w-full min-h-[calc(100%-7.5rem)] flex-grow px-10 lg:px-[120px] flex justify-center items-center flex-col">
    <slot />
</main>
<footer class="relative flex flex-col justify-center items-center p-10 gap-10 mt-10 bg-gray-900 dark:bg-zinc-900 text-white">
    <div class="w-full sm:w-auto md:flex-row flex flex-col items-start sm:items-center md:items-start gap-10 md:gap-20">
        <div class="w-full flex flex-col sm:flex-row gap-10 sm:gap-20 justify-between">
            <div class="flex flex-col gap-5">
                <h3 class="font-semibold text-xl">{$LL.footer.quickLinks()}</h3>
                <a href={constructUrl($locale, '')}>{$LL.navigation.homePage()}</a>
                <a href={constructUrl($locale, 'work')}>{$LL.navigation.workPage()}</a>
                <a href={constructUrl($locale, 'blog')}>{$LL.navigation.blogPage()}</a>
                <a href={constructUrl($locale, 'contact')}>{$LL.navigation.contact.page()}</a>
            </div>
            <div class="flex flex-col gap-5">
                <h3 class="font-semibold text-xl">{$LL.footer.latestArticles()}</h3>
                {#each data.latest as { filename, attributes } (filename)}
                    <a href={constructUrl($locale, `blog/${filename}`)}>
                        {attributes.shortTitle ? attributes.shortTitle : attributes.title}
                    </a>
                {/each}
            </div>
        </div>
        <div class="relative w-full md:w-auto flex flex-col sm:flex-row md:flex-col justify-between gap-5">
            <div class="relative w-full sm:w-auto md:flex-col flex justify-between items-center md:items-start gap-5">
                <h3 class="font-semibold text-xl">{$LL.footer.language.title()}</h3>
                <LanguageSelect />
            </div>
            <div class="relative w-full sm:w-auto md:flex-col flex justify-between items-center md:items-start gap-5">
                <h3 class="font-semibold text-xl">{$LL.footer.themes.title()}</h3>
                <ThemeSwitch />
            </div>
        </div>
    </div>
    <span class="w-full flex justify-center items-center gap-5 mt-5"><IconCopyright /> {new Date().getFullYear()} - Sajidur Rahman</span>
</footer>
