import Link from "next/link";
import EventCard from "@/components/EventCard";
import { isType } from "@/lib/utils";
import { BASE_URL, FULL_CATEGORIES } from "@/lib/constants";
import { notFound } from "next/navigation";
import { Events } from "@/models/Event";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (params.category === "Upcoming" || params.category === "Trending") {
    return (
      <div>
        <p>{params.category} feature to be build eventually</p>
        <Link className="text-sky-700" href="/">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!isType(params.category, FULL_CATEGORIES)) {
    notFound();
  }

  const res = await fetch(
    BASE_URL + `/api/events/category/${params.category}`,
    { cache: "no-store" },
  );
  const { data }: { data: Events[] } = await res.json();
  if (!data) {
    return <>No events in {params.category}</>;
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <p>Category {params.category}: </p>
        <div className="flex flex-wrap gap-2">
          {data.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
}
