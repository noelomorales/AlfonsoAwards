import Link from 'next/link';
import awards from '../data/awards.json';
import SourceList from '../components/SourceList';

export default function Awards() {
  return (
    <>
      <h1>Awards</h1>
      <ul>
        {awards.awards.map(award => (
          <li key={award.slug}>
            <Link href={`/awards/${award.slug}`}>{award.name}</Link>
            <SourceList sources={award.sources} />
          </li>
        ))}
      </ul>
    </>
  );
}
