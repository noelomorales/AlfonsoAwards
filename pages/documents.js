import docs from '../data/documents.json';

export default function Documents() {
  return (
    <>
      <h1>Documents</h1>
      <ul>
        {docs.documents.map(doc => (
          <li key={doc.id} id={doc.id}>
            <a href={doc.file}>{doc.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}
