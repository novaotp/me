<script lang="ts">
    import { LL } from '$i18n/i18n-svelte';

    interface Props {
        /** The estimated read time of the article. */
        readTime: number;
    }

    let { readTime }: Props = $props();
</script>

<time class="text-blue-700 dark:text-sky-300 text-sm">{$LL.blogPage.readTime(readTime).toUpperCase()}</time>
