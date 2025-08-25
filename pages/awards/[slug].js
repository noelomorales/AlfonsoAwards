import awards from '../../data/awards.json';
import SourceList from '../../components/SourceList';
import Link from 'next/link';

export default function Award({ award }) {
  if (!award) {
    return <p>Award not found.</p>;
  }
  return (
    <>
      <h1>{award.name}</h1>
      <p>{award.description}</p>
      {award.devices && award.devices.length > 0 && (
        <ul>
          {award.devices.map((d, i) => (
            <li key={i}>{d.count ? `${d.count} ` : ''}{d.kind}</li>
          ))}
        </ul>
      )}
      <h2>Why he rates it</h2>
      <p>{award.whyHeRates}</p>
      <SourceList sources={award.sources} />
      <p><Link href="/awards">Back to awards</Link></p>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: awards.awards.map(a => ({ params: { slug: a.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const award = awards.awards.find(a => a.slug === params.slug) || null;
  return { props: { award } };
}
