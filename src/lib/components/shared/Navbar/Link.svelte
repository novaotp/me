<script lang="ts">
    import { type Snippet } from "svelte";

    import { page } from "$app/stores";
    import { stripTrailingSlash } from "$lib/utils/strip-trailing-slash";

    interface Props {
        children?: Snippet;
        href: string;
        onclick: () => void;
    }

    let { children, href, onclick }: Props = $props();

    let colors = $derived.by(() => {
        return $page.url.pathname === stripTrailingSlash(href)
            ? "text-indigo-700 dark:text-sky-300"
            : "text-gray-500 dark:text-gray-400";
    });

    let link = $derived.by(() => {
        const newHref = href.startsWith("/") ? href.slice(1) : href;
        return `/${newHref}`;
    });
</script>

<!--
@component

Renders a link represented as an icon for the navbar.

If the current path is the same as the href, the css will highlight it.
-->

<a
    href={link}
    {onclick}
    class="relative w-full py-2 flex gap-10 justify-start items-center rounded-md {colors} sm:px-5"
>
    {@render children?.()}
</a>
