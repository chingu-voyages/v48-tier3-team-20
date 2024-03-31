import Image from "next/image";
import Link from "next/link";

interface EventListProp {
  id: string;
  eventName: string;
  date: Date;
  location: string;
  img: string;
  views: number;
}

export default function EventCard({
  id,
  eventName,
  date,
  location,
  img,
  views,
}: EventListProp) {
  return (
    <div className="my-3 max-w-60 bg-blue-200 p-5">
      <Link href={`/events/${id}`}>
        <div className="relative aspect-[4/3] w-full">
          <Image
            width={200}
            src={img}
            alt="alt text"
            height={150}
            className="rounded-lg object-contain"
          />
        </div>
        <p className="font-bold">{eventName}</p>
        <p>{date.toDateString()}</p>
        <p>{location}</p>
        <p>Views: {views}</p>
      </Link>
    </div>
  );
}
