"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import HostEventCard from "@/components/HostEventCard";

// show list of upcoming events user has created

export default function DashboardHostUpcoming() {
  // fetch GET /api/events/host/[hostid]

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
      // const res = await fetch("/api/events/host");
      const res = await fetch(`/api/events/host/${userData.userId}`);
      const body: Events[] = await res.json();

      const now = new Date().getTime();
      const upcoming = body.filter(
        (e) => new Date(e.eventStartDate).getTime() > now,
      );

      setUpcomingEvents(upcoming);
    };

    fetchData();
  }, [userData]);

  return (
    <>
      <p>Host Dashboard: Event Management for upcoming events</p>
      <div className="flex flex-wrap gap-4">
        {upcomingEvents.map((event) => (
          <HostEventCard key={event._id} event={event} />
        ))}
      </div>
    </>
  );
}
