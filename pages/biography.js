import Head from 'next/head';
import bio from '../data/biography.json';

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
      <main>
        <h1>{bio.fullName}</h1>
        <p>{bio.summary}</p>
      </main>
    </>
  );
}
