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
// type EventCategory = "Sports" | "Music" | "Games" | "Comedy" | "Others";
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
