<script lang="ts">
    import ToastContainer from '$lib/components/shared/Toast/ToastContainer.svelte';
    import Navbar from '$lib/components/shared/Navbar/Navbar.svelte';
    import NavPage from '$lib/components/shared/Navbar/NavPage.svelte';
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconCopyright from '@tabler/icons-svelte/IconCopyright.svelte';
    import { constructUrl } from '$lib/utils/construct-url';
    import LanguageSelect from './LanguageSelect.svelte';
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;

    let show: boolean = false;
</script>

<NavPage bind:show />
<Navbar bind:show />
<ToastContainer />
<main class="relative w-full min-h-[calc(100%-7.5rem)] flex-grow px-10 lg:px-[120px] flex justify-center items-center flex-col">
    <slot />
</main>
<footer class="relative flex flex-col justify-center items-center p-10 gap-10 mt-10 bg-gray-900 text-white">
    <div class="w-full xsm:w-auto md:flex-row flex flex-col items-start xsm:items-center md:items-start gap-10 md:gap-20">
        <div class="flex flex-col xsm:flex-row gap-10 xsm:gap-20 justify-between">
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
                    <a href={constructUrl($locale, 'blog/')}>{attributes.title}</a>
                {/each}
            </div>
        </div>
        <div class="relative w-full md:w-auto md:flex-col flex justify-between items-start gap-5">
            <h3 class="font-semibold text-xl">{$LL.footer.language.title()}</h3>
            <LanguageSelect />
        </div>
    </div>
    <span class="w-full flex justify-center items-center gap-5 mt-5"><IconCopyright /> {new Date().getFullYear()} - Sajidur Rahman</span>
</footer>
