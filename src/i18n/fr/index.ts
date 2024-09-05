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
        },
        themes: {
            title: "Thème",
            options: {
                light: "Clair",
                dark: "Sombre"
            }
        },
        policy: "Politique de confidentialité"
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
        briefDescription: 'Un développeur axé sur des applications performantes pour une <span class="text-indigo-700 dark:text-sky-300">satisfaction client optimale</span>.',
        contact: {
            idea: 'Un projet en tête ?',
            letsTalk: 'Parlons-en'
        },
        services: {
            title: 'Services',
            design: {
                title: 'Design',
                description: 'Des designs modernes et faits sur mesure, qui reflètent parfaitement l\'identité de votre marque.'
            },
            development: {
                title: 'Développement',
                description: 'Des applications performantes et dynamiques, conçues pour offrir une expérience utilisateur fluide.'
            },
            maintenance: {
                title: 'Maintenance',
                description: 'Maintenance complète de votre site, pour qu\'il reste à jour, sécurisé et performant en tout temps.'
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
        summary: "Ici, vous trouverez quelques articles que j'ai rédigés.",
        categories: {
            all: "Tout",
            personal: "Personnel",
            guide: "Guide"
        },
        readTime: "{0} min de lecture"
    },
    articlePage: {
        back: 'Retour',
        summary: "Sommaire",
        postedAt: "Publié le {0}",
        latestArticles: "Récents Articles",
        copy: {
            success: "Copié avec succès",
            fail: "Échec de la copie"
        }
    },
    contactPage: {
        meta: {
            title: 'Contact - Sajidur Rahman',
            description: "Prêt à collaborer ? Discutons ! Utilisez notre formulaire de contact pratique pour nous contacter dès aujourd'hui."
        },
        title: 'Commençons un projet ensemble',
        content: {
            email: "Envoyez un email à l'adresse",
            or: "ou",
            form: "Complétez le formulaire ci-dessous pour me contacter."
        },
        email: {
            subject: "Formulaire de contact - Sajidur Rahman"
        },
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
    },
    privacyPolicyPage: {
        meta: {
            title: "Politique de confidentialité - Sajidur Rahman",
            description: "La transparence et la protection des données sont nos principales priorités. Notre politique de confidentialité détaillée explique comment nous traitons vos informations, en veillant à ce que votre vie privée soit toujours respectée."
        },
        banner: {
            title: "Avis important",
            content: "Notre politique de confidentialité est en cours d'élaboration. Nous nous engageons à fournir des informations claires sur la manière dont nous traitons vos données. Pour nous aider à nous améliorer, faites-nous part de vos questions ou suggestions à l'adresse suivante"
        },
        onThisPage: "Sur cette page"
    }
} satisfies BaseTranslation;

export default fr;
