import type { BaseTranslation } from '../i18n-types';

const fr = {
    meta: {
        keywords: "développement web, conception web, portfolio, freelance, développeur, conception UI/UX, solutions créatives, développement axé client"
    },
    footer: {
        quickLinks: 'Liens rapides',
        latestArticles: 'Mes Derniers Articles',
        language: {
            title: 'Langue'
        }
    },
    languages: {
        french: 'Français',
        english: 'Anglais'
    },
    navigation: {
        homePage: 'Home',
        workPage: 'Mes travaux',
        blogPage: 'Mon blog',
        contact: {
            idea: 'Un projet en tête ?',
            letsTalk: 'Parlons-en',
            page: 'Contact',
            letsWorkTogether: 'Travaillons ensemble'
        }
    },
    homePage: {
        meta: {
            title: "Home - Sajidur Rahman",
            description: "Bienvenue dans mon monde! Explorez mon site Web pour découvrir mes passions, mes projets et mes articles en développement Web."
        },
        greet: 'Bonjour, je suis Sajidur Rahman.',
        briefDescription: 'Un développeur web axé sur les interfaces utilisateur pour un design fluide et une satisfaction client optimale.',
        keywords: {
            design: 'Design',
            development: 'Développement',
            maintenance: 'Maintenance'
        },
        contact: {
            idea: 'Un projet en tête ?',
            letsTalk: 'Parlons-en'
        },
        services: {
            title: 'Services',
            benefits: {
                title: 'Responsive',
                description: 'Sites web adaptés à tout type d\'écran, garantissant une expérience fluide.'
            },
            performance: {
                title: 'Performant',
                description: 'Création de sites web performants et optimisés pour le référencement (SEO).'
            },
            collaboration: {
                title: 'Collaboratif',
                description: 'Collaboration en continu pour répondre à des besoins qui évoluent.'
            },
            accessibility: {
                title: 'Accessible',
                description: 'Un design accessible et intuitif. Ergonomique et facilité d\'utilisation.'
            }
        },
        aboutMe: {
            title: 'À propos',
            studies:
                "Passionné par la création de sites web intuitifs et performants, j'étudie actuellement à l'EPTM de Sion en tant que développeur d'applications. Je souhaite continuer à apprendre et me perfectionner dans ce domaine en pleine évolution.",
            skills: {
                title: 'Mes compétences techniques incluent'
                // TODO: Expand with the skills
            },
            hobbies:
                "En dehors de mes études, je suis passionné par le design. J'aime également le dessin (avec une tablette graphique) et la politique internationale.",
            availability:
                'Je suis disponible pour des missions de développement web freelance ou pour des collaborations sur des projets open-source.'
        }
    },
    workPage: {
        meta: {
            title: 'Mes projets - Sajidur Rahman',
            description: "Découvrez comment j'ai transformé des idées en projets réussis. Explorez mon portfolio pour vous inspirer."
        },
        title: 'Mes travaux',
        notYet: "Je n'ai pas encore pu développer de sites web pour des clients. Revenez prochainement !"
    },
    blogPage: {
        meta: {
            title: 'Blog - Sajidur Rahman',
            description: "Libérez la puissance du développement Web moderne avec des guides clairs sur SvelteKit, Tailwind CSS, PostgreSQL et plus encore ! Apprenez les compétences essentielles pour créer des sites Web incroyables. Commencez votre voyage aujourd'hui !"
        },
        summary: "Ici, vous trouverez quelques articles que j'ai rédigés. Néanmoins, ils ne sont disponibles qu'en anglais pour l'instant."
    },
    articlePage: {
        back: 'Retour'
    },
    contactPage: {
        meta: {
            title: 'Contact - Sajidur Rahman',
            description: "Prêt à collaborer ? Discutons ! Utilisez notre formulaire de contact pratique pour nous contacter dès aujourd'hui."
        },
        letsWorkTogether: 'Commençons un projet ensemble',
        completeTheForm: 'Complétez le formulaire ci-dessous pour me contacter.',
        form: {
            notifications: {
                fillAll: 'Veuillez compléter tous les champs.',
                invalidEmail: 'Entrez un email valide.',
                emailSent: 'Email envoyé avec succès, je reviendrai vers vous dès que possible.',
                emailError: "Une erreur s'est produite. Réessayez plus tard."
            },
            fields: {
                name: {
                    placeholder: 'Entrez votre nom ici...'
                },
                email: {
                    placeholder: 'Entrez votre email ici...'
                },
                message: {
                    placeholder: 'Entrez votre message ici...'
                }
            },
            send: 'Envoyer'
        }
    }
} satisfies BaseTranslation;

export default fr;
