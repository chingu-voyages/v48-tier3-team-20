// dashboard for host to edit/delete events

export default async function DashboardHostEvent({
  params,
}: {
  params: { eventId: string };
}) {
  // fetch GET /api/events/[eventid]
  // render form to edit events
  // get categories/data from BE to show in dropdown
  // form onSubmit fetch PUT /api/events/[eventid]
  // delete button (with confirmation popup) fetch DELETE /api/events/[eventid]

  return (
    <>
      <p>Host Dashboard: Edit Event {params.eventId}</p>
    </>
  );
}
