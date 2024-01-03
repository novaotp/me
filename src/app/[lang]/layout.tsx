import { ChildrenProps } from '@/types';
import './globals.css';
import { poppins } from '@/fonts';
import { Navbar } from '@/components/shared/Navbar';
import { MetaBar } from '@/components/shared/Metabar';
import { locales } from '@/locales';
import { ThemeProvider } from '@/contexts/ThemeContext';

interface RootLayoutProps extends ChildrenProps {
    params: {
        lang: string;
    }
}

export async function generateStaticParams(): Promise<{ lang: (typeof locales)[number] }[]> {
    return [{ lang: 'en-US' }, { lang: 'de-DE' }, { lang: 'fr-CH' }]
}

const RootLayout = ({ children, params }: RootLayoutProps) => {
    const locale = params.lang;
    const lang = locale.split('-').at(0)!;

    return (
        <html lang={lang}>
            <body className={`relative flex flex-col justify-between ${poppins.className}`}>
                <ThemeProvider>
                    <MetaBar />
                    <div className='relative w-full flex-grow p-10 flex justify-center items-center'>
                        {children}
                    </div>
                    <Navbar />
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout;
