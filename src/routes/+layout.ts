import { dev } from '$app/environment';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { inject } from '@vercel/analytics';
import { loadLocaleAsync } from '../i18n/i18n-util.async';

// Vercel analytics + speed insights
inject({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();

export const load = async ({ data: { locale } }) => {
    await loadLocaleAsync(locale);

    return { locale };
};
