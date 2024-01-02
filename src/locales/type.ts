export interface LanguageDictionary {
    navigation: {
        home: string;
        work: string;
        about: string;
        contact: string;
    },
    contact: {
        title: string;
        paragraph: string;
        placeholders: {
            name: string;
            email: string;
            message: string;
        },
        send: string;
    };
}