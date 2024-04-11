"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import HostEventCard from "@/components/HostEventCard";

// show list of past events user has created for historical reference

export default function DashboardHostPast() {
  // fetch GET /api/events/host/[hostid]

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
      // const res = await fetch("/api/events/host");
      const res = await fetch(`/api/events/host/${userData.userId}`);
      const body: Events[] = await res.json();

      const now = new Date().getTime();
      const past = body
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
      <p>Host Dashboard: Event Management for past events</p>
      <div className="flex flex-wrap gap-4">
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <HostEventCard key={event._id} event={event} />
          ))
        ) : (
          <>
            <h2>No past events...</h2>
          </>
        )}
      </div>
    </>
  );
}
