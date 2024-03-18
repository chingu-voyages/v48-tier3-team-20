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
type EventCategory = 'Sports' | 'Music' | 'Games' | 'Comedy' | 'Others';

// example
export type EventType = {
  id: string;
  name: string;
  host: UserType;
  description: string;
  category: EventCategory;
  eventPoster: ImageType;
  isPublic: boolean;
  remainingSpots: number;
};
