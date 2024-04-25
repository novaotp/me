<script lang="ts">
    import ToastContainer from '$lib/components/shared/Toast/ToastContainer.svelte';
    import Navbar from '$lib/components/shared/Navbar/Navbar.svelte';
    import NavPage from '$lib/components/shared/Navbar/NavPage.svelte';
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconCopyright from '@tabler/icons-svelte/IconCopyright.svelte';
    import { constructUrl } from '$lib/utils/construct-url';
    import LanguageSelect from './LanguageSelect.svelte';

    let show: boolean = false;
</script>

<NavPage bind:show />
<Navbar bind:show />
<ToastContainer />
<main class="relative w-full min-h-[calc(100%-5rem)] flex-grow px-10 lg:px-[120px] flex justify-center items-center flex-col">
    <slot />
</main>
<footer class="flex flex-col items-start p-10 gap-5 bg-gray-900 text-white">
    <h3 class="font-semibold text-xl">Quick links</h3>
    <a href={constructUrl($locale, '')}>{$LL.navigation.homePage()}</a>
    <a href={constructUrl($locale, 'work')}>{$LL.navigation.workPage()}</a>
    <a href={constructUrl($locale, 'blog')}>{$LL.navigation.blogPage()}</a>
    <a href={constructUrl($locale, 'contact')}>{$LL.navigation.contact.page()}</a>
    <div class="relative w-full flex justify-between items-center">
        <h3 class="font-semibold text-xl">{$LL.footer.language.title()}</h3>
        <LanguageSelect />
    </div>
    <span class="w-full flex justify-center items-center gap-5 mt-5"><IconCopyright /> 2024 - Sajidur Rahman</span>
</footer>
