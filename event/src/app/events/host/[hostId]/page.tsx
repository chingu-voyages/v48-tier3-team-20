"use client";
import React from "react";
import { Events } from "@/models/Event";
import EventCard from "@/components/EventCard";

export default function EventHost({ params }: { params: { hostId: string } }) {
  const [events, setEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/events/host/${params.hostId}?type=upcoming`,
      );
      const { data }: { data: Events[] } = await res.json();
      setEvents(data);
    };

    fetchData();
  }, [params.hostId]);

  return (
    <>
      <p>Upcoming events hosted by {params.hostId}</p>
      <div className="flex flex-wrap gap-4">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <>
            <h2>No upcoming events by this host.</h2>
          </>
        )}
      </div>
    </>
  );
}
