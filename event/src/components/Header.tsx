import Link from 'next/link';

export default function Header() {
  return (
    <nav className='flex gap-2 bg-sky-100'>
      <h1>Header</h1>
      <Link className='text-sky-700' href='/events'>
        Events
      </Link>
      <Link className='text-sky-700' href='/login'>
        Login
      </Link>
      <Link className='text-sky-700' href='/profile'>
        Profile
      </Link>
    </nav>
  );
}
