import EventCard from "./EventCard";

type EventListProp = {
  category: string;
  events: {
    eventName: string;
    date: Date;
    location: string;
    img: string;
    id: number;
  }[];
};

export default function EventList({ category, events }: EventListProp) {
  return (
    <section>
      <h2>{category}</h2>
      <div>
        {events.map((event) => (
          <EventCard
            key={event.id}
            eventName={event.eventName}
            date={event.date}
            location={event.location}
            img={event.img}
          />
        ))}
      </div>
    </section>
  );
}
