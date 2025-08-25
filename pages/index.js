import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Alfonso Malavé</h1>
      <nav>
        <ul>
          <li><Link href="/biography">Biography</Link></li>
          <li><Link href="/timeline">Timeline &amp; Map</Link></li>
          <li><Link href="/photos">Photo Gallery</Link></li>
        </ul>
      </nav>
    </main>
  );
}
