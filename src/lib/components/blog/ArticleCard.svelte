<script lang="ts">
    import { goto } from '$app/navigation';
    import LL, { locale } from '$i18n/i18n-svelte';
    import { cn } from '$lib/utils/cn';
    import type { ArticleMetadata } from '$lib/server/article';

    interface Props {
        class?: string;
        filename: string;
        metadata: ArticleMetadata;
    }

    let { class: className, filename, metadata }: Props = $props();
    let { title, description, banner, bannerAlt, creationDate, category, readTime } = $derived(metadata);
</script>

<button
    onclick={() => goto(`/${$locale}/blog/${category}/${filename}`, { noScroll: false })}
    class={cn(
        'relative rounded-lg shadow-[0_0_15px_0px_rgba(0,0,0,0.25)] duration-150 flex flex-col items-start',
        'overflow-hidden hover:scale-105 hover:shadow-[0_0_25px_0px_rgba(0,0,0,0.25)] dark:bg-zinc-700',
        className
    )}
>
    <div class="relative w-full h-[200px] flex justify-center items-center overflow-hidden">
        <img src={banner} alt={bannerAlt} class="w-full h-full object-cover" loading="lazy" />
    </div>
    <div class="relative w-full flex flex-col items-start gap-[10px] p-10">
        <div class="flex gap-3 items-center">
            <time class="text-gray-500 dark:text-gray-400 text-sm">{creationDate.toLocaleDateString($locale)}</time>
            <div class="h-5 w-[1px] bg-gray-400 dark:bg-gray-500"></div>
            <time class="text-blue-700 dark:text-sky-300 text-sm">{$LL.blogPage.readTime(readTime).toUpperCase()}</time>
        </div>
        <h2 class="relative w-full text-start text-xl">{title}</h2>
        <p class="text-justify text-gray-500 dark:text-gray-400 line-clamp-3">{description}</p>
    </div>
</button>
