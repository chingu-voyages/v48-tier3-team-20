import Link from 'next/link';

export default function EventType({
  params,
}: {
  params: { eventType: string };
}) {
  return (
    <>
      <div className='flex gap-2 bg-red-200'>
        <p className='text-xl'> {params.eventType}:</p>
        <div>Image goes here</div>
        <Link className='text-red-800' href={`/events/${params.eventType}/123`}>
          123
        </Link>
        <Link
          className='text-red-800'
          href={`/events/${params.eventType}/abcdef`}
        >
          abcdef
        </Link>
      </div>
    </>
  );
}
