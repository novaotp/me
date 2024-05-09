<script lang="ts">
    import IconHome from '@tabler/icons-svelte/IconHome.svelte';
    import IconBuildingEstate from '@tabler/icons-svelte/IconBuildingEstate.svelte';
    import IconNews from '@tabler/icons-svelte/IconNews.svelte';
    import IconArrowNarrowRight from '@tabler/icons-svelte/IconArrowNarrowRight.svelte';
    import IconHeartHandshake from '@tabler/icons-svelte/IconHeartHandshake.svelte';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    import { fly, fade } from 'svelte/transition';
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
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
    <div role="dialog" class="lg:hidden fixed w-full h-full bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(0,0,0,0.2)] z-50" transition:fade on:click|self={closeMenu}>
        <aside
            transition:fly={{ y: -100 }}
            class="lg:hidden relative w-full px-10 pb-10 flex flex-col justify-center items-center z-50 shadow-2xl bg-white dark:bg-zinc-700"
        >
            <nav class="lg:hidden relative w-full h-20 py-5 flex justify-start">
                <button on:click={closeMenu} aria-label="Close the menu">
                    <span role="img">
                        <IconX size={32} />
                    </span>
                </button>
            </nav>
            <article class="relative w-full flex-grow flex flex-col justify-center items-center list-none gap-5">
                <Link href="/" on:click={closeMenu}>
                    <IconHome />
                    {$LL.navigation.homePage()}
                </Link>
                <Link href="/work" on:click={closeMenu}>
                    <IconBuildingEstate />
                    {$LL.navigation.workPage()}
                </Link>
                <Link href="/blog" on:click={closeMenu}>
                    <IconNews />
                    {$LL.navigation.blogPage()}
                </Link>
                <a
                    href="{base}/{$locale}/contact"
                    aria-label="Go to the contact page"
                    class="relative w-full py-3 px-10 flex gap-[6px] xsm:flex-row justify-center items-center
                         bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800 rounded"
                    on:click={closeMenu}
                >
                    <IconHeartHandshake />
                    <span>{$LL.navigation.contact.letsWorkTogether()}</span>
                    <IconArrowNarrowRight />
                </a>
            </article>
        </aside>
    </div>
{/if}
