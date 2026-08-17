<script lang="ts">
    import IconHome from '@tabler/icons-svelte/icons/home';
    import IconBuildingEstate from '@tabler/icons-svelte/icons/building-estate';
    import IconX from '@tabler/icons-svelte/icons/x';
    import { fly, fade } from 'svelte/transition';
    import Link from './Link.svelte';
    import LL from '$i18n/i18n-svelte';

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
        transition:fade
        onclick={closeMenu}
        class="lg:hidden fixed w-full h-full bg-[rgba(0,0,0,0.1)] dark:bg-[rgba(0,0,0,0.2)] z-50"
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
            </article>
        </aside>
    </div>
{/if}
