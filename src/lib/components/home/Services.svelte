<script lang="ts">
    import IconCode from "@tabler/icons-svelte/icons/code";
    import IconHammer from "@tabler/icons-svelte/icons/hammer";
    import IconPalette from "@tabler/icons-svelte/icons/palette";

    type Service = {
        Icon: typeof IconCode;
        title: string;
        description: string;
    };

    let services = $state<Service[]>([
        {
            Icon: IconPalette,
            title: "Design",
            description:
                "Custom-made and modern designs that perfectly reflect your brand identity.",
        },
        {
            Icon: IconCode,
            title: "Development",
            description:
                "High-performing and dynamic applications designed to deliver a smooth user experience.",
        },
        {
            Icon: IconHammer,
            title: "Maintenance",
            description:
                "Comprehensive site maintenance to ensure it stays updated, secure, and performs optimally at all times.",
        },
    ]);
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
