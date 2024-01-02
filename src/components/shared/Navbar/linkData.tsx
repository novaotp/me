import HomeIcon from '@mui/icons-material/HomeWorkRounded';
import WorkIcon from '@mui/icons-material/WorkRounded';
import AboutIcon from '@mui/icons-material/AccountCircleRounded';
import ContactIcon from '@mui/icons-material/MailRounded';
import { LinkProps } from './Link';

export const linkData: LinkProps[] = [
    {
        icon: <HomeIcon />,
        href: '/',
        label: 'Home'
    },
    {
        icon: <WorkIcon />,
        href: '/work',
        label: 'Work'
    },
    {
        icon: <AboutIcon />,
        href: '/about',
        label: 'About'
    },
    {
        icon: <ContactIcon />,
        href: '/contact',
        label: 'Contact'
    }
];
