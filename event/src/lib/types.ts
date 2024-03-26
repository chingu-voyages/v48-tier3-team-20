// put all shared typescript types here
import { CATEGORIES } from "@/lib/constants";

// example
type ImageType = {
  src: string;
  height: number;
  width: number;
};

// example
export type UserType = {
  id: string;
  username: string;
  profilePictureURL: ImageType;
};

// example
export type EventCategory = (typeof CATEGORIES)[number];

// example
export type EventType = {
  id: string;
  eventName: string;
  hostId?: string;
  description: string;
  category: EventCategory;
  date: Date;
  img: string;
  location: string;
  weeklyViews: number;
};

export type MongoEventType = {
  name: string;
  slug: string; // has to be unique, default to name.split(' ').join('-')?
  description: string;
  location: string;
  imgPoster: string; // image url
  category: string[];
  eventStartDate: Date; // new Date().setUTCHours
  eventEndDate?: Date;
  lastDateToJoin: Date;
  maximumParticipants: number;
  host: any;
  participants: string[];
};
