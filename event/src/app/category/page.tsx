import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import { BASE_URL, FULL_CATEGORIES } from "@/lib/constants";
import dbConnect from "@/lib/mongo";
import Event, { Events } from "@/models/Event";

export const dynamic = "force-dynamic";

export default async function Category() {
  // const res = await fetch(BASE_URL + "/api/events/category", {
  //   cache: "no-store",
  // });
  // const { result }: { result: { [k: string]: Events[] } } = await res.json();
  await dbConnect();
  let result: {} = {};
  for (let category of FULL_CATEGORIES) {
    const events = await Event.aggregate([
      { $match: { category: category } },
      { $addFields: { participantCounts: { $size: "$participants" } } },
      { $sort: { participantCounts: -1 } },
      { $limit: 3 },
    ]);
    if (!events) {
      continue;
    }
    result = { ...result, [category]: events };
  }
  
  if (!result) {
    return <>No result</>;
  }

  return (
    <>
      <div className="flex flex-col gap-2 bg-lime-200">
        <p className="text-4xl font-bold">Categories: </p>
        {Object.entries(result).map(([k, v]) => (
          <EventList text={k} key={k} link={`/category/${k}`}>
            {Array.isArray(v) ? (
              v.map((e) => <EventCard key={e._id} event={e} />)
            ) : (
              <>
                <h2>No events to in {k}</h2>
              </>
            )}
          </EventList>
        ))}
      </div>
    </>
  );
}
