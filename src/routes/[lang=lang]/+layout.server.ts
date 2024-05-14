import { latestArticles } from '$/lib/server/article';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { locale } }) => {
    const latest = await latestArticles(`./src/articles/${locale}/`, "", 4);

    return { latest };
};
