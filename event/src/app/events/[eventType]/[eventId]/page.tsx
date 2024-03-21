import { getEventById } from '@/lib/dummyBackend';
import Link from 'next/link';
import { EventCategory } from '@/lib/types';

export default function EventId({
  params,
}: {
  params: { eventType: string; eventId: string };
}) {
  // check if eventType is EventCategory, if not, return 404 error
  // const {data} = getEventById(params.eventType, params.eventId)
  return (
    <div>
      <p>Event Catogory - {params.eventType}</p>
      <p>Event ID - {params.eventId}</p>
      <Link className='text-sky-700' href='/events'>
        Back to events
      </Link>
    </div>
  );
} 
