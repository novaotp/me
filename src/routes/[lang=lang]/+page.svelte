<script lang="ts">
    import { base } from '$app/paths';
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconPointFilled from '@tabler/icons-svelte/icons/point-filled';
    import IconArrowNarrowRight from '@tabler/icons-svelte/icons/arrow-narrow-right';
    import Services from '$components/home/Services.svelte';
    import * as Accordion from '$components/home/Accordion';
</script>

<svelte:head>
    <title>{$LL.homePage.meta.title()}</title>
    <meta name="description" content={$LL.homePage.meta.description()} />
</svelte:head>

<main class="relative w-full max-w-[980px] flex flex-col items-center px-10 gap-28 my-10">
    <section class="relative w-full h-full flex justify-center items-start flex-col gap-14">
        <p>{$LL.homePage.greet()}</p>
        <h1 class="text-3xl leading-snug max-w-[1400px] md:text-4xl md:leading-normal xl:text-5xl xl:leading-relaxed">
            <!-- Rendering as HTML to highlight parts of the text with CSS. -->
            {@html $LL.homePage.briefDescription()}
        </h1>
        <a
            href="{base}/{$locale}/contact"
            aria-label="Go to the contact page"
            class="relative py-3 px-10 flex gap-[6px] flex-col xsm:flex-row justify-center items-center
                 bg-indigo-700 dark:bg-sky-300 text-white dark:text-zinc-800 rounded"
        >
            <span>{$LL.homePage.contact.idea()}</span>
            <div class="flex gap-2">
                <span>{$LL.homePage.contact.letsTalk()}</span>
                <IconArrowNarrowRight />
            </div>
        </a>
    </section>
    <section class="relative w-full h-full flex flex-col justify-center items-center gap-16">
        <h2 class="w-full text-start text-3xl">{$LL.homePage.services.title()}</h2>
        <Services />
    </section>
    <section class="relative w-full h-full flex justify-center items-start flex-col gap-10">
        <h2 class="text-center text-3xl">{$LL.homePage.faq.title()}</h2>
        <Accordion.Root class="w-full">
            {#each Object.values($LL.homePage.faq.entries) as { question, answer }}
                <Accordion.Item value={question()}>
                    <Accordion.Trigger>{question()}</Accordion.Trigger>
                    <Accordion.Content>{answer()}</Accordion.Content>
                </Accordion.Item>
            {/each}
        </Accordion.Root>
    </section>
</main>
