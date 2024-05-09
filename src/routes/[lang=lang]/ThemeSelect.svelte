<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import LL, { locale } from '$i18n/i18n-svelte';
    import { theme, switchTheme, type Theme } from '$lib/stores/theme';
    import { clickOutside } from '$lib/utils/click-outside';

    let showThemes = false;
    let currentThemeNode: HTMLButtonElement;

    function _switchTheme(newTheme: Theme) {
        showThemes = false;
        switchTheme(newTheme);
    }
</script>

<div class="relative {$locale === "fr" ? "w-[100px]" : "w-[70px]"} flex justify-end">
    <button
        bind:this={currentThemeNode}
        on:click={() => (showThemes = !showThemes)}
        class="relative w-full bg-gray-700 px-4 py-2 rounded {showThemes ? 'rounded-b-none' : ''}"
    >
        {$theme === "light" ? $LL.footer.themes.options.light() : $LL.footer.themes.options.dark()}
    </button>
    {#if showThemes}
        <div
            on:emit={() => (showThemes = false)}
            use:clickOutside={{ avoid: [currentThemeNode] }}
            class="absolute w-full top-full left-0 flex flex-col z-20"
        >
            {#if $theme === 'light'}
                <button
                    on:click={() => _switchTheme('dark')}
                    class="relative w-full bg-gray-700 px-4 py-2 rounded {showThemes ? 'rounded-t-none' : ''}"
                >
                    {$LL.footer.themes.options.dark()}
                </button>
            {:else}
                <button
                    on:click={() => _switchTheme('light')}
                    class="relative w-full bg-gray-700 px-4 py-2 rounded {showThemes ? 'rounded-t-none' : ''}"
                >
                    {$LL.footer.themes.options.light()}
                </button>
            {/if}
        </div>
    {/if}
</div>
