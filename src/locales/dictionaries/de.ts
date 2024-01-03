import { LanguageDictionary } from "../type";

export const deDict: LanguageDictionary = {
    navigation: {
        home: "Home",
        work: "Arbeit",
        blog: "Blog",
        contact: "Kontakt",
    },
    home: {
        greeting: "Hallo, ich bin Sajidur Rahman.",
        paragraph: "[Hier Text über mein Leben einfügen]"
    },
    work: {
        greeting: "Hier sind die Projekte, an denen ich arbeite/gearbeitet habe...",
        paragraph: "[Hier Projekte einfügen]"
    },
    blog: {
        greeting: "Einige Artikel, die ich geschrieben habe...",
        paragraph: "[Artikel hier einfügen]"
    },
    contact: {
        title: "Kontaktseite",
        paragraph: "Füllen Sie das untenstehende Formular aus, um mit mir in Kontakt zu treten. Ich werde so schnell wie möglich auf Sie zurückkommen!",
        placeholders: {
            name: "Geben Sie hier Ihren Namen ein...",
            email: "Geben Sie hier Ihren E-Mail-Adresse ein...",
            message: "Geben Sie hier Ihren Nachricht ein..."
        },
        send: "Senden"
    },
};