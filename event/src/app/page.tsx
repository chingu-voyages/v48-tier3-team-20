import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import Hero from "@/components/Hero";
import React from "react";
import { getTrending, getUpcoming } from "@/lib/mongo/helper";

export const dynamic = "force-dynamic";

export default async function Home() {
  const trending = await getTrending(3);
  const upcoming = await getUpcoming(3);

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
