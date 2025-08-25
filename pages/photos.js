import Image from 'next/image';
import photosData from '../data/photos.json';
import SourceList from '../components/SourceList';

export default function Photos() {
  return (
    <>
      <h1>Photo Gallery</h1>
      <ul>
        {photosData.photos.map(photo => (
          <li key={photo.id}>
            <Image
              src={photo.file}
              alt={photo.alt}
              width={400}
              height={300}
              loading="lazy"
            />
            <p>{photo.caption}</p>
            <SourceList sources={photo.sources} />
          </li>
        ))}
      </ul>
    </>
  );
}