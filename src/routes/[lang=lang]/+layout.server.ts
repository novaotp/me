import { getLatestArticles } from '$lib/server/article';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { locale } }) => {
    const latestArticles = await getLatestArticles(locale);

    return { latestArticles };
};
