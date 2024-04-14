"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import EventCard from "@/components/EventCard";
import { ReturnType } from "@/lib/types";

export default function DashboardPast() {
  const { userData } = React.useContext(UserContext);

  // to update FE to support pagination
  const [pastEvents, setPastEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userData || !userData.userId) {
        return;
      }
      const res = await fetch(`/api/events/user/${userData.userId}?type=past`);
      const { data, error }: ReturnType<Events[]> = await res.json();
      if (error || !data) {
        return;
      }

      setPastEvents(data);
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
