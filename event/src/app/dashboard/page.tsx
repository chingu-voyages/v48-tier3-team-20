import Link from "next/link";

// dashboard for logged in users to manage events they joined
// also shows recommended events and explore more

export default async function Dashboard() {
  // fetch GET /api/events/user/[userid]
  // render event list with links to /events/[eventId]
  // show list of recommendations and explore more

  return (
    <>
      <p>Dashboard</p>
      <nav className="flex flex-col gap-4">
        <Link className="text-sky-700" href="/dashboard/upcoming">
          List of upcoming events
        </Link>
        <Link className="text-sky-700" href="/dashboard/past">
          List of past events
        </Link>
        <Link className="text-sky-700" href="/category">
          View event catogories
        </Link>
      </nav>
    </>
  );
}
