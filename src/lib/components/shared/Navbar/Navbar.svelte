<script lang="ts">
    import { page } from '$app/stores';
    import IconMenu from '@tabler/icons-svelte/icons/menu';

    interface Props {
        show: boolean;
    }

    let { show = $bindable() }: Props = $props();

    const showMenu = () => {
        show = true;
        document.body.style.overflow = 'hidden';
    };

    function colors(href: string) {
        return $page.url.pathname === `/${href}`
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
    <a href="/" class="relative h-5">
        <img src="/logos/logo_only_name.png" alt="Sajidur Rahman's Logo" class="relative h-5" />
    </a>
</nav>

<nav class="lg:flex hidden w-full h-20 px-10 py-5 justify-between items-center">
    <a href="/" class="relative h-10">
        <img src="/logos/logo_one_line.png" alt="Sajidur Rahman's Logo" class="relative h-10" />
    </a>
    <div class="flex items-center gap-12">
        <a href="/work" class="py-1 duration-150 hover:text-indigo-700 dark:hover:text-sky-300 {colors('work')}">
            Works
        </a>
    </div>
</nav>
