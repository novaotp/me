import { ChildrenProps } from '@/types';
import './globals.css';
import { poppins } from '@/fonts';
import { Navbar } from '@/components/shared/Navbar';

const RootLayout = ({ children }: ChildrenProps) => {
    return (
        <html lang="en">
            <body className={`relative flex flex-col justify-between ${poppins.className}`}>
                <div className='relative w-full flex-grow p-10'>
                    {children}
                </div>

                <Navbar />
            </body>
        </html>
    )
}

export default RootLayout;
