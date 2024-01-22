<script lang="ts">
    import Link from "./Link.svelte";
    import { IconHome as Home, IconArticle as Blog, } from "@tabler/icons-svelte";
</script>

<!--
@component

Renders a navbar adapted for devices under 1024px wide.
-->

<nav class="lg:hidden relative w-full h-20 shadow-[0px_-4px_3px_rgba(50,50,50,0.25)] dark:shadow-[0px_-4px_3px_rgba(10,10,10,0.25)]">
    <ul class="relative w-full h-full py-5 flex justify-evenly items-center">
        <Link href="/" label="Home" />
        <Link href="/work" label="Projects" />
        <Link href="/blog" label="Blog" />
        <Link href="/contact" label="Contact" />
    </ul>
</nav>