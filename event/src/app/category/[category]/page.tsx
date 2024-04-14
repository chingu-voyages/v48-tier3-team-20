import EventCard from "@/components/EventCard";
import { isType, toTitleCase } from "@/lib/utils";
import { BASE_URL, FULL_CATEGORIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import Event, { Events } from "@/models/Event";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = toTitleCase(params.category);

  if (
    !isType(category, FULL_CATEGORIES) &&
    !["Trending", "Upcoming"].includes(category)
  ) {
    console.log("redirect");
    notFound();
  }

  // const endpoint = isType(category, FULL_CATEGORIES)
  //   ? `/api/events/category/${category}`
  //   : `/api/events/${(category as string).toLowerCase()}`;

  // console.log(endpoint);
  // const res = await fetch(BASE_URL + endpoint, {
  //   cache: "no-store",
  // });
  // const { data }: { data: Events[] } = await res.json();

  const data = isType(category, FULL_CATEGORIES)
    ? await Event.find({ category: params.category })
    : category === 'Upcoming' 
      ? await Event.aggregate([
        { $match: { eventStartDate: { $gt: new Date() } } },
        { $sort: { eventStartDate: 1 } },
      ]) 
      : await Event.aggregate([
        { $match: { eventStartDate: { $gt: new Date() } } },
        { $addFields: { participantCount: { $size: "$participants" } } },
        { $sort: { participantCount: -1 } },
      ]);

  if (!data) {
    return <>No events in {category}</>;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>Category: {category} </p>
        <div className="flex flex-wrap gap-2">
          {data.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
