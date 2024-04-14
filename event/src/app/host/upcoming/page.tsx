"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import HostEventCard from "@/components/HostEventCard";

export default function DashboardHostUpcoming() {
  const { userData } = React.useContext(UserContext);

  // to update FE to support pagination
  const [upcomingEvents, setUpcomingEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      console.log(userData);
      if (!userData || !userData.userId) {
        return;
      }
      const res = await fetch(
        `/api/events/host/${userData.userId}?type=upcoming`,
      );
      const { data }: { data: Events[] } = await res.json();
      setUpcomingEvents(data);
    };

    fetchData();
  }, [userData]);

  return (
    <>
      <p>Host Dashboard: Event Management for upcoming events</p>
      <div className="flex flex-wrap gap-4">
        {upcomingEvents.length > 0 ? (
          upcomingEvents.map((event) => (
            <HostEventCard key={event._id} event={event} />
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
