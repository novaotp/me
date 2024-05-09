import { importMarkdowns } from '$/lib/server/markdown';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
    const latest = (await importMarkdowns('./src/lib/articles/'))
        .sort((a, b) => b.attributes.creationDate.getTime() - a.attributes.creationDate.getTime())
        .slice(0, 3);

    return { latest };
};
