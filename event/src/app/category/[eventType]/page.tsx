import Link from "next/link";
import { getEventByCategory } from "@/lib/dummyBackend";
import EventCard from "@/components/EventCard";
import { isType } from "@/lib/utils";
import { CATEGORIES } from "@/lib/constants";

export default async function EventType({
  params,
}: {
  params: { eventType: string };
}) {
  if (params.eventType === "Upcoming" || params.eventType === "Trending") {
    return (
      <div>
        <p>{params.eventType} feature to be build eventually</p>
        <Link className="text-sky-700" href="/">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!isType(params.eventType, CATEGORIES)) {
    return <>Invalid event category</>;
  }

  const { data } = await getEventByCategory(params.eventType);
  if (!data) {
    return <>No events for {params.eventType}</>;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>Category {params.eventType}: </p>
        <div className="flex flex-wrap gap-2">
          {data.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              eventName={event.eventName}
              date={event.date}
              location={event.location}
              img={event.img}
              views={event.weeklyViews}
            />
          ))}

          <EventCard
            id="Testing404Event"
            eventName="Testing404Event"
            date={new Date()}
            location="Click to test 404 event"
            img="https://picsum.photos/id/1/200/150"
            views={0}
          />
        </div>
      </div>
    </>
  );
}
