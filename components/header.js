import Link from 'next/link';
import Navigation from './navigation';

export default function Header() {
  return (
    <header className="grid justify-items-center">
      <Link
        href="/"
        className="font-serif text-5xl font-thin tracking-widest text-gray-700 mt-11"
      >
        <h1 className="text-center">ellen lagiewka</h1>
      </Link>
      <sub className="mt-6 font-sans text-[16px] tracking-widest text-gray-400 font-thin">
        freelance producer
      </sub>
      <Navigation />
    </header>
  );
}
