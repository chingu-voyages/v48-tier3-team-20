import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import Hero from "@/components/Hero";
import { BASE_URL } from "@/lib/constants";
import { Events } from "@/models/Event";
import React from "react";

export const dynamic = "force-dynamic";

export default async function Home() {
  let trending: Events[] = [];
  let upcoming: Events[] = [];
  try {
    console.log(BASE_URL + `/api/events/trending?n=3`)
    const res1 = await fetch(BASE_URL + `/api/events/trending?n=3`, {
      cache: "no-store",
    });
    console.log(res1)
    const { data: trendingData }: { data: Events[] } = await res1.json();
    trending = trendingData;
    const res2 = await fetch(BASE_URL + `/api/events/upcoming?n=3`, {
      cache: "no-store",
    });
    const { data: upcomingData }: { data: Events[] } = await res2.json();
    upcoming = upcomingData;
  } catch (error) {
    const err = error as Error;
    console.log("error caught in page:", error);
    console.log(err.name, err.message);
  }

  return (
    <main className="h-full w-full text-lg outline">
      <Hero />

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
