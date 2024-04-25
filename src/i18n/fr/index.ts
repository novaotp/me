import type { BaseTranslation } from '../i18n-types'

const fr = {
	footer: {
		language: {
			title: "Langage"
		}
	},
	languages: {
		french: "Français",
		english: "Anglais"
	},
	navigation: {
		homePage: "Home",
		workPage: "Mes travaux",
		blogPage: "Mon blog",
		contact: {
			idea: "Un projet en tête ?",
			letsTalk: "Parlons-en",
			page: "Contact"
		},
	},
	homePage: {
		greet: "Bonjour, je suis Sajidur Rahman.",
		briefDescription: "Un développeur web axé sur les interfaces utilisateur pour un design fluide et une satisfaction client optimale.",
		keywords: {
			design: "Design",
			development: "Développement",
			maintenance: "Maintenance"
		},
		contact: {
			idea: "Un projet en tête ?",
			letsTalk: "Parlons-en"
		},
		services: {
			title: "Services",
			benefits: {
				title: "Prestations & Services",
				description: "Design web, développement web, SEO, suivi régulier, sites web responsives."
			},
			performance: {
				title: "Optimisé & Performant",
				description: "Création de sites web performants et optimisés pour le référencement."
			},
			collaboration: {
				title: "Collaboration",
				description: "Collaboration en continu pour répondre à des besoins qui évoluent."
			}
		},
		aboutMe: {
			title: "À propos",
			studies: "Passionné par la création de sites web intuitifs et performants, j'étudie actuellement à l'EPTM de Sion en tant que développeur d'applications. Je souhaite continuer à apprendre et me perfectionner dans ce domaine en pleine évolution.",
			skills: {
				title: "Mes compétences techniques incluent"
				// TODO: Expand with the skills
			},
			hobbies: "En dehors de mes études, je suis passionné par le design. J'aime également le dessin (avec une tablette graphique) et la politique internationale.",
			availability: "Je suis disponible pour des missions de développement web freelance ou pour des collaborations sur des projets open-source."
		}
	},
	workPage: {
		meta: {
			title: "Mes projets - Sajidur Rahman"
		},
		title: "Mes travaux",
		notYet: "Je n'ai pas encore pu développer de sites web pour des clients. Revenez prochainement !"
	},
	blogPage: {
		meta: {
			title: "Blog - Sajidur Rahman"
		}
	},
	contactPage: {
		meta: {
			title: "Contact - Sajidur Rahman"
		},
		letsWorkTogether: "Commençons un projet ensemble",
		completeTheForm: "Complétez le formulaire ci-dessous pour me contacter.",
		form: {
			notifications: {
				fillAll: "Veuillez compléter tous les champs.",
				invalidEmail: "Entrez un email valide.",
				emailSent: "Email envoyé avec succès, je reviendrai vers vous dès que possible.",
				emailError: "Une erreur s'est produite. Réessayez plus tard."
			},
			fields: {
				name: {
					placeholder: "Entrez votre nom ici..."
				},
				email: {
					placeholder: "Entrez votre email ici..."
				},
				message: {
					placeholder: "Entrez votre message ici..."
				}
			},
			send: "Envoyer"
		}
	}
} satisfies BaseTranslation

export default fr
