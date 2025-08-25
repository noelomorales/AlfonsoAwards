import Image from 'next/image';
import photosData from '../data/photos.json';

export default function Photos() {
  return (
    <main>
      <h1>Photo Gallery</h1>
      <ul>
        {photosData.photos.map(photo => (
          <li key={photo.id}>
            <Image src={photo.file} alt={photo.alt} width={400} height={300} />
            <p>{photo.caption}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
