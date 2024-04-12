"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import EventCard from "@/components/EventCard";
import { ReturnType } from "@/lib/types";

// show list of upcoming events user has joined

export default function DashboardUpcoming() {
  // fetch GET /api/events/user/[userid]
  // render event list with links to /events/[eventId]
  // show list of recommendations and explore more

  const { userData } = React.useContext(UserContext);

  // hack: get all events by host, then filter
  // to request from BE an endpoint with pagination
  // to update FE to support pagination
  const [upcomingEvents, setUpcomingEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log(userData);
      if (!userData || !userData.userId) {
        return;
      }
      const res = await fetch(`/api/events/user/${userData.userId}`);
      const { data, error }: ReturnType<Events[]> = await res.json();
      console.log(data);
      if (error || !data) {
        return;
      }
      const now = new Date().getTime();
      const upcoming = data
        .filter((e) => new Date(e.eventStartDate).getTime() > now)
        .sort(
          (a, b) =>
            new Date(a.eventStartDate).getTime() -
            new Date(b.eventStartDate).getTime(),
        );

      setUpcomingEvents(upcoming);
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
