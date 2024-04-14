import EventCard from "@/components/EventCard";
// import { BASE_URL } from "@/lib/constants";
import Event, { Events } from "@/models/Event";
import dbConnect from "@/lib/mongo";


export const dynamic = "force-dynamic";

export default async function Search({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  console.log('start search')
  await dbConnect();
  await Event.createIndexes();

  const data = await Event.find({
      $or:[
          { name: {$regex: searchParams.q, $options: "i"}},
          { description: {$regex: searchParams.q, $options: "i"}},
      ],
  })
  // const res = await fetch(BASE_URL + `/api/events/search?q=${searchParams.q}`, {
  //   cache: "no-store",
  // });
  // console.log('res', res)
  // const { data }: { data: Events[] } = await res.json();
  // console.log('data', data)

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
