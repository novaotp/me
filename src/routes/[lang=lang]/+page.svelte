<script lang="ts">
    import IconPointFilled from '@tabler/icons-svelte/icons/point-filled';
    import IconArrowNarrowRight from '@tabler/icons-svelte/icons/arrow-narrow-right';
    import IconBolt from '@tabler/icons-svelte/icons/bolt';
    import IconAccessible from '@tabler/icons-svelte/icons/accessible';
    import IconMessages from '@tabler/icons-svelte/icons/messages';
    import IconPerspective from '@tabler/icons-svelte/icons/perspective';
    import { base } from '$app/paths';
    import LL, { locale } from '$i18n/i18n-svelte';

    const services = [
        {
            Icon: IconPerspective,
            title: $LL.homePage.services.benefits.title(),
            description: $LL.homePage.services.benefits.description()
        },
        {
            Icon: IconBolt,
            title: $LL.homePage.services.performance.title(),
            description: $LL.homePage.services.performance.description()
        },
        {
            Icon: IconMessages,
            title: $LL.homePage.services.collaboration.title(),
            description: $LL.homePage.services.collaboration.description()
        },
        {
            Icon: IconAccessible,
            title: $LL.homePage.services.accessibility.title(),
            description: $LL.homePage.services.accessibility.description()
        }
    ];
</script>

<svelte:head>
    <title>{$LL.homePage.meta.title()}</title>
    <meta name="description" content={$LL.homePage.meta.description()} />
</svelte:head>

<main class="relative w-full max-w-[980px] flex flex-col items-center px-10 gap-32 my-10">
    <section class="relative w-full h-full flex justify-center items-start flex-col gap-14">
        <p>{$LL.homePage.greet()}</p>
        <h1 class="text-3xl leading-snug max-w-[1400px] 2xl:text-5xl">
            <!-- Rendering as HTML to highlight parts of the text with CSS. -->
            {@html $LL.homePage.briefDescription()}
        </h1>
        <ul class="relative flex flex-wrap">
            <li>{$LL.homePage.keywords.design()}</li>
            <li><IconPointFilled /></li>
            <li>{$LL.homePage.keywords.development()}</li>
            <li><IconPointFilled /></li>
            <li>{$LL.homePage.keywords.maintenance()}</li>
        </ul>
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
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {#each services as { Icon, title, description }}
                <article class="relative w-full flex-grow flex flex-col justify-center items-start gap-3">
                    <h3 class="text-xl font-medium flex items-center gap-5">
                        <Icon />
                        <span>{title}</span>
                    </h3>
                    <div class="relative w-14 h-[4px] bg-indigo-700 dark:bg-sky-300"></div>
                    <p class="text-start text-gray-500 dark:text-gray-300">
                        {description}
                    </p>
                </article>
            {/each}
        </div>
    </section>
    <section class="relative w-full h-full flex justify-center items-start flex-col gap-10">
        <h2 class="text-center text-3xl">{$LL.homePage.aboutMe.title()}</h2>
        <div class="text-justify flex flex-col gap-5">
            <p>{$LL.homePage.aboutMe.studies()}</p>
            <p>{$LL.homePage.aboutMe.hobbies()}</p>
            <p>{$LL.homePage.aboutMe.availability()}</p>
        </div>
    </section>
</main>
