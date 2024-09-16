import React, { Suspense } from "react";
import EventList from "./EventList";
import EventCard from "./EventCard";
import { getTrending, getUpcoming } from "@/lib/mongo/helper";

const HomePageEvents = async () => {
  const trending = await getTrending(4);
  const upcoming = await getUpcoming(4);
  return (
    <section>
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
    </section>
  );
};

export default HomePageEvents;
