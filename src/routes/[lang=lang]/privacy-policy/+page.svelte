<script lang="ts">
    import LL, { locale } from '$/i18n/i18n-svelte';
    import Banner from '$/lib/components/shared/Banner/Banner.svelte';
    import type { PageServerData } from './$types';

    export let data: PageServerData;
</script>

<svelte:head>
    <title>{$LL.privacyPolicyPage.meta.title()}</title>
    <meta name="description" content="{$LL.privacyPolicyPage.meta.description()}" />
</svelte:head>

<Banner type="info">
    <span>{$LL.privacyPolicyPage.banner.title()}</span>
    :
    <span>{$LL.privacyPolicyPage.banner.content()}</span>
    <a href="mailto:contact@sajidur.dev" class="underline">contact@sajidur.dev</a>.
</Banner>
<div class="relative mt-10 w-full flex justify-center items-start gap-40">
    <aside class="sticky h-[calc(100%-7.5rem)] max-w-[400px] left-0 top-0 pt-20 flex flex-col gap-5 pb-5">
        <span>{$LL.privacyPolicyPage.onThisPage()}</span>
        <ul class="flex flex-col gap-2">
            {#each data.summary as { heading, slug }}
                <li>
                    <a
                        href="#{slug}"
                        class="text-gray-500 dark:text-gray-400 hover:text-indigo-700 dark:hover:text-sky-300"
                    >
                        {heading}
                    </a>
                </li>
            {/each}
        </ul>
    </aside>
    <article id="privacy-policy" class="relative mt-10 w-full max-w-[680px] flex flex-col items-start">
        {@html data.html}
    </article>
</div>

<style lang="postcss">
    :global(article#privacy-policy h1) {
        @apply text-3xl font-semibold py-5;
    }

    :global(article#privacy-policy h2) {
        @apply text-2xl font-semibold py-5;
    }

    :global(article#privacy-policy h3) {
        @apply text-xl font-semibold py-5;
    }

    :global(article#privacy-policy h4) {
        @apply text-lg font-semibold pb-5;
    }

    :global(article#privacy-policy ul) {
        @apply list-disc ml-10 my-5;
    }

    :global(article#privacy-policy ul li) {
        @apply mb-2;
    }

    :global(article#privacy-policy ol) {
        @apply list-decimal ml-10 mb-5;
    }

    :global(article#privacy-policy a) {
        @apply text-indigo-700 dark:text-sky-300 font-semibold;
    }

    :global(article#privacy-policy p) {
        @apply mb-5;
    }

    :global(article#privacy-policy h2 > p) {
        @apply mb-0;
    }

    :global(article#privacy-policy figure) {
        @apply relative w-full rounded text-white overflow-auto mb-5 bg-[#282c34];
    }
</style>
