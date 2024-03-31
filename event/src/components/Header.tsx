import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full bg-sky-100 px-6 py-8">
      <nav className="flex items-center justify-between gap-4">
        <Link href="/" className="text-sky-700">
          LOGO
        </Link>

        <div className="flex gap-2">
          <Link
            className="cursor-pointer text-sky-700 transition-all hover:font-bold"
            href="/"
          >
            Home
          </Link>
          <Link
            className="cursor-pointer text-sky-700 transition-all hover:font-bold"
            href="/category"
          >
            Category
          </Link>
          <Link
            className="cursor-pointer text-sky-700 transition-all hover:font-bold"
            href="/category"
          >
            Organize
          </Link>
          <Link
            className="cursor-pointer text-sky-700 transition-all hover:font-bold"
            href="/about"
          >
            About
          </Link>
        </div>

        <div className="flex gap-2">
          <Link className="text-sky-700" href="/login">
            Login
          </Link>
          <Link className="text-sky-700" href="/register">
            Register
          </Link>
          <Link className="text-sky-700" href="/profile">
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}
