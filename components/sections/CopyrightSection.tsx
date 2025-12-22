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
        <div className="fp-sec-copyright relative z-2 sm:max-w-1/2 sm:-mt-26 md:max-w-full md:mt-0 md:pb-27 max-md:pt-10">
            <div className="container mx-auto">
                <div className="inner relative flex flex-col-reverse sm:flex-col sm:bottom-4 md:bottom-0 md:flex-row items-center sm:items-start md:items-center">
                    <div className="text-[11px] font-semibold max-sm:mt-7">
                        © {year}. All rights reverved Skroling and Kaite.studio
                    </div>
                    <ul className="fp-social-list flex gap-x-2 sm:mt-4 md:mt-0 md:ml-auto">
                        {socialLinks.map(({ name, url }) => (
                            <li key={name}>
                                <a
                                    href={url}
                                    className="px-4 py-[5px] text-xs font-semibold border border-[#9F9F9F] rounded-[20px]"
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