"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import HostEventCard from "@/components/HostEventCard";
import EventList from "@/components/EventList";
import Link from "next/link";

export default function DashboardHost() {
  const { userData } = React.useContext(UserContext);

  const [pastEvents, setPastEvents] = React.useState<Events[]>([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      if (!userData || !userData.userId) {
        return;
      }

      let past, upcoming;
      try {
        const res1 = await fetch(
          `/api/events/host/${userData.userId}?n=3&type=past`,
        );
        past = await res1.json();
        const res2 = await fetch(
          `/api/events/host/${userData.userId}?n=3&type=upcoming`,
        );
        upcoming = await res2.json();
      } catch (error) {
        const err = error as Error;
        console.log("error caught in page:", error);
        console.log(err.name, err.message);
      }

      setPastEvents(past.data);
      setUpcomingEvents(upcoming.data);
    };

    fetchData();
  }, [userData]);

  return (
    <div className="max-w-screen-sm">
      <div className="my-4 flex w-full items-center justify-between">
        <p className="text-xl font-bold">
          Host Dashboard for {userData?.username}
        </p>
        <Link
          href="/host/new"
          className="w-fit rounded-md bg-blue-500 px-6 py-2 text-center text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
        >
          Create new event
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <EventList text="Manage Upcoming Events" link="/host/upcoming">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <HostEventCard key={event._id} event={event} />
            ))
          ) : (
            <>
              <h2>No upcoming events...</h2>
            </>
          )}
        </EventList>
        <EventList text="Manage Past Events" link="/host/past">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <HostEventCard key={event._id} event={event} />
            ))
          ) : (
            <>
              <h2>No past events...</h2>
            </>
          )}
        </EventList>
      </div>
    </div>
  );
}
