"use client";
import { EventType } from "@/lib/types";
import { getDateTime } from "@/lib/utils";
import React, { ChangeEvent, FormEvent } from "react";
import { ACCEPTED_IMAGE_TYPES, CATEGORIES } from "@/lib/constants";
import Image from "next/image";
// import { Events } from "@/models/Event";

// dashboard for host to edit/delete events

export default function DashboardHostEvent({
  params,
}: {
  params: { eventId: string };
}) {
  // fetch GET /api/events/[eventid]
  // render form to edit events
  // get categories/data from BE to show in dropdown
  // form onSubmit fetch PUT /api/events/[eventid]
  // delete button (with confirmation popup) fetch DELETE /api/events/[eventid]

  const [event, setEvent] = React.useState<EventType>({
    _id: "",
    name: "",
    slug: "",
    description: "",
    location: "",
    category: [],
    eventStartDate: "",
    lastDateToJoin: "",
    maximumParticipants: 0,
    host: "",
    participants: [],
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/events/${params.eventId}`);
      const { data }: { data: EventType } = await res.json();
      console.log(data);

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
  }, [params.eventId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.currentTarget as HTMLInputElement &
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
    if (files) {
      console.log(files[0]);
      setEvent((prevState) => ({
        ...prevState,
        imgPoster: files[0],
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const form = new FormData(e.currentTarget);
      const res = await fetch(`/api/events/${event._id}`, {
        method: "PUT",
        body: form,
      });

      if (!res.ok) {
        console.log("response not ok");
      }

      const data = await res.json();
      console.log(data);

      console.log(event);
    } catch (error) {
      const err = error as Error;
      console.log("error in /host/[eventId]:", err);
    }
  };

  const categories = [...CATEGORIES, "Uncategorized"];

  const posterIsString = typeof event.imgPoster === "string";

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
          {event.imgPoster && typeof event.imgPoster === "string" && (
            <>
              <Image
                width={200}
                src={event.imgPoster as string}
                alt="alt text"
                height={150}
                className="rounded-lg object-contain"
              />
              <p>{event.imgPoster as string}</p>
            </>
          )}
          {event.imgPoster && typeof event.imgPoster !== "string" && (
            <>
              <Image
                width={200}
                src={URL.createObjectURL(event.imgPoster)}
                alt="alt text"
                height={150}
                className="rounded-lg object-contain"
              />
              <p>Poster file {event.imgPoster.name}</p>
            </>
          )}
          <label htmlFor="imgPoster" className="mb-1 block text-gray-800">
            Upload Event Poster
          </label>
          <input
            type="file"
            name="imgPoster"
            id="imgPoster"
            accept={ACCEPTED_IMAGE_TYPES.join(", ")}
            onChange={handleFileChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <p className="mb-1 block text-gray-800">Categories</p>
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center justify-center gap-2">
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
                  className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
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
      </form>
    </>
  );
}
