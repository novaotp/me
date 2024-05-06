import type { LayoutLoad } from './$types'
import type { Locales } from '../i18n/i18n-types'
import { loadLocaleAsync } from '../i18n/i18n-util.async'
import { i18nObject } from '../i18n/i18n-util.js'
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { dev } from '$app/environment';
import { inject } from '@vercel/analytics';
 
// Vercel analytics + speed insights
inject({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();

export const load: LayoutLoad<{ locale: Locales }> = async ({ data: { locale } }) => {
	// load dictionary into memory
	await loadLocaleAsync(locale)
	// if you need to output a localized string in a `load` function,
	// you always need to create a new `i18nObject` instance in each `load` function
	// to not run into shared server state issues
	const LL = i18nObject(locale)

	// pass locale to the "rendering context"
	return { locale }
}
