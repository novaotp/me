<script lang="ts">
    import '../app.css';
    import { setLocale } from '../i18n/i18n-svelte';
    import type { LayoutData } from './$types';
    import { initTheme } from '$/lib/stores/theme';

    export let data: LayoutData;

    setLocale(data.locale);
    initTheme();
</script>

<slot />
