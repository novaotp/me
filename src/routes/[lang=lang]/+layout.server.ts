import { CONTENT_DIR, latestArticles } from '$lib/server/article';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { locale } }) => {
    const latest = await latestArticles(`${CONTENT_DIR}/${locale}/`, "", 4);

    return { latest };
};
