import { LanguageDictionary } from "../type";

export const enDict: LanguageDictionary = {
    navigation: {
        home: "Home",
        work: "Work",
        blog: "Blog",
        contact: "Contact",
    },
    home: {
        greeting: "Hello, I'm Sajidur Rahman.",
        paragraph: "[Insert text about my life here]"
    },
    work: {
        greeting: "Here are the projects I am working/have worked on...",
        paragraph: "[Insert projects here]"
    },
    blog: {
        greeting: "Some articles I've written...",
        paragraph: "[Insert articles here]"
    },
    contact: {
        title: "Contact Page",
        paragraph: "Fill the form below to get in touch with me. I'll get back to you as soon as I can !",
        placeholders: {
            name: "Enter your name here...",
            email: "Enter your email here...",
            message: "Enter your message here..."
        },
        send: "Send"
    },
};