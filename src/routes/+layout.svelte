<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { initTheme } from '$stores/theme/index.svelte';
    import { setLocale } from '../i18n/i18n-svelte';

    let { children, data } = $props();

    setLocale(data.locale);
    
    onMount(() => {
        initTheme();
    });
</script>

{@render children()}
