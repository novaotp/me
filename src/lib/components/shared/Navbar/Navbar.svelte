<script lang="ts">
    import { page } from '$app/stores';
    import { base } from '$app/paths';
    import IconArrowRight from '@tabler/icons-svelte/icons/arrow-right';
    import IconMenu from '@tabler/icons-svelte/icons/menu';
    import IconHeartHandshake from '@tabler/icons-svelte/icons/heart-handshake';
    import LL, { locale } from '$i18n/i18n-svelte';
    import { stripTrailingSlash } from '$lib/utils/strip-trailing-slash';
    import type { Page } from '@sveltejs/kit';
    import { goto } from '$app/navigation';

    interface Props {
        show: boolean;
    }

    let { show = $bindable() }: Props = $props();

    $effect(() => {
        $page.url.pathname;
    });

    const showMenu = () => {
        show = true;
        document.body.style.overflow = 'hidden';
    };

    function colors(href: string, page: Page<Record<string, string>, string | null>) {
        return page.url.pathname === stripTrailingSlash(`${base}/${$locale}${href}`)
            ? 'text-indigo-700 dark:text-sky-300'
            : 'text-gray-500 dark:text-gray-400';
    }
</script>

<!--
@component

Renders a navbar adapted for devices under 1024px wide.
-->

<nav class="lg:hidden relative w-full h-20 px-10 py-5 flex justify-between items-center">
    <button onclick={showMenu} aria-label="Open the menu">
        <span role="img">
            <IconMenu class="size-6" />
        </span>
    </button>
    <a href="/{$locale}" class="relative h-5">
        <img src="/logos/logo_only_name.png" alt="Sajidur Rahman's Logo" class="relative h-5" />
    </a>
</nav>

<nav class="lg:flex hidden w-full h-20 px-10 py-5 justify-between items-center">
    <a href="/{$locale}" class="relative h-10">
        <img src="/logos/logo_one_line.png" alt="Sajidur Rahman's Logo" class="relative h-10" />
    </a>
    <div class="flex items-center gap-12">
        <a
            href="/{$locale}/work"
            class="py-1 duration-150 hover:text-indigo-700 dark:hover:text-sky-300 {colors('/work', $page)}"
        >
            {$LL.navigation.workPage()}
        </a>
        <a
            href="/{$locale}/blog"
            class="py-1 duration-150 hover:text-indigo-700 dark:hover:text-sky-300 {colors('/blog', $page)}"
        >
            {$LL.navigation.blogPage()}
        </a>
        <button
            onclick={() => goto(`/${$locale}/contact`)}
            class="bg-indigo-700 dark:bg-sky-300 py-2 px-6 rounded text-white dark:text-zinc-800 flex gap-3 items-center"
        >
            <IconHeartHandshake />
            {$LL.navigation.contact.letsWorkTogether()}
            <IconArrowRight />
        </button>
    </div>
</nav>
