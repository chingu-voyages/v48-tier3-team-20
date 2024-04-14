import EventCard from "@/components/EventCard";
import { searchEvents } from "@/lib/mongo/helper";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  if (!searchParams.q) {
    redirect("/");
  }

  const data = await searchEvents(searchParams.q);

  if (!data) {
    return <>No results for {searchParams.q}</>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 bg-lime-200">
        <p>Search results for {searchParams.q}: </p>
        <div className="flex flex-wrap gap-2">
          {data.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
