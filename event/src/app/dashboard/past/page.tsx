"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import EventCard from "@/components/EventCard";
import { ReturnType } from "@/lib/types";

// show list of past events user has joined for historical reference

export default function DashboardPast() {
  // fetch GET /api/events/user/[userid]
  // render event list with links to /events/[eventId]
  // show list of recommendations and explore more

  const { userData } = React.useContext(UserContext);

  // hack: get all events by host, then filter
  // to request from BE an endpoint with pagination
  // to update FE to support pagination
  const [pastEvents, setPastEvents] = React.useState<Events[]>([]);

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
      const past = data
        .filter((e) => new Date(e.eventStartDate).getTime() <= now)
        .sort(
          (a, b) =>
            new Date(a.eventStartDate).getTime() -
            new Date(b.eventStartDate).getTime(),
        );

      setPastEvents(past);
    };

    fetchData();
  }, [userData]);

  return (
    <>
      <p>Dashboard: Past events you have previously joined</p>
      <div className="flex flex-wrap gap-4">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => <EventCard key={event._id} event={event} />)
        ) : (
          <>
            <h2>No past events...</h2>
          </>
        )}
      </div>
    </>
  );
}
