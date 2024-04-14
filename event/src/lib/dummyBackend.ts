import { faker } from "@faker-js/faker";
import { MongoEventType } from "@/lib/types";
import { CATEGORIES, ONE_DAY_IN_MS } from "./constants";

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
    maximumParticipants: faker.number.int({ max: 100, min: 1 }),
    host: hostId,
    participants: [],
  };
};
