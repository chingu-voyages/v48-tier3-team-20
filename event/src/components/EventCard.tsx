interface EventListProp {
  eventName: string;
  date: Date;
  location: string;
  img: string;
}

export default function EventCard({
  eventName,
  date,
  location,
  img,
}: EventListProp) {
  return (
    <div>
      <p>image url: {img}</p>
      <p>{eventName}</p>
      <p>{date.toDateString()}</p>
      <p>{location}</p>
    </div>
  );
}
