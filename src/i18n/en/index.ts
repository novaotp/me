import type { Translation } from '../i18n-types';

const en = {
    meta: {
        keywords:
            'web development, web design, portfolio, freelancer, developer, UI/UX design, creative solutions, client-focused development'
    },
    footer: {
        quickLinks: 'Quick Links',
        language: {
            title: 'Language'
        },
        themes: {
            title: 'Mode',
            options: {
                light: 'Light',
                dark: 'Dark'
            }
        },
        policy: 'Privacy Policy'
    },
    languages: {
        french: 'French',
        english: 'English'
    },
    navigation: {
        homePage: 'Home',
        workPage: 'Works'
    },
    homePage: {
        meta: {
            title: 'Home - Sajidur Rahman',
            description:
                'Welcome to My World! Explore my website to learn about my passions, projects, and articles in web development.'
        },
        greet: 'Hello, I am Sajidur Rahman.',
        briefDescription:
            'A developer focused on performant applications for <span class="text-indigo-700 dark:text-sky-300">optimal customer satisfaction</span>.',
        services: {
            title: 'Services',
            design: {
                title: 'Design',
                description: 'Custom-made and modern designs that perfectly reflect your brand identity.'
            },
            development: {
                title: 'Development',
                description: 'High-performing and dynamic applications designed to deliver a smooth user experience.'
            },
            maintenance: {
                title: 'Maintenance',
                description:
                    'Comprehensive site maintenance to ensure it stays updated, secure, and performs optimally at all times.'
            }
        },
        faq: {
            title: 'FAQ',
            entries: {
                one: {
                    question: 'Why do I need a website ?',
                    answer: 'A website gives you an online presence where your clients can easily find you. It helps you get noticed, attract customers, and showcase what you offer effectively.'
                },
                two: {
                    question: 'How can a website help my business grow ?',
                    answer: 'Websites attract potential customers 24/7, provide valuable information, and create a trustworthy online presence. You can reach audiences well beyond your local market, improve customer communication, and even automate tasks such as scheduling or processing orders.'
                },
                three: {
                    question: 'What are the key elements of a successful website ?',
                    answer: 'A good website should be fast, easy to navigate, and pleasant to view on all screens, including smartphones. Information should be clear and well-presented, and the site should be secure to protect visitors.'
                },
                four: {
                    question: 'Can I use a free website builder ?',
                    answer: "Yes, you can use a free builder, but there are often limitations. The design will be less unique, you might have ads on your site, and you'll have less control over what you can do. A custom site allows you to have something that truly represents you and can grow with your business."
                },
                five: {
                    question: 'How much does it cost to create a website ?',
                    answer: "The cost of a website depends on what you want. A basic informational site is quite affordable, while a more elaborate site, like an online store, will cost more. It's an investment that varies based on your needs and budget."
                },
                six: {
                    question: "What do I need to do to maintain my website after it's built ?",
                    answer: 'After your site is created, it’s important to regularly update it, check for security issues to avoid problems, and manage the content to keep it current and relevant. Many people opt for a maintenance plan to ensure everything is handled efficiently and without hassle.'
                }
            }
        }
    },
    workPage: {
        meta: {
            title: 'My projects - Sajidur Rahman',
            description:
                "See how I've transformed ideas into successful projects. Explore my portfolio for inspiration."
        },
        title: 'My works',
        notYet: "I haven't been able to develop any websites for clients yet. Check back soon... or be my first client !"
    },
    pageNotFound: {
        meta: {
            title: 'Page not found - Sajidur Rahman',
            description: "The page you're looking for doesn't exist..."
        },
        title: 'Wrong path...',
        paragraph: 'It seems that you got lost...',
        backToHome: 'Back to home'
    }
} satisfies Translation;

export default en;
