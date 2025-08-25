import eventsData from '../data/timeline.json';

const events = [...eventsData.events].sort((a, b) => {
  return a.date.localeCompare(b.date) || a.title.localeCompare(b.title);
});

export default function Timeline() {
  return (
    <main>
      <h1>Timeline</h1>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            <time dateTime={ev.date}>{ev.date}</time> - {ev.title}
          </li>
        ))}
      </ul>
    </main>
  );
}
