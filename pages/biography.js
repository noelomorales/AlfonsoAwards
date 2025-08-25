import Head from 'next/head';
import Image from 'next/image';
import bio from '../data/biography.json';
import SourceList from '../components/SourceList';

export default function Biography() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": bio.fullName,
    "birthDate": bio.birth.date,
    "birthPlace": bio.birth.place,
    "jobTitle": bio.service.highestRank
  };

  return (
    <>
      <Head>
        <title>Biography</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <h1>{bio.fullName}</h1>
      <Image
        src={bio.portrait}
        alt={`Portrait of ${bio.fullName}`}
        width={400}
        height={300}
        priority
      />
      <p>{bio.summary}</p>
      <SourceList sources={bio.sources} />
    </>
  );
}
