import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import Hero from "@/components/Hero";
import { getAllEvents } from "@/lib/dummyBackend";
import React from "react";

export default async function Home() {
  const { data } = await getAllEvents(); // pretend is await fetch(...)
  const upcoming = data
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);
  const trending = data
    .sort((a, b) => b.weeklyViews - a.weeklyViews)
    .slice(0, 3);
  return (
    <main className="h-full w-full text-lg">
     
     <Hero />
         
      <EventList category="Trending">
        {trending.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            eventName={event.eventName}
            date={event.date}
            location={event.location}
            img={event.img}
            views={event.weeklyViews}
          />
        ))}
      </EventList>

      <EventList category="Upcoming">
        {upcoming.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            eventName={event.eventName}
            date={event.date}
            location={event.location}
            img={event.img}
            views={event.weeklyViews}
          />
        ))}
      </EventList>

    </main>
  );
}
