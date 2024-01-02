import { LocaleKey } from "@/locales";
import { useParams } from "next/navigation"

/**
 * Returns the current locale.
 */
export const useLocale = (): LocaleKey => {
    const lang = useParams().lang as string;

    return lang as LocaleKey;
}