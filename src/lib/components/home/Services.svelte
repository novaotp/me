<script lang="ts">
    import LL, { locale } from '$i18n/i18n-svelte';
    import IconCode from '@tabler/icons-svelte/icons/code';
    import IconHammer from '@tabler/icons-svelte/icons/hammer';
    import IconPalette from '@tabler/icons-svelte/icons/palette';

    type Service = {
        Icon: typeof IconCode,
        title: string,
        description: string
    }

    let services = $state<Service[]>([]);

    // Wrapped in $effect because it doesn't properly re-render on locale change
    $effect(() => {
        $locale;

        services = [
                {
                    Icon: IconPalette,
                    title: $LL.homePage.services.design.title(),
                    description: $LL.homePage.services.design.description()
                },
                {
                    Icon: IconCode,
                    title: $LL.homePage.services.development.title(),
                    description: $LL.homePage.services.development.description()
                },
                {
                    Icon: IconHammer,
                    title: $LL.homePage.services.maintenance.title(),
                    description: $LL.homePage.services.maintenance.description()
                }
            ];
    });
    
</script>

<div class="flex flex-col md:flex-row gap-10 items-start">
    {#each services as { Icon, title, description }}
        <article class="relative w-full flex-grow flex flex-col justify-center items-start gap-5">
            <h3 class="text-xl font-medium flex items-center gap-5">
                <Icon />
                <span>{title}</span>
            </h3>
            <div class="relative w-14 h-[4px] bg-indigo-700 dark:bg-sky-300"></div>
            <p class="text-start dark:text-white">
                {description}
            </p>
        </article>
    {/each}
</div>
