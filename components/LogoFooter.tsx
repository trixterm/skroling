import React from 'react';
import Image from 'next/image';

// Jei SVG labai didelis, naudokite Image komponentą su optimizacijomis
const LogoFooter: React.FC = () => {
  return (
    <div className="fp-logo-footer">
      <div className="fp-img-wrap relative overflow-hidden">
        <Image
          src="/images/logo-skroling-light-2.svg"
          width={540}
          height={144}
          alt="Logo Skroling"
          priority
          className="w-[540px] h-[144px]"
        />
        
        <div className="fp-logo-letters absolute w-[76.5px] h-[76.5px] top-[33px] left-[225px] overflow-hidden">
          <div className="fp-logo-letters-anim w-[76.5px] h-[184.5px]">
            <Image
              className="mb-[3px]"
              src="/images/logo-skroling-letter-light.svg"
              width={76.5}
              height={76.5}
              alt=""
              aria-hidden="true"
            />
            <Image
              className="mb-[3px]"
              src="/images/logo-skroling-letter-light.svg"
              width={76.5}
              height={76.5}
              alt=""
              aria-hidden="true"
            />
            <Image
              className="mb-[3px]"
              src="/images/logo-skroling-letter-light.svg"
              width={76.5}
              height={76.5}
              alt=""
              aria-hidden="true"
            />
            <Image
              src="/images/logo-skroling-letter-light.svg"
              width={76.5}
              height={76.5}
              alt=""
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LogoFooter);