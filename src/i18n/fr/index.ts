import type { BaseTranslation } from '../i18n-types';

const fr = {
    meta: {
        keywords:
            'développement web, conception web, portfolio, freelance, développeur, conception UI/UX, solutions créatives, développement axé client'
    },
    footer: {
        quickLinks: 'Liens rapides',
        latestArticles: 'Mes Derniers Articles',
        language: {
            title: 'Langue'
        },
        themes: {
            title: 'Thème',
            options: {
                light: 'Clair',
                dark: 'Sombre'
            }
        },
        policy: 'Politique de confidentialité'
    },
    languages: {
        french: 'Français',
        english: 'Anglais'
    },
    navigation: {
        homePage: 'Home',
        workPage: 'Travaux',
        blogPage: 'Blog',
        contact: {
            idea: 'Un projet en tête ?',
            letsTalk: 'Parlons-en',
            page: 'Contact',
            letsWorkTogether: 'Travaillons ensemble'
        }
    },
    homePage: {
        meta: {
            title: 'Home - Sajidur Rahman',
            description:
                'Bienvenue dans mon monde! Explorez mon site Web pour découvrir mes passions, mes projets et mes articles en développement Web.'
        },
        greet: 'Bonjour, je suis Sajidur Rahman.',
        briefDescription:
            'Un développeur axé sur des applications performantes pour une <span class="text-indigo-700 dark:text-sky-300">satisfaction client optimale</span>.',
        contact: {
            idea: 'Un projet en tête ?',
            letsTalk: 'Parlons-en'
        },
        services: {
            title: 'Services',
            design: {
                title: 'Design',
                description:
                    "Des designs modernes et faits sur mesure, qui reflètent parfaitement l'identité de votre marque."
            },
            development: {
                title: 'Développement',
                description:
                    'Des applications performantes et dynamiques, conçues pour offrir une expérience utilisateur fluide.'
            },
            maintenance: {
                title: 'Maintenance',
                description:
                    "Maintenance complète de votre site, pour qu'il reste à jour, sécurisé et performant en tout temps."
            }
        },
        faq: {
            title: 'FAQ',
            entries: {
                one: {
                    question: "Pourquoi ai-je besoin d'un site web ?",
                    answer: 'Un site web te donne une présence en ligne, où tes clients peuvent te trouver facilement. Il te permet de te faire connaître, d’attirer des clients et de mettre en valeur ce que tu proposes de manière efficace.'
                },
                two: {
                    question: 'Comment un site web peut-il aider mon entreprise à se développer ?',
                    answer: 'Les sites web attirent des clients potentiels 24/7, fournissent des informations précieuses et créent une présence en ligne digne de confiance. Tu peux atteindre des publics bien au-delà de ton marché local, améliorer la communication avec les clients et même automatiser des tâches telles que la planification ou le traitement des commandes.'
                },
                three: {
                    question: "Quels sont les éléments clés d'un site web réussi ?",
                    answer: 'Un bon site web doit être rapide, facile à naviguer, et agréable à regarder sur tous les écrans, y compris les smartphones. Il faut aussi que les infos soient claires et bien présentées, et que le site soit sécurisé pour protéger les visiteurs.'
                },
                four: {
                    question: 'Puis-je utiliser un constructeur de site web gratuit ?',
                    answer: "Oui, tu peux utiliser un constructeur gratuit, mais il y a souvent des limites. Le design sera moins unique, tu pourrais avoir des pubs sur ton site, et tu auras moins de contrôle sur ce que tu peux faire. Un site personnalisé te permet d'avoir quelque chose qui te correspond et qui peut grandir avec ton entreprise."
                },
                five: {
                    question: "Combien coûte la création d'un site web ?",
                    answer: "Le prix d'un site web dépend de ce que tu souhaites. Un site vitrine est assez abordable, alors qu'un site plus élaboré, comme une boutique en ligne, coûtera davantage. C'est un investissement qui varie en fonction de tes besoins et de ton budget."
                },
                six: {
                    question: 'Que dois-je faire pour entretenir mon site web après sa création ?',
                    answer: "Après la création de ton site, il est important de le mettre à jour régulièrement, de vérifier la sécurité pour éviter les problèmes, et de gérer le contenu pour qu'il reste à jour et pertinent. Beaucoup choisissent un plan de maintenance pour s’assurer que tout est géré efficacement et sans souci."
                }
            }
        }
    },
    workPage: {
        meta: {
            title: 'Mes projets - Sajidur Rahman',
            description:
                "Découvrez comment j'ai transformé des idées en projets réussis. Explorez mon portfolio pour vous inspirer."
        },
        title: 'Mes travaux',
        notYet: "Je n'ai pas encore pu développer de sites web pour des clients. Reviens prochainement... ou sois mon premier client !"
    },
    blogPage: {
        meta: {
            title: 'Blog - Sajidur Rahman',
            description:
                "Libérez la puissance du développement Web moderne avec des guides clairs sur SvelteKit, Tailwind CSS, PostgreSQL et plus encore ! Apprenez les compétences essentielles pour créer des sites Web incroyables. Commencez votre voyage aujourd'hui !"
        },
        summary: "Ici, tu trouveras quelques articles que j'ai rédigés.",
        categories: {
            all: 'Tout',
            personal: 'Personnel',
            guide: 'Guide'
        },
        readTime: '{0} min de lecture'
    },
    articlePage: {
        back: 'Retour',
        summary: 'Sommaire',
        postedAt: 'Publié le {0}',
        latestArticles: 'Récents Articles',
        copy: {
            success: 'Copié avec succès',
            fail: 'Échec de la copie'
        }
    },
    contactPage: {
        meta: {
            title: 'Contact - Sajidur Rahman',
            description:
                "Prêt à collaborer ? Discutons ! Utilisez notre formulaire de contact pratique pour nous contacter dès aujourd'hui."
        },
        title: 'Commençons un projet ensemble',
        content: {
            email: "Envoie un email à l'adresse",
            or: 'ou',
            form: 'Complète le formulaire ci-dessous pour me contacter.'
        },
        email: {
            subject: 'Formulaire de contact - Sajidur Rahman'
        },
        form: {
            notifications: {
                fillAll: 'Pense à compléter tous les champs.',
                invalidEmail: 'Entre un email valide.',
                emailSent: 'Email envoyé avec succès, je reviendrai vers toi dès que possible.',
                emailError: "Une erreur s'est produite. Réessaie plus tard."
            },
            fields: {
                name: {
                    placeholder: 'Entre ton nom ici...'
                },
                email: {
                    placeholder: 'Entre ton email ici...'
                },
                message: {
                    placeholder: 'Entre ton message ici...'
                }
            },
            send: 'Envoyer'
        }
    },
    privacyPolicyPage: {
        meta: {
            title: 'Politique de confidentialité - Sajidur Rahman',
            description:
                'La transparence et la protection des données est ma principales priorité. Ma politique de confidentialité détaillée explique comment je traitons tes informations, en veillant à ce que ta vie privée soit toujours respectée.'
        },
        banner: {
            title: 'Avis important',
            content:
                "Ma politique de confidentialité est en cours d'élaboration. Je m'engage à fournir des informations claires sur la manière dont je traite tes données. Pour m'aider à l'améliorer, fais-moi part de tes questions ou suggestions à l'adresse suivante"
        },
        onThisPage: 'Sur cette page'
    },
    pageNotFound: {
        meta: {
            title: 'Page non trouvée - Sajidur Rahman',
            description: "La page que tu recherches n'existe pas..."
        },
        title: 'Mauvais chemin...',
        paragraph: "Il semble que tu t'es trompé de chemin...",
        backToHome: 'Retour à la page principale'
    }
} satisfies BaseTranslation;

export default fr;
