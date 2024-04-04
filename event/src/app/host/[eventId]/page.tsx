"use client";
import React, { ChangeEvent, FormEvent } from "react";
// import { Events } from "@/models/Event";

// dashboard for host to edit/delete events

type Events = {
  _id: string;
  name: string;
  slug: string; // has to be unique, default to name.split(' ').join('-')?
  description: string;
  location: string;
  imgPoster: string; // image url
  category: string[];
  eventStartDate: string;
  eventStartTime?: string;
  eventEndDate?: string;
  eventEndTime?: string;
  lastDateToJoin: string;
  lastDateToJoinTime?: string;
  maximumParticipants: number;
  host: string;
  participants: string[];
};

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

  const [event, setEvent] = React.useState<Events>({
    _id: "",
    name: "",
    slug: "",
    description: "",
    location: "",
    imgPoster: "",
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
      const { data }: { data: Events } = await res.json();

      const offset = new Date().getTimezoneOffset();

      // dealing with dates is a pain...
      // https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
      const start = new Date(
        new Date(data.eventStartDate).getTime() - offset * 60 * 1000,
      ).toISOString();
      // const lastDate = new Date(data.lastDateToJoin).getTime();

      // data.eventStartDate = start.split("T")[0];
      // data.eventStartTime = startDate.toLocaleTimeString().split(" ")[0];
      // data.lastDateToJoin = lastDate.toLocaleDateString();
      // data.lastDateToJoinTime = lastDate.toLocaleTimeString().split(" ")[0];
      // if (data.eventEndDate) {
      //   const endDate = new Date(data.eventEndDate);
      //   data.eventEndDate = endDate.toLocaleDateString();
      //   data.eventEndTime = endDate.toLocaleTimeString().split(" ")[0];
      // }

      console.log(data);
      setEvent(data);
    };

    fetchData();
  }, [params.eventId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.currentTarget;
    setEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(event);
  };

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
          <label htmlFor="category" className="mb-1 block text-gray-800">
            Location
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={event.category}
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
            type="date"
            name="eventStartDate"
            id="eventStartDate"
            value={event.eventStartDate}
            onChange={handleChange}
            className="w-full rounded-md bg-gray-200 px-3 py-2 text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="eventStartTime" className="mb-1 block text-gray-800">
            Event Start Time
          </label>
          <input
            type="time"
            name="eventStartTime"
            id="eventStartTime"
            value={event.eventStartTime}
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
