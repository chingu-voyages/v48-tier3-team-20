import EventList from "@/components/EventList";

import { getAllEvents } from "@/lib/dummyBackend";
import { cn } from "@/lib/utils";
import React from "react";

export default async function Home() {
  const { data } = getAllEvents(); // pretend is await fetch(...)
  return (
    <main className="h-full w-full text-lg outline">
      <div className="mb-10 flex flex-col items-center gap-4 pt-12">
        <h1 className="text-3xl">Find your favourite event</h1>
        <p>Invite your best friends and make them happy</p>
        <div className="relative flex">
          <input
            className="w-80 rounded-lg py-2 pl-8 pr-16"
            type="text"
            placeholder="enter keyword or location"
          />
          <button
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "rounded-3xl bg-slate-200 px-2 py-1 text-sm hover:ring",
            )}
          >
            GO
          </button>
        </div>
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
