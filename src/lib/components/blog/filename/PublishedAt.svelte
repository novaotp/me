<script lang="ts">
    import { LL, locale } from '$i18n/i18n-svelte';

    interface Props {
        /** When the article was published. */
        creationDate: Date;
    }

    let { creationDate }: Props = $props();
</script>

<time class="text-sm">
    {$LL.articlePage.postedAt(
        creationDate.toLocaleDateString($locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    )}
</time>
