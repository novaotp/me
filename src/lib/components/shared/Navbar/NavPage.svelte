<script lang="ts">
    import IconArrowNarrowRight from '@tabler/icons-svelte/IconArrowNarrowRight.svelte';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    import { fly } from 'svelte/transition';
    import Link from './Link.svelte';
    import LL, { locale } from '$i18n/i18n-svelte';
    import { base } from '$app/paths';

    export let show: boolean;

    const closeMenu = () => {
        show = false;
        document.body.style.overflow = 'auto';
    };
</script>

{#if show}
    <aside class="lg:hidden fixed w-full h-full flex flex-col justify-center items-center z-50 bg-[#fffaf4]" transition:fly={{ x: -100 }}>
        <nav class="lg:hidden relative w-full h-20 px-10 py-5 flex justify-start">
            <button on:click={closeMenu} aria-label="Close the menu">
                <span role="img">
                    <IconX size={32} />
                </span>
            </button>
        </nav>
        <article class="relative w-full flex-grow flex flex-col justify-center items-center list-none gap-10">
            <Link label={$LL.navigation.homePage()} href="/" on:click={closeMenu} />
            <Link label={$LL.navigation.workPage()} href="/work" on:click={closeMenu} />
            <Link label={$LL.navigation.blogPage()} href="/blog" on:click={closeMenu} />
            <a
                href="{base}/{$locale}/contact"
                aria-label="Go to the contact page"
                class="relative py-3 px-10 flex gap-[6px] flex-col xsm:flex-row justify-center items-center bg-indigo-700 text-white rounded"
                on:click={closeMenu}
            >
                <span>{$LL.homePage.contact.idea()}</span>
                <div class="flex gap-2">
                    <span>{$LL.homePage.contact.letsTalk()}</span>
                    <IconArrowNarrowRight />
                </div>
            </a>
        </article>
    </aside>
{/if}
