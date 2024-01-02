import { ChildrenProps } from '@/types';
import './globals.css';
import { poppins } from '@/fonts';
import { Navbar } from '@/components/shared/Navbar';
import { MetaBar } from '@/components/shared/Metabar';
import { locales } from '@/locales';

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
                <MetaBar />

                <div className='relative w-full h-[calc(100vh-140px)] p-10'>
                    {children}
                </div>

                <Navbar />
            </body>
        </html>
    )
}

export default RootLayout;
