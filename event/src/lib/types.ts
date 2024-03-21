// put all shared typescript types here

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
export type EventCategory = "Sports" | "Music" | "Games" | "Comedy" | "Others";

// example
export type EventType = {
  id: number;
  eventName: string;
  hostId?: string;
  description: string;
  category?: EventCategory;
  date: Date;
  img: string;
  location: string;
};
