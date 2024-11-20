<script lang="ts">
    import { slugify } from '$lib/utils/slugify';

    interface Props {
        /** The headings to display in the summary. */
        headings: string[];
    }
    import LL from '$i18n/i18n-svelte';

    let { headings }: Props = $props();
</script>

<aside class="flex flex-col gap-5">
    <h2 class="text-2xl font-semibold pt-5">{$LL.articlePage.summary()}</h2>
    <ul class="flex flex-col gap-2 list-decimal">
        {#each headings as heading}
            <li class="ml-5">
                <a href="#{slugify(heading)}" class="text-start no-underline">{heading}</a>
            </li>
        {/each}
    </ul>
</aside>
