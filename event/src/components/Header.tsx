import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full justify-between bg-sky-100 px-6 py-4">
      <Link href="/" className="text-sky-700">
        LOGO
      </Link>
      <nav className="flex gap-4">
        <Link className="text-sky-700" href="/events">
          Events
        </Link>
        <Link className="text-sky-700" href="/login">
          Login
        </Link>
        <Link className="text-sky-700" href="/profile">
          Profile
        </Link>
      </nav>
    </header>
  );
}
