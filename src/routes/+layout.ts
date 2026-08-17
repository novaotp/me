import { dev } from '$app/environment';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
import { inject } from '@vercel/analytics';

export const prerender = true;

// Vercel analytics + speed insights
inject({ mode: dev ? 'development' : 'production' });
injectSpeedInsights();
