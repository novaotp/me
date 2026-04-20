import { loadLocaleAsync } from '../i18n/i18n-util.async';

export const load = async ({ data: { locale } }) => {
    await loadLocaleAsync(locale);

    return { locale };
};
