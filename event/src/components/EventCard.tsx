import Image from "next/image";

interface EventListProp {
  eventName: string;
  date: Date;
  location: string;
  img: string;
}

export default function EventCard({
  eventName,
  date,
  location,
  img,
}: EventListProp) {
  return (
    <div className="my-3 max-w-60 p-5">
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
    </div>
  );
}
