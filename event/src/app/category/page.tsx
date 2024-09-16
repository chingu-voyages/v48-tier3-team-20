import EventCard from "@/components/EventCard";
import EventList from "@/components/EventList";
import { getAllCategory } from "@/lib/mongo/helper";

export const dynamic = "force-dynamic";

export default async function Category() {
  const result = await getAllCategory();

  return (
    <>
      <div className="flex flex-col gap-2 my-10">
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
