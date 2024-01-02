import { dictionary, locales, type LanguageDictionary, DictionaryKey } from "@/locales";

/**
 * Returns the correct dictionary for the given locale.
 * @param locale The locale to get the dictionary for 
 * @returns The dictionary for the given locale
 * @notice Works in server-side code
 */
export const useDictionary = (locale: string): LanguageDictionary => {
    let key: DictionaryKey = "en";

    if (locales.includes(locale)) {
        key = locale.split("-").at(0)! as DictionaryKey;
    }

    return dictionary[key];
}