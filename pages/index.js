import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Alfonso Malavé</h1>
      <p>Explore his biography, timeline, awards, photos, and documents.</p>
      <nav>
        <ul>
          <li><Link href="/biography">Biography</Link></li>
          <li><Link href="/timeline">Timeline</Link></li>
          <li><Link href="/awards">Awards</Link></li>
          <li><Link href="/photos">Photos</Link></li>
          <li><Link href="/documents">Documents</Link></li>
        </ul>
      </nav>
    </>
  );
}
