<script lang="ts">
    import "./layout.css";

    import IconBrandGithub from "@tabler/icons-svelte/icons/brand-github";
    import IconBrandLinkedin from "@tabler/icons-svelte/icons/brand-linkedin";
    import IconCopyright from "@tabler/icons-svelte/icons/copyright";
    import { onMount } from "svelte";

    import ThemeSwitch from "$components/shared/footer/ThemeSwitch.svelte";
    import NavPage from "$lib/components/shared/Navbar/NavPage.svelte";
    import Navbar from "$lib/components/shared/Navbar/Navbar.svelte";
    import { initTheme } from "$stores/theme.svelte";

    let { children } = $props();

    let show = $state(false);

    onMount(() => {
        initTheme();
    });
</script>

<svelte:head>
    <meta
        name="keywords"
        content="web development, web design, portfolio, freelancer, developer, UI/UX design, creative solutions, client-focused development"
    />
</svelte:head>

<NavPage bind:show />
<Navbar bind:show />
<div
    class="relative w-full min-h-[calc(100%-7.5rem)] grow flex justify-center items-center flex-col"
>
    {@render children()}
</div>
<footer
    class="relative flex flex-col items-center justify-center p-10 gap-10 mt-10 bg-gray-900 dark:bg-zinc-900 text-white"
>
    <div
        class="w-full sm:w-auto md:flex-row flex flex-col items-start sm:items-center md:items-start gap-10 md:gap-20"
    >
        <div class="w-full flex flex-col sm:flex-row gap-10 sm:gap-20 justify-between">
            <div class="flex flex-col gap-5">
                <h3 class="font-semibold text-xl">Quick Links</h3>
                <a href="/">Home</a>
                <a href="/work">Works</a>
            </div>
        </div>
        <div
            class="relative w-full md:w-auto flex flex-col sm:flex-row md:flex-col justify-between gap-5"
        >
            <div
                class="relative w-full sm:w-auto md:flex-col flex justify-between items-center md:items-start gap-5"
            >
                <h3 class="font-semibold text-xl">Mode</h3>
                <ThemeSwitch />
            </div>
        </div>
    </div>
    <div class="flex gap-10">
        <a href="https://www.github.com/novaotp" target="_blank" aria-label="Go to my Github page">
            <IconBrandGithub class="size-8" />
        </a>
        <a
            href="https://www.linkedin.com/in/sajidur-rahman-b495ba2b9"
            target="_blank"
            aria-label="Go to my LinkedIn page"
        >
            <IconBrandLinkedin class="size-8" />
        </a>
    </div>
    <div class="w-full flex justify-center items-center gap-5">
        <IconCopyright />
        <span>{new Date().getFullYear()} - Sajidur Rahman</span>
    </div>
</footer>
