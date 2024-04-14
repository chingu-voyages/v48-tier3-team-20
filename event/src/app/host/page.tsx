"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import HostEventCard from "@/components/HostEventCard";
import EventList from "@/components/EventList";
import Link from "next/link";

// dashboard for hosts to manage events host has created
// also shows a form to create new events

export default function DashboardHost() {
  // fetch GET /api/events/host/[hostid]
  // render event list with edit button and delete button
  // edit button links to /host/[eventId]
  // delete button (with confirmation popup) fetch DELETE /api/events/[eventid]
  // shows a form for creating new event
  // form onSubmit fetch POST /api/events

  const { userData } = React.useContext(UserContext);

  // hack: get all events by host, then sort into past/upcoming
  // to request from BE an endpoint to handle this
  const [pastEvents, setPastEvents] = React.useState<Events[]>([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState<Events[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
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
        )
        .slice(0, 3);
      const upcoming = body
        .filter((e) => new Date(e.eventStartDate).getTime() > now)
        .sort(
          (a, b) =>
            new Date(a.eventStartDate).getTime() -
            new Date(b.eventStartDate).getTime(),
        )
        .slice(0, 3);
      setPastEvents(past);
      setUpcomingEvents(upcoming);
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
        <EventList text="View Past Events" link="/host/past">
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
