<script lang="ts">
    import { goto, invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { browser } from '$app/environment';
    import LL, { locale, setLocale } from '$i18n/i18n-svelte';
    import { locales } from '$i18n/i18n-util';
    import { loadLocaleAsync } from '$i18n/i18n-util.async';
    import { clickOutside } from '$lib/utils/click-outside';
    import { replaceLocaleInUrl } from '$lib/utils/locale';
    import type { Locales } from '$i18n/i18n-types';

    let showList = $state(false);
    let currentLanguageNode: HTMLButtonElement | undefined = $state<HTMLButtonElement>();

    function isLocale(locale: string): locale is Locales {
        return locales.includes(locale as Locales);
    }

    const switchLocale = async (newLocale: string | Locales, updateHistoryState = true) => {
        if (!newLocale || $locale === newLocale) return;
        if (!isLocale(newLocale)) return;

        await loadLocaleAsync(newLocale);
        setLocale(newLocale);

        if (updateHistoryState) {
            history.pushState({ locale: newLocale }, '', replaceLocaleInUrl($page.url, newLocale));
        }

        await invalidateAll();
    };

    $effect(() => {
        // update `lang` attribute
        browser && document.querySelector('html')!.setAttribute('lang', $locale);
    });

    $effect(() => {
        if (browser) {
            const lang = $page.params.lang as Locales;
            switchLocale(lang, false);
            history.replaceState({ ...history.state, locale: lang }, '', replaceLocaleInUrl($page.url, lang));
        }
    });

    function changeLang(newLocale: string) {
        showList = false;
        goto(replaceLocaleInUrl($page.url, newLocale), { noScroll: true });
    }
</script>

<div class="relative">
    <button
        bind:this={currentLanguageNode}
        onclick={() => (showList = !showList)}
        class="bg-gray-700 px-4 py-2 rounded {showList ? 'rounded-b-none' : ''}"
    >
        {$locale === 'fr' ? $LL.languages.french() : $LL.languages.english()}
    </button>
    {#if showList}
        <div
            onemit={() => (showList = false)}
            use:clickOutside={{ avoid: [currentLanguageNode] }}
            class="absolute w-full top-full left-0 flex flex-col z-20"
        >
            {#if $locale === 'en'}
                <button
                    onclick={() => changeLang('fr')}
                    class="relative w-full bg-gray-700 px-4 py-2 rounded {showList ? 'rounded-t-none' : ''}"
                >
                    {$LL.languages.french()}
                </button>
            {:else}
                <button
                    onclick={() => changeLang('en')}
                    class="relative w-full bg-gray-700 px-4 py-2 rounded {showList ? 'rounded-t-none' : ''}"
                >
                    {$LL.languages.english()}
                </button>
            {/if}
        </div>
    {/if}
</div>
