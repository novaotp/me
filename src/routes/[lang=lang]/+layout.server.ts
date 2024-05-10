import { importMarkdowns } from '$/lib/server/markdown';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { locale } }) => {
    const latest = (await importMarkdowns(`./src/articles/${locale}/`))
        .sort((a, b) => b.attributes.creationDate.getTime() - a.attributes.creationDate.getTime())
        .slice(0, 3);

    return { latest };
};
