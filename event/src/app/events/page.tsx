import Link from 'next/link';

export default function Events() {
  return (
    <>
      <div className='flex gap-2 bg-lime-200'>
        <p>Events: </p>
        <Link className='text-lime-700' href='/events/fakecategory'>
          FakeCategory
        </Link>
        <Link className='text-lime-700' href='/events/notrealcategory'>
          NotRealCategory
        </Link>
      </div>
    </>
  );
}
