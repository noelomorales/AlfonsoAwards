import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function FlyTo({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates) {
      map.setView([coordinates[1], coordinates[0]], 5);
    }
  }, [coordinates, map]);
  return null;
}

export default function TimelineMap({ events, selected }) {
  const center = selected.location && selected.location.coordinates
    ? [selected.location.coordinates[1], selected.location.coordinates[0]]
    : [0, 0];
  return (
    <MapContainer center={center} zoom={2} style={{ height: '400px', width: '100%' }} aria-label="Event locations">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {events.filter(e => e.location && e.location.coordinates).map(e => (
        <Marker
          key={e.id}
          position={[e.location.coordinates[1], e.location.coordinates[0]]}
          icon={icon}
        >
          <Popup>{e.title}</Popup>
        </Marker>
      ))}
      <FlyTo coordinates={selected.location && selected.location.coordinates} />
    </MapContainer>
  );
}
