import EventCard from "@/components/EventCard";
import { BASE_URL } from "@/lib/constants";
import { Events } from "@/models/Event";

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const res = await fetch(BASE_URL + `/api/events/search?q=${searchParams.q}`, {
    cache: "no-store",
  });
  const { data }: { data: Events[] } = await res.json();
  console.log(data);

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
