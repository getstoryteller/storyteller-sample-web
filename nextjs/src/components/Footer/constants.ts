import { FacebookIcon, LinkedInIcon, TwitterIcon } from './FooterIcons';

export const FOOTER_LINKS = [
  {
    label: 'Product',
    links: [
      {
        label: 'User Guide',
        href: 'https://www.getstoryteller.com/user-guide',
      },
      { label: 'Company', href: 'https://www.getstoryteller.com/careers' },
      {
        label: 'Contact',
        href: 'mailto:hello@getstoryteller.com?Subject=Hello',
      },
    ],
  },
  {
    label: 'Developers',
    links: [
      {
        label: 'iOS',
        href: 'https://www.getstoryteller.com/documentation/ios/getting-started',
      },
      {
        label: 'Android',
        href: 'https://www.getstoryteller.com/documentation/android/getting-started',
      },
      {
        label: 'Web',
        href: 'https://www.getstoryteller.com/documentation/web/quickstart',
      },
      {
        label: 'React Native',
        href: 'https://www.getstoryteller.com/documentation/react-native/getting-started',
      },
    ],
  },
  {
    label: 'Legal',
    links: [
      {
        label: 'Privacy Policy',
        href: 'https://www.getstoryteller.com/legal/privacy-policy',
      },

      {
        label: 'Terms & Conditions',
        href: 'https://www.getstoryteller.com/legal/terms',
      },
    ],
  },
] as const;

export const FOOTER_SOCIAL_LINKS = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/GetStoryteller',
    icon: TwitterIcon,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/getstoryteller/',
    icon: LinkedInIcon,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/GetStoryteller/',
    icon: FacebookIcon,
  },
] as const;
