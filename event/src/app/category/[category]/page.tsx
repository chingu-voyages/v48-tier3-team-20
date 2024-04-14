import EventCard from "@/components/EventCard";
import { isType, toTitleCase } from "@/lib/utils";
import { FULL_CATEGORIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { getTrending, getUpcoming, getCategory } from "@/lib/mongo/helper";

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

  const data = isType(category, FULL_CATEGORIES)
    ? await getCategory(category)
    : category === "Upcoming"
      ? await getUpcoming()
      : await getTrending();

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
