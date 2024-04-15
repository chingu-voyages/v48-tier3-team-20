import Image from "next/image";
import Link from "next/link";
import { Events } from "@/models/Event";
import { EventType } from "@/lib/types";

interface EventListProp {
  event: Events;
}

export default function EventCard({ event }: EventListProp) {
  return (
    <div className="my-3 sm:max-w-80 p-5 m-2 rounded-lg">
      <Link href={`/events/${event._id}`}>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={event.imgPoster ?? "/placeholder-image.png"}
            alt="alt text"
            fill={true}
            sizes="500px"
            className="rounded-lg object-cover"
          />
        </div>
        <p className="font-bold my-2">{event.name}</p>
        <p>{new Date(event.eventStartDate).toLocaleString()}</p>
        <p className=" text-stone-700">{event.location}</p>
      </Link>
    </div>
  );
}
