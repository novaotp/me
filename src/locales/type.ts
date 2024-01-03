export interface LanguageDictionary {
    /** The labels for the navigation menu. */
    navigation: {
        home: string;
        work: string;
        blog: string;
        contact: string;
    },
    /** The content for the home page. */
    home: {
        greeting: string;
        paragraph: string;
    },
    /** The content for the work page. */
    work: {
        greeting: string;
        paragraph: string;
    },
    /** The content for the blog page. */
    blog: {
        greeting: string;
        paragraph: string;
    },
    /** The content for the contact page. */
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