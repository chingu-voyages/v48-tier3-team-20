// put all shared typescript types here
import { CATEGORIES } from "@/lib/constants";
import { z } from "zod";
import { CreateEventValidator, UpdateEventValidator } from "./validator";

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

export type CreateEvent = Omit<z.infer<typeof CreateEventValidator>, 'imgPoster'> & { imgPoster: string };
export type UpdateEvent = Omit<z.infer<typeof UpdateEventValidator>, 'imgPoster'> & { imgPoster: string };

export type CloudinaryResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
  api_key: string;
}


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

export type ReturnType<T> =
  | { data: T; error: null }
  | { data: null; error: string };
