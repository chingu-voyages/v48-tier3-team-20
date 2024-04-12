import Image from "next/image";
import Link from "next/link";
import { Events } from "@/models/Event";
import { EventType } from "@/lib/types";

interface EventListProp {
  event: Events;
  // id: string;
  // eventName: string;
  // date: Date;
  // location: string;
  // img: string;
  // views: number;
}

export default function EventCard({ event }: EventListProp) {
  return (
    <div className="my-3 max-w-60 bg-blue-200 p-5">
      <Link href={`/events/${event._id}`}>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={event.imgPoster}
            alt="alt text"
            fill={true}
            className="rounded-lg object-cover"
          />
        </div>
        <p className="font-bold">{event.name}</p>
        <p>{new Date(event.eventStartDate).toLocaleString()}</p>
        <p>{event.location}</p>
      </Link>
    </div>
  );
}
