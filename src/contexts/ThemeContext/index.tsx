'use client';

import { ChildrenProps } from '@/types';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

export const ThemeProvider = ({ children }: ChildrenProps) => {
    return (
        <NextThemeProvider attribute="class">
            {children}
        </NextThemeProvider>
    )
}
