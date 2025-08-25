import docs from '../data/documents.json';

export default function SourceList({ sources }) {
  if (!sources || sources.length === 0) return null;
  return (
    <ul className="sources">
      {sources.map((s, idx) => {
        const doc = docs.documents.find(d => d.id === s.ref);
        const label = doc ? doc.title : s.ref;
        const page = s.page ? `, p.${s.page}` : '';
        return (
          <li key={idx}>
            <a href={`/documents#${s.ref}`} className="source-chip">
              {label}{page}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
