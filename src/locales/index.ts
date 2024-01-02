import { deDict } from "./dictionaries/de";
import { enDict } from "./dictionaries/en";
import { frDict } from "./dictionaries/fr";
import { LanguageDictionary } from "./type";

/** The supported locales. */
export const locales = ['en-US', 'fr-CH', 'de-DE'] as const;
/** The default locale to use (`en-US`). */
export const DEFAULT_LOCALE = 'en-US';

/** The dictionary containing all the texts. */
export const dictionary = {
    en: enDict,
    fr: frDict,
    de: deDict,
} as const;

/** The supported keys for the dictionary. */
export type DictionaryKey = keyof typeof dictionary;

export type { LanguageDictionary };
