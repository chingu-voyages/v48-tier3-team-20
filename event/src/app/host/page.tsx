"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import HostEventCard from "@/components/HostEventCard";
import EventList from "@/components/EventList";

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
        .slice(0, 3);
      const upcoming = body
        .filter((e) => new Date(e.eventStartDate).getTime() > now)
        .slice(0, 3);
      console.log(body[0]);
      setPastEvents(past);
      setUpcomingEvents(upcoming);
    };

    fetchData();
  }, [userData]);

  return (
    <>
      <p>Host Dashboard: Event Management</p>
      <nav className="flex flex-col gap-4">
        <EventList text="Manage Upcoming Events" link="/host/upcoming">
          {upcomingEvents.map((event) => (
            <HostEventCard key={event._id} event={event} />
          ))}
        </EventList>
        <EventList text="View Past Events" link="/host/past">
          {pastEvents.map((event) => (
            <HostEventCard key={event._id} event={event} />
          ))}
        </EventList>
        <form>Form for creating new events</form>
      </nav>
    </>
  );
}
