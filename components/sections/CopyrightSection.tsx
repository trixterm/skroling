import React from 'react';

type SocialLink = {
    name: string;
    url: string;
};

const socialLinks: SocialLink[] = [
    { name: 'Linkedin', url: '#' },
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
];

const CopyrightSection: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <div className="fp-sec-copyright relative z-2 md:pb-27 max-md:pt-8">
            <div className="container mx-auto">
                <div className="inner flex flex-col-reverse md:flex-row items-center">
                    <div className="text-xs max-md:pt-4">
                        © {year}. All rights reserved Monty and Kaite
                    </div>
                    <ul className="fp-social-list flex gap-x-2 md:ml-auto">
                        {socialLinks.map(({ name, url }) => (
                            <li key={name}>
                                <a
                                    href={url}
                                    className="px-4 py-[5px] text-xs border border-[#9F9F9F] rounded-[20px]"
                                >
                                    {name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CopyrightSection;