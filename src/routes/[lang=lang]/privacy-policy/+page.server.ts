import type { Locales } from "$/i18n/i18n-types";
import { privacyPolicy } from "$/lib/server/privacy-policy";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const content = await privacyPolicy(params.lang as Locales);

    return { ...content };
};

export const entries: EntryGenerator = () => {
    return [{ lang: 'fr' }, { lang: 'en' }];
};
