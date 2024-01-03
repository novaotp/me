import { LanguageDictionary } from "../type";

export const frDict: LanguageDictionary = {
    navigation: {
        home: "Home",
        work: "Travaux",
        blog: "Blog",
        contact: "Contact",
    },
    home: {
        greeting: "Bonjour, je suis Sajidur Rahman.",
        paragraph: "[Insérez un texte sur ma vie ici]"
    },
    work: {
        greeting: "Voici mes travaux...",
        paragraph: "[Insérez des projets ici]"
    },
    blog: {
        greeting: "Quelques articles que j'ai rédigés...",
        paragraph: "[Insérez des articles ici]"
    },
    contact: {
        title: "Page de contact",
        paragraph: "Complétez le formulaire ci-dessous pour me contacter. Je reviendrai vers vous dès que possible !",
        placeholders: {
            name: "Entrez votre nom ici...",
            email: "Entrez votre email ici...",
            message: "Entrez votre message ici..."
        },
        send: "Envoyer"
    },
};