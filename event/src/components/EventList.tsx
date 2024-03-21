import Link from "next/link";
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
    <section className="m-1">
      <div className="flex items-center justify-center">
        <h2 className="mr-4 text-2xl font-bold">{category}</h2>
        <Link
          href="#"
          className="flex items-center rounded-lg border px-2 py-1 text-sm"
        >
          View more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </Link>
      </div>

      <div className="flex justify-center">
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
