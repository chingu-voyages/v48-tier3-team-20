import Link from "next/link";
import EventCard from "./EventCard";

type EventListProp = {
  link: string;
  text: string;
  children?: React.ReactNode;
};

export default function EventList({ link, text, children }: EventListProp) {
  return (
    <section className="m-1">
      <div className="flex items-center justify-center">
        <h2 className="mr-4 text-2xl font-bold">{text}</h2>
        <Link
          href={link}
          className="flex items-center rounded-lg border px-2 py-1 text-sm"
        >
          View more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M9 6l6 6l-6 6" />
          </svg>
        </Link>
      </div>

      <div className="flex justify-center">{children}</div>
    </section>
  );
}
