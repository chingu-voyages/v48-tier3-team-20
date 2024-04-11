"use client";
import React from "react";
import { UserContext } from "@/context/UserContext";
import { Events } from "@/models/Event";
import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import Link from "next/link";
import { ReturnType } from "@/lib/types";
// dashboard for logged in users to manage events they joined
// also shows recommended events and explore more

export default function Dashboard() {
  // fetch GET /api/events/user/[userid]
  // render event list with links to /events/[eventId]
  // show list of recommendations and explore more

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
      let past, upcoming;
      try {
        const res1 = await fetch(
          `/api/events/user/${userData.userId}?n=3&type=past`,
        );
        past = await res1.json();
        const res2 = await fetch(
          `/api/events/user/${userData.userId}?n=3&type=upcoming`,
        );
        upcoming = await res2.json();
        console.log({ past, upcoming });
      } catch (error) {
        const err = error as Error;
        console.log("error caught in page:", error);
        console.log(err.name, err.message);
      }

      // const res = await fetch(`/api/events/user/${userData.userId}`);
      // const { data, error }: ReturnType<Events[]> = await res.json();
      // console.log(data);
      // if (error || !data) {
      //   return;
      // }
      // const now = new Date().getTime();
      // const past = data
      //   .filter((e) => new Date(e.eventStartDate).getTime() <= now)
      //   .sort(
      //     (a, b) =>
      //       new Date(a.eventStartDate).getTime() -
      //       new Date(b.eventStartDate).getTime(),
      //   )
      //   .slice(0, 3);
      // const upcoming = data
      //   .filter((e) => new Date(e.eventStartDate).getTime() > now)
      //   .sort(
      //     (a, b) =>
      //       new Date(a.eventStartDate).getTime() -
      //       new Date(b.eventStartDate).getTime(),
      //   )
      //   .slice(0, 3);

      setPastEvents(past.data);
      setUpcomingEvents(upcoming.data);
    };

    fetchData();
  }, [userData]);

  return (
    <>
      <p>Dashboard</p>
      <nav className="flex flex-col gap-4">
        <EventList text="Manage Upcoming Events" link="/dashboard/upcoming">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <>
              <h2>No upcoming events...</h2>
            </>
          )}
        </EventList>
        <EventList text="View Past Events" link="/dashboard/past">
          {pastEvents.length > 0 ? (
            pastEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <>
              <h2>No past events...</h2>
            </>
          )}
        </EventList>
      </nav>

      <Link className="text-sky-700" href="/category">
        View event catogories
      </Link>
    </>
  );
}
