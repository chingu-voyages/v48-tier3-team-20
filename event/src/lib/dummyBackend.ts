import { faker } from "@faker-js/faker";
import { EventType, EventCategory, MongoEventType } from "@/lib/types";
import { sleep } from "@/lib/utils";
import { CATEGORIES, ONE_DAY_IN_MS } from "./constants";

const generatePrefixedId = (prefix: string, start: number = 0) => {
  let id = start;
  const getIncrementedId = () => {
    id++;
    return `${prefix}-${id.toString().padStart(8, "0")}`;
  };
  return getIncrementedId;
};

const generateEventId = generatePrefixedId("event");
// const generateUserId = generatePrefixedId("user");

const createRandomEvent = (category: EventCategory): EventType => {
  return {
    // id: faker.string.uuid(),
    id: generateEventId(),
    eventName: `${category}: ${faker.commerce.productName()}`,
    hostId: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    category,
    date: faker.date.future(),
    img: faker.image.urlPicsumPhotos({ width: 200, height: 150 }),
    // img: "https://picsum.photos/id/1/200/150",
    location: faker.location.city(),
    weeklyViews: faker.number.int({ max: 10000, min: 1 }),
  };
};

const ALL_EVENTS: EventType[] = [];

CATEGORIES.forEach((category) => {
  ALL_EVENTS.push(
    ...faker.helpers.multiple(() => createRandomEvent(category), {
      count: 10,
    }),
  );
});

export const getAllEvents = async () => {
  await sleep(1000);
  return {
    data: ALL_EVENTS,
  };
};

export const getEventById = async (id: string) => {
  const ret = ALL_EVENTS.filter((event) => event.id === id);

  await sleep(1000);
  if (ret.length === 0) {
    return {
      error: "No event of that ID",
    };
  }
  return {
    data: ret[0],
  };
};

export const getEventByCategory = async (category: EventCategory) => {
  const ret = ALL_EVENTS.filter((event) => event.category === category);

  await sleep(1000);
  if (ret.length === 0) {
    return {
      error: "No event of that category",
    };
  }

  return {
    data: ret,
  };
};

// create dummy mongo events, how to type hostId?
export const createMongoEvent = (hostId: any): MongoEventType => {
  const name = faker.commerce.productName();
  const slug = name.toLowerCase().split(" ").join("-");

  const eventStartDate = faker.date.soon({
    days: 100,
    refDate: "2024-05-01T00:00:00.000Z",
  });
  const eventEndDate = new Date(
    eventStartDate.valueOf() +
      faker.number.int({ max: 5 * ONE_DAY_IN_MS, min: 0 }),
  );
  const lastDateToJoin = new Date(
    eventStartDate.valueOf() -
      faker.number.int({ max: 10 * ONE_DAY_IN_MS, min: 5 * ONE_DAY_IN_MS }),
  );

  const category = [];
  for (let cat of CATEGORIES) {
    if (Math.random() > 0.8) {
      category.push(cat);
    }
  }
  if (category.length === 0) {
    category.push("Uncategorized");
  }

  return {
    name,
    slug,
    description: faker.commerce.productDescription(),
    category,
    eventStartDate,
    eventEndDate,
    lastDateToJoin,
    imgPoster: faker.image.urlPicsumPhotos({ width: 200, height: 150 }),
    location: faker.location.city(),
    maximumParticipants: faker.number.int({ max: 100, min: 0 }),
    host: hostId,
    participants: [],
  };
};
