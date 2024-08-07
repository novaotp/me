import type { Translation } from '../i18n-types';

const en = {
    meta: {
        keywords: "web development, web design, portfolio, freelancer, developer, UI/UX design, creative solutions, client-focused development"
    },
    footer: {
        quickLinks: 'Quick Links',
        latestArticles: 'My Latest Articles',
        language: {
            title: 'Language'
        },
        themes: {
            title: "Mode",
            options: {
                light: "Light",
                dark: "Dark"
            }
        },
        policy: "Privacy Policy"
    },
    languages: {
        french: 'French',
        english: 'English'
    },
    navigation: {
        homePage: 'Home',
        workPage: 'My works',
        blogPage: 'My blog',
        contact: {
            idea: 'Have an idea ?',
            letsTalk: "Let's talk",
            page: 'Contact',
            letsWorkTogether: "Let's Work Together"
        }
    },
    homePage: {
        meta: {
            title: "Home - Sajidur Rahman",
            description: "Welcome to My World! Explore my website to learn about my passions, projects, and articles in web development."
        },
        greet: 'Hello, I am Sajidur Rahman.',
        briefDescription: 'A web developer focused on user interfaces for fluid design and optimal customer satisfaction.',
        keywords: {
            design: 'Design',
            development: 'Development',
            maintenance: 'Maintenance'
        },
        contact: {
            idea: 'Have an idea ?',
            letsTalk: "Let's talk"
        },
        services: {
            title: 'Services',
            benefits: {
                title: 'Adaptive',
                description: 'Websites adapted to any type of screen, ensuring a seamless experience.'
            },
            performance: {
                title: 'Performant',
                description: 'Creating high-performance, SEO-optimized websites.'
            },
            collaboration : {
                title: 'Collaborative',
                description: 'Continuous collaboration to meet evolving needs.'
            },
            accessibility: {
                title: "Accessible",
                description: 'An accessible and intuitive design. Ergonomic and ease of use.'
            }
        },
        aboutMe: {
            title: 'About Me',
            studies:
                'Passionate about creating intuitive and efficient websites, I am currently studying at EPTM in Sion as an application developer. I want to continue to learn and improve in this rapidly evolving field.',
            skills: {
                title: 'My technical skills include'
                // TODO: Expand with the skills
            },
            hobbies: 'Outside of my studies, I am passionate about design. I also like drawing (with a graphics tablet) and international politics.',
            availability: 'I am available for freelance web development missions or for collaborations on open-source projects.'
        }
    },
    workPage: {
        meta: {
            title: 'My projects - Sajidur Rahman',
            description: "See how I've transformed ideas into successful projects. Explore my portfolio for inspiration."
        },
        title: 'My works',
        notYet: "I haven't been able to develop any websites for clients yet. Check back soon!"
    },
    blogPage: {
        meta: {
            title: 'Blog - Sajidur Rahman',
            description: "Unlock the Power of Modern Web Dev with clear guides on SvelteKit, Tailwind CSS, PostgreSQL, and more! Learn essential skills to build amazing websites. Start your journey today!"
        },
        summary: "Here, you'll find articles I've written.",
        categories: {
            all: "All",
            personal: "Personal",
            guide: "Guide"
        },
        readTime: "{0} min read"
    },
    articlePage: {
        back: 'Back',
        summary: "Summary",
        postedAt: "Published on {0}",
        latestArticles: "Latest Articles",
        copy: {
            success: "Copied successfully",
            fail: "Failed to copy"
        }
    },
    contactPage: {
        meta: {
            title: 'Contact - Sajidur Rahman',
            description: "Ready to Collaborate? Let's chat! Use our convenient contact form to reach out today."
        },
        title: "Let's start a project together",
        content: {
            email: "Send an email at",
            or: "or",
            form: "Complete the form below to contact me."
        },
        email: {
            subject: "Contact Form - Sajidur Rahman"
        },
        form: {
            notifications: {
                fillAll: 'Please complete all fields.',
                invalidEmail: 'Enter a valid email.',
                emailSent: 'Email sent successfully, I will get back to you as soon as possible.',
                emailError: 'An error occurred. Try again later.'
            },
            fields: {
                name: {
                    placeholder: 'Enter your name here...'
                },
                email: {
                    placeholder: 'Enter your email here...'
                },
                message: {
                    placeholder: 'Enter your message here...'
                }
            },
            send: 'Send'
        }
    },
    privacyPolicyPage: {
        meta: {
            title: "Privacy Policy - Sajidur Rahman",
            description: "Transparency and data protection are our top priorities. Our detailed privacy policy explains how we handle your information, ensuring your privacy is always respected."
        },
        banner: {
            title: "Important Notice",
            content: "Our privacy policy is a work in progress. We're committed to providing clear information about how we handle your data. To help us improve, let us know if you have any questions or suggestions at"
        },
        onThisPage: "On this page"
    }
} satisfies Translation;

export default en;
