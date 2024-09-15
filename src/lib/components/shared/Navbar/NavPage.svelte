<script lang="ts">
    import IconHome from '@tabler/icons-svelte/icons/home';
    import IconBuildingEstate from '@tabler/icons-svelte/icons/building-estate';
    import IconNews from '@tabler/icons-svelte/icons/news';
    import IconArrowNarrowRight from '@tabler/icons-svelte/icons/arrow-narrow-right';
    import IconHeartHandshake from '@tabler/icons-svelte/icons/heart-handshake';
    import IconX from '@tabler/icons-svelte/icons/x';
    import { fly, fade } from 'svelte/transition';
    import Link from './Link.svelte';
    import LL, { locale } from '$i18n/i18n-svelte';
    import { base } from '$app/paths';
    import { goto } from '$app/navigation';

    interface Props {
        show: boolean;
    }

    let { show = $bindable() }: Props = $props();

    const closeMenu = () => {
        show = false;
        document.body.style.overflow = 'auto';
    };
</script>

{#if show}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div
        role="dialog"
        class="lg:hidden fixed w-full h-full bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(0,0,0,0.2)] z-50"
        transition:fade
        onclick={closeMenu}
    >
        <aside
            transition:fly={{ y: -100 }}
            class="lg:hidden relative w-full px-10 pb-10 flex flex-col justify-center items-center z-50 shadow-2xl bg-white dark:bg-zinc-700"
        >
            <nav class="lg:hidden relative w-full h-20 py-5 flex justify-start">
                <button onclick={closeMenu} aria-label="Close the menu">
                    <span role="img">
                        <IconX class="size-6" />
                    </span>
                </button>
            </nav>
            <article class="relative w-full flex-grow flex flex-col justify-center items-center list-none gap-5">
                <Link href="/" onclick={closeMenu}>
                    <IconHome />
                    {$LL.navigation.homePage()}
                </Link>
                <Link href="/work" onclick={closeMenu}>
                    <IconBuildingEstate />
                    {$LL.navigation.workPage()}
                </Link>
                <Link href="/blog" onclick={closeMenu}>
                    <IconNews />
                    {$LL.navigation.blogPage()}
                </Link>
                <button
                    onclick={() => {
                        closeMenu();
                        goto(`${base}/${$locale}/contact`);
                    }}
                    aria-label="Go to the contact page"
                    class="relative w-full py-3 px-10 flex gap-[6px] xsm:flex-row justify-center items-center
                         bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800 rounded"
                >
                    <IconHeartHandshake />
                    <span>{$LL.navigation.contact.letsWorkTogether()}</span>
                    <IconArrowNarrowRight />
                </button>
            </article>
        </aside>
    </div>
{/if}
