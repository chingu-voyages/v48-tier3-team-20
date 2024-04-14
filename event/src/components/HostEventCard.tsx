"use client";
import Image from "next/image";
import Link from "next/link";
import { Events } from "@/models/Event";

interface HostEventListProp {
  event: Events;
}

export default function HostEventCard({ event }: HostEventListProp) {
  return (
    <div className="relative my-3 max-w-60 bg-green-200 p-5">
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
        <p className="font-bold">{event.name}</p>
        <p>{new Date(event.eventStartDate).toLocaleString()}</p>
        <p>{event.location}</p>
      </Link>
      <Link
        href={`/host/${event._id}`}
        className="absolute right-1 top-1 cursor-pointer rounded-lg bg-gray-300 p-0.5 hover:scale-125 focus-visible:ring"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </Link>
    </div>
  );
}
