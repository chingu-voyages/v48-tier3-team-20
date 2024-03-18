import Link from 'next/link';

export default function EventId({
  params,
}: {
  params: { eventType: string; eventId: string };
}) {
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
