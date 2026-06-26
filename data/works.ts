export type Work = {
    slug: string;
    title: string;
    description: string;
    heroImage: string;
};

export const works: Work[] = [
    {
        slug: "lukdeira",
        title: "Lukdeira",
        description: "Branding ir web projektas 1",
        heroImage: "/images/website-01.jpg",
    },
    {
        slug: "kaite",
        title: "Kaitė",
        description: "Vizualinis identitetas",
        heroImage: "/images/website-02.jpg",
    },
];