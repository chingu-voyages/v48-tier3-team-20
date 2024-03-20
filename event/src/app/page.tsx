"use client";
import EventList from "@/components/EventList";

const data = [
  {
    id: 1,
    category: "trendy weekly events",
    events: [
      {
        id: 1,
        eventName: "event1",
        date: new Date(),
        location: "88 garden",
        img: "image-source-url",
      },
      {
        id: 2,
        eventName: "event2",
        date: new Date(),
        location: "Marden",
        img: "image-source-url",
      },
    ],
  },
  {
    id: 2,
    category: "upcoming events",
    events: [
      {
        id: 1,
        eventName: "event12",
        date: new Date(),
        location: "88 garden",
        img: "image-source-url",
      },
      {
        id: 2,
        eventName: "event2",
        date: new Date(),
        location: "Marden",
        img: "image-source-url",
      },
    ],
  },
  {
    id: 3,
    category: "music events",
    events: [
      {
        id: 1,
        eventName: "event3",
        date: new Date(),
        location: "88 garden",
        img: "image-source-url",
      },
      {
        id: 2,
        eventName: "event2",
        date: new Date(),
        location: "Marden",
        img: "image-source-url",
      },
    ],
  },
];

export default function Home() {
  return (
    <main className="h-full w-full text-lg outline">
      <div className="flex flex-col items-center">
        <h1 className="p-5 text-3xl">Find your favourite event</h1>
        <p>Invite your best friends and make them happy</p>
        <input
          className="w-80 rounded-lg px-8 py-2"
          type="text"
          placeholder="enter keyword or location"
        />
      </div>

      {data.map((card) => (
        <EventList
          key={card.id}
          category={card.category}
          events={card.events}
        />
      ))}
    </main>
  );
}
