import { base } from '$app/paths';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals: { locale }, url }) => {
	if (url.pathname === "/") {
		throw redirect(307, `${base}/${locale}`)
	}

	return { locale };
}

export const prerender = true;
export const ssr = false;
