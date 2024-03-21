import { faker } from "@faker-js/faker";
import { EventType, EventCategory } from "@/lib/types";
import { sleep } from "@/lib/utils";

const createRandomEvent = (category: EventCategory): EventType => {
  return {
    id: Date.now() + Math.random() * 100000,
    eventName: faker.commerce.productName(),
    hostId: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    category,
    date: faker.date.future(),
    // img: faker.image.urlPicsumPhotos({width: 200, height: 200}),
    img: "https://picsum.photos/id/1/200/150",
    location: faker.location.city(),
  };
};

const categories: EventCategory[] = [
  "Sports",
  "Music",
  "Games",
  "Comedy",
  "Others",
];

const ALL_EVENTS = categories.map((category) => ({
  id: faker.string.uuid(),
  category,
  events: faker.helpers.multiple(() => createRandomEvent(category), {
    count: 3,
  }),
}));

export const getAllEvents = () => {
  sleep(1000);
  return {
    data: ALL_EVENTS,
  };
};

export const getEventById = (category: EventCategory, id: number) => {
  const obj = ALL_EVENTS.filter((event) => event.category === category)[0];
  const ret = obj.events.filter((event) => event.id === id);
  sleep(1000);
  if (ret.length === 0) {
    return {
      error: "No event of that ID",
    };
  }
  return {
    data: ret[0],
  };
};
