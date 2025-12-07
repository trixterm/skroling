'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function getBodyClass(pathname: string) {
  if (pathname === '/') return 'page-home';

  const slug = pathname
    .replace(/^\/|\/$/g, '')
    .replace(/\//g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

  return `page-${slug || 'home'}`;
}

export function BodyClassProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const cls = getBodyClass(pathname || '/');

    document.body.classList.forEach((c) => {
      if (c.startsWith('page-')) document.body.classList.remove(c);
    });

    document.body.classList.add(cls);
  }, [pathname]);

  return <>{children}</>;
}