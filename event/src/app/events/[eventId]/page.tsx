"use client";
import { EventType } from "@/lib/types";
import { getDateTime } from "@/lib/utils";
import React from "react";
import Image from "next/image";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { emptyEvent } from "@/lib/constants";
import Link from "next/link";

export default function EventId({ params }: { params: { eventId: string } }) {
  const [event, setEvent] = React.useState<EventType>(emptyEvent);
  const { userData } = React.useContext(UserContext);
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/events/${params.eventId}`);
        const { data }: { data: EventType } = await res.json();
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

        setEvent(data);
      } catch (error) {
        const err = error as Error;
        console.log("error caught:", error);
        console.log(err.name, err.message);
      }
    };

    fetchData();
  }, [params.eventId, router]);

  const joinEvent = async () => {
    const res = await fetch(`/api/events/join/${params.eventId}`, {
      method: "PUT",
    });
    const { data }: { data: EventType } = await res.json();
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
    const res = await fetch(`/api/events/leave/${params.eventId}`, {
      method: "PUT",
    });
    const { data }: { data: EventType } = await res.json();
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

  const isAbleToJoin = isBeforeDeadline && isNotFullyBooked && userData?.userId;

  const isParticipant =
    userData && event.participants.some((p) => p._id === userData.userId);

  return (
    <div className="flex w-full max-w-screen-sm flex-col gap-4  px-5 py-10">
      <h2 className="text-3xl font-bold">{event.name}</h2>
      <div className="relative aspect-[4/3] w-full border bg-red-200">
        <Image
          src={(event.imgPoster as string) ?? "/placeholder-image.png"}
          alt="alt text"
          fill={true}
          sizes="500px"
          className="rounded-lg object-cover"
        />
      </div>

      <p className="font-semibold">Description:</p>

      <p>{event.description}</p>
      <div className="flex items-center gap-2">
        <p className="font-semibold">Hosted by:</p>
        <Link
          href={`/events/host/${event.host._id}`}
          className="flex gap-2 rounded-xl bg-gray-200 px-3 py-2 hover:bg-gray-300"
        >
          <div className="relative w-6">
            <Image
              src={event.host.profile_pic ?? "/stock-user.jpeg"}
              alt="host profile pic"
              sizes="200px"
              fill={true}
              className="rounded-full object-cover"
            />
          </div>
          {event.host.username}
        </Link>
      </div>
      <p> <span className="font-semibold">Location: </span> {event.location}</p>
      <p> <span className="font-semibold">Start date: </span>  {event.eventStartDate.split("T").join(" at ")}</p>
      {event.eventEndDate && (
        <p><span className="font-semibold">End date: </span> {event.eventEndDate.split("T").join(" at ")}</p>
      )}
      
      <p><span className="font-semibold">Deadline to join:</span> {event.lastDateToJoin.split("T").join(" at ")}</p>

      <p>
      <span className="font-semibold">Participants:</span> ({event.participants.length}/{event.maximumParticipants}):
      </p>

      <div className="flex gap-4">
        {event.participants.map((p) => (
          <Link
            href={`/profile/${p.username}`}
            key={p._id}
            className="flex gap-2 rounded-xl bg-gray-200 px-3 py-2 hover:bg-gray-300"
          >
            <div className="relative w-6">
              <Image
                src={p.profile_pic ?? "/stock-user.jpeg"}
                alt="participant profile pic"
                sizes="200px"
                fill={true}
                className="rounded-full object-cover"
              />
            </div>
            {p.username}
          </Link>
        ))}
      </div>

      {isParticipant ? (
        <button
          type="button"
          onClick={leaveEvent}
          className="rounded  bg-rose-200 hover:bg-rose-100  py-2"
        >
          Leave Event
        </button>
      ) : (
        <>
          {isAbleToJoin ? (
            <>
              <button
                type="button"
                onClick={joinEvent}
                className="rounded bg-rose-200 hover:bg-rose-100 py-2"
              >
                Join Event
              </button>
            </>
          ) : (
            <>
              {isBeforeDeadline && isNotFullyBooked ? (
                <Link
                  href={`/login?redirect=${window.location.pathname}`}
                  className="rounded bg-rose-200 hover:bg-rose-100 py-2 text-center"
                >
                  Login to join
                </Link>
              ) : (
                <p className="rounded  bg-rose-200 hover:bg-rose-100 px-4 py-2 text-center">
                  {!isBeforeDeadline && "Deadline to join has already passed. "}
                  {!isNotFullyBooked && "Event fully booked! "}
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
