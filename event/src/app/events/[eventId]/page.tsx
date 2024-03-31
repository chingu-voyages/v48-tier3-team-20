import { getEventById } from "@/lib/dummyBackend";
import Link from "next/link";
import Image from "next/image";

export default async function EventId({
  params,
}: {
  params: { eventId: string };
}) {
  const { data, error } = await getEventById(params.eventId);
  console.log({ data, error });
  if (error || !data) {
    return <>No events of ID {params.eventId}</>;
  }

  return (
    <div className="flex w-9/12 flex-col border px-5 py-10">
      <p className="mb-5 text-xl">{data.category}</p>

      <div className="flex">
        <div className="h-80 w-80 border bg-red-200">
          <Image
            width={200}
            src={data.img}
            alt="alt text"
            height={150}
            className="rounded-lg object-contain"
          />
        </div>

        <div className="ml-5 flex flex-col">
          <p className="font-bold">{data.eventName}</p>
          <p>Location: {data.location}</p>
          <p>Date: {data.date.toDateString()}</p>
          <p>Event Length</p>
          <p>Age Rating</p>
        </div>
      </div>

      <div className="my-5 flex">
        <button className="mr-2 border px-5 py-2">Buy regular ticket</button>
        <button className="mr-2 border px-5 py-2">Buy VIP ticket</button>
        <button className="border px-5 py-2">Invite your friend</button>
      </div>

      <p>Description</p>

      <p>{data.description}</p>

      <Link className="text-sky-700" href={`/category/${data.category}`}>
        Back to {data.category}
      </Link>
      <Link className="text-sky-700" href="/category">
        Back to Categories
      </Link>
    </div>
  );
}
