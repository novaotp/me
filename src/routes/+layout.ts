import type { LayoutLoad } from './$types';
import type { Locales } from '../i18n/i18n-types';
import { loadLocaleAsync } from '../i18n/i18n-util.async';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';

// Vercel analytics + speed insights
inject({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => {
    await loadLocaleAsync(locale);
    return { locale };
};
