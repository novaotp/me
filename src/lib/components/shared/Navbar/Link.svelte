<script lang="ts">
    import { stripTrailingSlash } from '$/lib/utils/strip-trailing-slash';
    import { base } from '$app/paths';
    import { page } from '$app/stores';
    import { locale } from '$i18n/i18n-svelte';
    import { createEventDispatcher } from 'svelte';

    export let href: string;

    const dispatch = createEventDispatcher();

    $: colors =
        $page.url.pathname === stripTrailingSlash(`${base}/${$locale}${href}`)
            ? 'text-indigo-700 dark:text-sky-300'
            : 'text-gray-500 dark:text-gray-400';
</script>

<!--
@component

Renders a link represented as an icon for the navbar.

If the current path is the same as the href, the css will highlight it.
-->

<li class="relative w-full">
    <a
        href="{base}/{$locale}{href}"
        on:click={() => dispatch('click')}
        class="relative w-full py-2 flex gap-10 justify-start items-center rounded-md {colors} sm:px-5"
    >
        <slot />
    </a>
</li>
