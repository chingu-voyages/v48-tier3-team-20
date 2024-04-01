// show list of upcoming events user has created

export default async function DashboardHostUpcoming() {
  // fetch GET /api/events/host/[hostid]
  // render event list with edit button and delete button
  // edit button links to /host/events/[eventId]
  // delete button (with confirmation popup) fetch DELETE /api/events/[eventid]

  return (
    <>
      <p>Host Dashboard: Event Management for upcoming events</p>;
    </>
  );
}
