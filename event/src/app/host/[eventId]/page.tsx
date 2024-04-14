"use client";
import { EventType } from "@/lib/types";
import { cn, getDateTime } from "@/lib/utils";
import React, { ChangeEvent, FormEvent } from "react";
import { ACCEPTED_IMAGE_TYPES, CATEGORIES, emptyEvent } from "@/lib/constants";
import Image from "next/image";
import useFullscreen from "@/hooks/useFullscreen";
import { useRouter, notFound } from "next/navigation";
// import { Events } from "@/models/Event";

// dashboard for host to edit/delete events

// issue with input type="file" going from uncontrolled to controlled
// https://stackoverflow.com/questions/76103230/proper-way-to-create-a-controlled-input-type-file-element-in-react

export default function DashboardHostEvent({
  params,
}: {
  params: { eventId: string };
}) {
  const [event, setEvent] = React.useState<EventType>(emptyEvent);

  const [prevImg, setPrevImg] = React.useState<string>("");
  const { fullscreen, popupBoxClass, enterFullscreen, exitFullscreen } =
    useFullscreen();
  const router = useRouter();

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const fetchData = async () => {
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
      setPrevImg(data.imgPoster as string);
    };

    fetchData();
  }, [params.eventId, router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, checked } = e.currentTarget as HTMLInputElement &
      HTMLTextAreaElement;
    if (name === "category") {
      const set = new Set(event.category);

      checked ? set.add(value) : set.delete(value);

      if (value !== "Uncategorized") {
        set.delete("Uncategorized");
      } else {
        set.clear();
        set.add("Uncategorized");
      }

      setEvent((prevState) => ({
        ...prevState,
        category: Array.from(set),
      }));
      return;
    }
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (!files || files.length === 0) {
      setEvent((prevState) => ({
        ...prevState,
        imgPoster: prevImg,
      }));
      return;
    }
    setEvent((prevState) => ({
      ...prevState,
      imgPoster: files[0],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = new FormData(e.currentTarget);
      const poster = form.get("imgPoster") as File;
      if (poster.size === 0) {
        form.delete("imgPoster");
      }
      // console.log("imgposterform", form.get("imgPoster"));
      const res = await fetch(`/api/events/${event._id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const data = await res.json();

      router.push("/host");
    } catch (error) {
      const err = error as Error;
      console.log("error in /host/[eventId]:", err);
    }
  };

  const deleteEvent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/events/${event._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }

      const data = await res.json();
      router.push("/host");
    } catch (error) {
      const err = error as Error;
      console.log("error in /host/[eventId]:", err);
    }
  };

  const categories = [...CATEGORIES, "Uncategorized"];

  return (
    <>
      <p>Host Dashboard: Edit Event {params.eventId}</p>
      <form
        className="w-full max-w-screen-sm space-y-4 px-8"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="name" className="mb-1 block text-gray-800">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={event.name}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="slug" className="mb-1 block text-gray-800">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            id="slug"
            value={event.slug}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-gray-800">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={event.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-1 block text-gray-800">
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={event.location}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="imgPoster" className="mb-1 block text-gray-800">
            Upload Event Poster
          </label>
          <input
            type="file"
            name="imgPoster"
            id="imgPoster"
            ref={inputRef}
            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
            onChange={handleFileChange}
            className="mb-2 w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          />
          {event.imgPoster && typeof event.imgPoster === "string" && (
            <>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={event.imgPoster as string}
                  alt="alt text"
                  fill={true}
                  sizes="500px"
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-xs">
                Current poster: {event.imgPoster as string}
              </p>
            </>
          )}
          {event.imgPoster && typeof event.imgPoster !== "string" && (
            <>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={URL.createObjectURL(event.imgPoster)}
                  alt="alt text"
                  fill={true}
                  sizes="500px"
                  className="rounded-lg object-cover"
                />
              </div>
              <p className="text-xs">
                Preview poster filename: {event.imgPoster.name}
              </p>
            </>
          )}
        </div>

        <div className="rounded-lg border-4 border-gray-500 px-4 py-2">
          <p className="mb-1 block text-lg font-bold text-gray-800">
            Categories
          </p>
          <div className="xs:grid-cols-2 grid gap-3 py-2 sm:grid-cols-3">
            {categories.map((cat) => (
              <div
                key={cat}
                className="flex items-center justify-between gap-2 rounded-lg bg-gray-200 px-4 py-2"
              >
                <label htmlFor={cat} className="mb-1 block text-gray-800">
                  {cat}
                </label>
                <input
                  type="checkbox"
                  name="category"
                  id={cat}
                  value={cat}
                  checked={event.category.includes(cat)}
                  onChange={handleChange}
                  className="scale-150 focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="maximumParticipants"
            className="mb-1 block text-gray-800"
          >
            Maximum participants (0 for unlimited)
          </label>
          <input
            type="number"
            min={0}
            name="maximumParticipants"
            id="maximumParticipants"
            value={event.maximumParticipants}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="eventStartDate" className="mb-1 block text-gray-800">
            Event Start Date
          </label>
          <input
            type="datetime-local"
            name="eventStartDate"
            id="eventStartDate"
            value={event.eventStartDate}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="eventEndDate" className="mb-1 block text-gray-800">
            Event End Date
          </label>
          <input
            type="datetime-local"
            name="eventEndDate"
            id="eventEndDate"
            value={event.eventEndDate}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="lastDateToJoin" className="mb-1 block text-gray-800">
            Last Date To Join
          </label>
          <input
            type="datetime-local"
            name="lastDateToJoin"
            id="eventStartDate"
            value={event.lastDateToJoin}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
        >
          Update
        </button>
        <button
          type="button"
          onClick={enterFullscreen}
          className="relative mb-32 w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none"
        >
          Delete
        </button>
      </form>
      {fullscreen && (
        <div className="fixed inset-0 flex h-screen w-screen items-center justify-center backdrop-blur">
          <div
            className={cn(
              popupBoxClass,
              "confirmDelete w-fit rounded-lg border-4 border-gray-600 bg-gray-200 px-6 py-4",
            )}
          >
            <h2 className="mb-4 text-xl font-bold">Confirm Delete Event?</h2>
            <div className="flex justify-between gap-4">
              <button
                className="w-full rounded-lg bg-red-600 p-2 font-bold text-white hover:scale-110 focus-visible:ring"
                onClick={deleteEvent}
              >
                Yes
              </button>
              <button
                className="w-full rounded-lg bg-gray-600 p-2 font-bold text-white hover:scale-110 focus-visible:ring"
                onClick={exitFullscreen}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
