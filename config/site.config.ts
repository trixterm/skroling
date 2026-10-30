import type { Metadata } from 'next';

export type SocialLink = {
    label: string;
    url: string;
    icon?: string; // name for icon library if needed later
};


export type NavItem = {
    label: string;
    href: string;
    external?: boolean;
};

export interface SiteConfig {
        siteName: string;
        domain: string;
        description: string;

        about: string;
        keywords: string[];
        ogImage: string;
        twitterHandle: string;
        author: string;
        author_img:string;

        theme: {
            default: 'light' | 'dark';
            allowSystem: boolean;
        };
        links: {
            website: string;
            github: string;
            linkedin: string;
            tips: string;
            email: string;
        };
        social: SocialLink[];
        navigation: NavItem[];
        seo: {
        title: string;
        description: string;
        keywords: string[];
        canonical?: string;
        image?: string; // default og image
        imageAlt?: string;
        locale?: string;
        type?: string;
        twitterCard?: string;
        robots?: string;
        themeColor?: string;
  };

}

export const siteConfig: SiteConfig = {
  siteName: 'Skroling',
  domain: 'skroling.dev',
  author: 'Mantas',
  description: 'Freelance creative development for design studios',
  about:
    'Creative development, WordPress integration and animation by Mantas.',
    author_img: '',
    keywords: [
    ''
  ],
  ogImage: '',
  twitterHandle: '',

  theme: {
    default: 'dark',
    allowSystem: true,
  },
  links: {
    website: 'https://skroling.dev',
    github: '',
    linkedin: '',
    tips: '',
    email: 'hello@skroling.dev',
  },
  social: [
    { label: 'GitHub', url: '', icon: 'github' },
    { label: 'LinkedIn', url: '', icon: 'linkedin' },
    { label: 'Website', url: '', icon: 'globe' },
    { label: 'Tip', url: '', icon: 'coffee' },
  ],
  navigation: [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
  ],


  seo: {
    title: 'Skroling',
    description: 'Mantas — freelance creative developer collaborating with design studios on websites, WordPress integration and animation.',
    keywords: [
      'Skroling',
      'Full Stack Developer',
      'Portfolio',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'Framer Motion',
      'Creative Development',
    ],
    canonical: 'https://skroling.dev',
    image: '/images/projects/kaite-hero.jpg',
    imageAlt: "",
    locale: 'en-US',
    type: 'website',
    twitterCard: 'summary_large_image',
    robots: 'index,follow',
    themeColor: '#0f172a',
  },
};

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  const { seo, siteName, domain } = siteConfig;

  const pageTitle = typeof overrides.title === 'string' ? overrides.title : seo.title;
  const description = overrides.description ?? seo.description;
  const canonical = overrides.alternates?.canonical ?? seo.canonical ?? `https://${domain}`;

  const base: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: siteConfig.author, url: siteConfig.links.website }],
    metadataBase: new URL(`https://${domain}`),
    alternates: { canonical: seo.canonical ?? `https://${domain}` },
    openGraph: {
      title: pageTitle,
      description,
      url: canonical,
      siteName,
      images: seo.image ? [seo.image] : [],
      type: seo.type ?? 'website',
      locale: seo.locale,
    },
    twitter: {
      card: seo.twitterCard ?? 'summary_large_image',
      title: pageTitle,
      description,
      images: seo.image ? [seo.image] : [],
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    },
    other: {
      'theme-color': seo.themeColor,
      'og:image:alt': seo.imageAlt,
    },
  } as Metadata;

  return {
    ...base,
    ...overrides,
    openGraph: { ...base.openGraph, ...overrides.openGraph },
    twitter: { ...base.twitter, ...overrides.twitter },
  };
}

export type { Metadata };