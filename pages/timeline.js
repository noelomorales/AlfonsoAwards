import { useState } from 'react';
import dynamic from 'next/dynamic';
import eventsData from '../data/timeline.json';
import SourceList from '../components/SourceList';

const TimelineMap = dynamic(() => import('../components/TimelineMap'), { ssr: false });

const events = [...eventsData.events].sort((a, b) => {
  return a.date.localeCompare(b.date) || a.title.localeCompare(b.title);
});

export default function Timeline() {
  const [selected, setSelected] = useState(events[0]);
  return (
    <>
      <h1>Timeline</h1>
      <div className="timeline-container">
        <ul>
          {events.map(ev => (
            <li key={ev.id}>
              <button
                type="button"
                onClick={() => setSelected(ev)}
                aria-pressed={selected.id === ev.id}
              >
                <time dateTime={ev.date}>{ev.date}</time> - {ev.title}
              </button>
              <SourceList sources={ev.sources} />
            </li>
          ))}
        </ul>
        <div className="map">
          <TimelineMap events={events} selected={selected} />
        </div>
      </div>
    </>
  );
}
