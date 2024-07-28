<script lang="ts">
    import '../app.css';
    import { onMount } from 'svelte';
    import { initTheme } from '$lib/stores/theme';
    import { setLocale } from '../i18n/i18n-svelte';
    import type { LayoutData } from './$types';

    export let data: LayoutData;

    setLocale(data.locale);
    
    onMount(() => {
        initTheme();
    });
</script>

<slot />
