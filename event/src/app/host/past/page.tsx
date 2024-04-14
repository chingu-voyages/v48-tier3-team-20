"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import HostEventCard from "@/components/HostEventCard";

export default function DashboardHostPast() {
  const { userData } = React.useContext(UserContext);

  // to update FE to support pagination
  const [pastEvents, setPastEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userData || !userData.userId) {
        return;
      }
      const res = await fetch(`/api/events/host/${userData.userId}?type=past`);
      const { data }: { data: Events[] } = await res.json();
      setPastEvents(data);
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
