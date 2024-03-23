import { getEventById } from "@/lib/dummyBackend";
import Link from "next/link";
import { EventCategory } from "@/lib/types";

export default function EventId({
  params,
}: {
  params: { eventType: string; eventId: string };
}) {
  // check if eventType is EventCategory, if not, return 404 error
  // const {data} = getEventById(params.eventType, params.eventId)
  return (
    <div className="flex flex-col border w-9/12 py-10 px-5">
      <p className="text-xl mb-5">{params.eventType}</p>
      
      <div className="flex">

      <div className="border h-80 w-80">Image goes here</div>
       
       <div className="flex flex-col ml-5">
         <p>Location</p>
         <p>Date</p>
         <p>Event Length</p>
         <p>Age Rating</p>
       </div>
      </div>

      <div className="flex my-5">
          <button className="px-5 py-2 border mr-2">
            Buy regular ticket
          </button>
          <button className="px-5 py-2 border mr-2">
            Buy VIP ticket
          </button>
          <button className="px-5 py-2 border">
            Invite your friend
          </button>
      </div>
     
      <p>Description</p>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit sed consequatur voluptates eos corporis autem repudiandae accusantium id dolore recusandae quae inventore, asperiores mollitia, soluta reiciendis nemo ipsam omnis ea.</p>

      <Link className="text-sky-700" href="/events">
        Back to events
      </Link>
    </div>
  );
}
