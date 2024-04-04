import Image from "next/image";
import Link from "next/link";
import { Events } from "@/models/Event";

interface HostEventListProp {
  event: Events;
  // id: string;
  // eventName: string;
  // date: Date;
  // location: string;
  // img: string;
  // views: number;
}

// todo
// built in view and delete button
// if clicked on card, show /host/[eventId]
// if clicked on view, show /event/[eventId]
// if clicked on delete, show delete confirmation

export default function HostEventCard({ event }: HostEventListProp) {
  return (
    <div className="my-3 max-w-60 bg-green-200 p-5">
      <Link href={`/host/${event._id}`}>
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
