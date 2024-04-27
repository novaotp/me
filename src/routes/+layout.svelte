<script lang="ts">
	import '../app.css';
   	import { setLocale } from '../i18n/i18n-svelte'
    import type { LayoutData } from './$types';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();

	export let data: LayoutData;

	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale)
</script>

<slot />
