"use client";
import { EventType } from "@/lib/types";
import { cn, getDateTime } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { emptyEvent } from "@/lib/constants";
import Button from "@/components/Button";

export default function EventId({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = React.useState<EventType>(emptyEvent);
  const { userData } = React.useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/events/${params.eventId}`);
      const { data }: { data: EventType } = await res.json();
      console.log(data);
      if (!data) {
        router.push("/404");
        return;
      }

      // get timezone offset
      const offset = new Date().getTimezoneOffset();

      data.eventStartDate = getDateTime(new Date(data.eventStartDate));
      data.lastDateToJoin = getDateTime(new Date(data.lastDateToJoin));

      if (data.eventEndDate) {
        data.eventEndDate = getDateTime(new Date(data.eventEndDate));
      }

      console.log(data);
      setEvent(data);
    };

    fetchData();
  }, [params.eventId, router]);

  const joinEvent = async () => {
    console.log("joining", event.participants);
    const res = await fetch(`/api/events/join/${params.eventId}`, {
      method: "PUT",
    });
    const { data }: { data: EventType } = await res.json();
    console.log(data);
    if (!data) {
      console.log("something went wrong with join event");
      return;
    }
    setEvent((prevState) => ({
      ...prevState,
      participants: data.participants,
    }));
  };

  const leaveEvent = async () => {
    console.log("leaving", event.participants);
    const res = await fetch(`/api/events/leave/${params.eventId}`, {
      method: "PUT",
    });
    const { data }: { data: EventType } = await res.json();
    console.log(data);
    if (!data) {
      console.log("something went wrong with leave event");
      return;
    }
    setEvent((prevState) => ({
      ...prevState,
      participants: data.participants,
    }));
  };

  const isBeforeDeadline =
    new Date().getTime() < new Date(event.lastDateToJoin).getTime();

  const isNotFullyBooked =
    event.participants.length < event.maximumParticipants;

  const isAbleToJoin = isBeforeDeadline && isNotFullyBooked;

  const isParticipant =
    userData && event.participants.some((p) => p._id === userData.userId);

  return (
    <div className="flex w-full max-w-screen-sm flex-col gap-4 border px-5 py-10">
      <h2 className="text-3xl font-bold">{event.name}</h2>
      <div className="relative aspect-[4/3] w-full border bg-red-200">
        <Image
          src={event.imgPoster as string}
          alt="alt text"
          fill={true}
          sizes="500px"
          className="rounded-lg object-cover"
        />
      </div>

      <p>Description:</p>

      <p>{event.description}</p>
      <p>Location: {event.location}</p>
      <p>Start date: {event.eventStartDate.split("T").join(" at ")}</p>
      {event.eventEndDate && (
        <p>End date: {event.eventEndDate.split("T").join(" at ")}</p>
      )}

      <p>
        Participants ({event.participants.length}/{event.maximumParticipants}):
      </p>

      <p>{event.participants.map((p) => p.username).join(", ")}</p>

      {isParticipant ? (
        <>
          <button
            type="button"
            onClick={leaveEvent}
            className="rounded bg-blue-200 py-2"
          >
            Leave Event
          </button>
        </>
      ) : (
        <>
          {isAbleToJoin ? (
            <>
              <button
                type="button"
                onClick={joinEvent}
                className="rounded bg-blue-200 py-2"
              >
                Join Event
              </button>
            </>
          ) : (
            <p>Deadline has passed, unable to join</p>
          )}
        </>
      )}
    </div>
  );
}
