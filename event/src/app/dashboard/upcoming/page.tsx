"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import EventCard from "@/components/EventCard";
import { ReturnType } from "@/lib/types";

export default function DashboardUpcoming() {
  const { userData } = React.useContext(UserContext);
  const [upcomingEvents, setUpcomingEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userData || !userData.userId) {
        return;
      }
      const res = await fetch(
        `/api/events/user/${userData.userId}?type=upcoming`,
      );
      const { data, error }: ReturnType<Events[]> = await res.json();
      if (error || !data) {
        return;
      }

      setUpcomingEvents(data);
    };

    fetchData();
  }, [userData]);

  return (
    <>
      <p>Dashboard: Upcoming events have signed up for</p>
      <div className="flex flex-wrap gap-4">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        ) : (
          <>
            <h2>No upcoming events...</h2>
          </>
        )}
      </div>
    </>
  );
}
