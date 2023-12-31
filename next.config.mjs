/** @type {import('next').NextConfig} */
const config = {
    reactStrictMode: true,
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'fr', 'de'],
        localeDetection: false
    },
}

export default config;
