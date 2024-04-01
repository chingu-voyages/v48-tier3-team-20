import Link from "next/link";

// dashboard for hosts to manage events host has created
// also shows a form to create new events

export default async function DashboardHost() {
  // fetch GET /api/events/host/[hostid]
  // render event list with edit button and delete button
  // edit button links to /host/[eventId]
  // delete button (with confirmation popup) fetch DELETE /api/events/[eventid]
  // shows a form for creating new event
  // form onSubmit fetch POST /api/events

  return (
    <>
      <p>Host Dashboard: Event Management</p>
      <nav className="flex flex-col gap-4">
        <Link className="text-sky-700" href="/host/upcoming">
          List of upcoming events (contains edit/delete button overlay)
        </Link>
        <Link className="text-sky-700" href="/host/past">
          List of past events (contains edit/delete button overlay)
        </Link>
        <form>Form for creating new events</form>
      </nav>
    </>
  );
}
