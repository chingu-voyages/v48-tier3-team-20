import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import Hero from "@/components/Hero";
import { BASE_URL } from "@/lib/constants";
import { Events } from "@/models/Event";
import React from "react";

export default async function Home() {
  let trending: Events[] = [];
  let upcoming: Events[] = [];
  try {
    const res1 = await fetch(BASE_URL + `/api/events/trending?n=3`, {
      cache: "no-store",
    });
    trending = await res1.json();
    const res2 = await fetch(BASE_URL + `/api/events/upcoming?n=3`, {
      cache: "no-store",
    });
    upcoming = await res2.json();
    console.log({ trending, upcoming });
  } catch (error) {
    const err = error as Error;
    console.log("error caught in page:", error);
    console.log(err.name, err.message);
  }

  return (
    <main className="h-full w-full text-lg outline">
      <Hero/>

      <EventList text="Trending" link="/category/Trending">
        {trending.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </EventList>

      <EventList text="Upcoming" link="/category/Upcoming">
        {upcoming.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </EventList>
    </main>
  );
}
