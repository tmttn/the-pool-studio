'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="mt-20 font-sans text-[11px] font-bold">
      <ul className="space-x-6">
        <li className="inline-block after:content-['/'] after:ml-6">
          <Link
            href="/featured-work"
            className={
              pathname === '/featured-work' || pathname?.startsWith('/featured-work/')
                ? 'text-indigo-600'
                : ''
            }
          >
            featured work
          </Link>
        </li>
        <li className="inline-block">
          <Link
            href="/contact-about"
            className={pathname === '/contact-about' ? 'text-indigo-600' : ''}
          >
            contact + about
          </Link>
        </li>
      </ul>
    </nav>
  );
}
