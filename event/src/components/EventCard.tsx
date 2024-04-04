import Image from "next/image";
import Link from "next/link";
import { Events } from "@/models/Event";

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
            width={200}
            src={event.imgPoster}
            alt="alt text"
            height={150}
            className="rounded-lg object-contain"
          />
        </div>
        <p className="font-bold">{event.name}</p>
        <p>{new Date(event.eventStartDate).toLocaleString()}</p>
        <p>{event.location}</p>
      </Link>
    </div>
  );
}
