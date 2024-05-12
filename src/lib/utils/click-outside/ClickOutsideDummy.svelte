<script lang="ts">
    import { clickOutside } from ".";

    export let clicked: boolean = false;
</script>

<button
    on:emit={() => (clicked = true)}
    use:clickOutside
    class="absolute w-full top-full left-0 flex flex-col z-20"
    id="button"
>
    Test
</button>
<div id="other-element">
    Anything else
</div>
{#if clicked}
    <p id="clicked">I've been clicked</p>
{/if}
