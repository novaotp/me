<script lang="ts">
    interface Props {
        /** The HTML body of the article. */
        html: string;
    }

    let { html }: Props = $props();
</script>

<div class="blog-article relative w-full flex flex-col justify-start items-start">
    {@html html}
</div>

<style>
    :global(div.blog-article code) {
        padding: 20px 0;
        counter-reset: line;
    }

    :global(div.blog-article code *) {
        font-family: 'Cascadia Code', sans-serif;
    }

    :global(div.blog-article span[data-highlighted-line]) {
        background-color: rgba(200, 200, 255, 0.1);
    }

    :global(div.blog-article code > [data-line]) {
        padding: 2px 20px;
    }

    :global(div.blog-article code[data-line-numbers] > [data-line]::before) {
        counter-increment: line;
        content: counter(line);
        display: inline-block;
        width: 1rem;
        margin-right: 2rem;
        text-align: right;
        color: gray;
    }

    :global(div.blog-article h2) {
        font-size: 1.5rem;
        font-weight: 600;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }

    :global(div.blog-article h3) {
        font-size: 1.25rem;
        font-weight: 600;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }

    :global(div.blog-article ul) {
        list-style-type: disc;
        margin-left: 2.5rem;
        margin-bottom: 1.25rem;
    }

    :global(div.blog-article a span, div.blog-article a svg) {
        color: #4f46e5;
        font-weight: 600;
    }

    :global(html.dark div.blog-article a span, html.dark div.blog-article a svg) {
        color: #38bdf8;
        font-weight: 600;
    }

    :global(div.blog-article p) {
        margin-bottom: 1.25rem;
    }

    :global(div.blog-article h2 > p) {
        margin-bottom: 0;
    }

    :global(div.blog-article figure) {
        position: relative;
        width: 100%;
        color: #ffffff;
        margin-bottom: 1.25rem;
    }

    :global(div.blog-article figure pre code) {
        overflow: auto;
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }

    :global(div.blog-article code),
    :global(div.blog-article code span) {
        color: var(--shiki-light);
        background-color: var(--shiki-light-bg);
    }

    :global(html.dark div.blog-article code),
    :global(html.dark div.blog-article code span) {
        color: var(--shiki-dark);
        background-color: var(--shiki-dark-bg);
    }
</style>
