import { z } from "zod";
import {
  ACCEPTED_IMAGE_TYPES,
  FULL_CATEGORIES,
  MAX_FILE_SIZE,
} from "./constants";
("");

export const EventValidator = z.object({
  name: z.string(),
  slug: z.string().toLowerCase(),
  description: z.string(),
  imgPoster: z
    .object({
      size: z.number(),
      type: z.string(),
    })
    .refine((files) => files.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    ),
  location: z.string(),
  category: z.array(z.enum(FULL_CATEGORIES)),
  eventStartDate: z.string().pipe(z.coerce.date()),
  eventEndDate: z.string().pipe(z.coerce.date()).optional(),
  lastDateToJoin: z.string().pipe(z.coerce.date()),
  maximumParticipants: z.number().min(1, "Invalid maximum participants"),
  participants: z.array(z.string()),
});

// to also check lastDateToJoin < eventStartDate
export const CreateEventValidator = EventValidator.omit({
  participants: true,
  imgPoster: true,
})
  .strict()
  .refine(
    (data) => {
      const isValid = data.lastDateToJoin < data.eventStartDate;
      if (data.eventEndDate) {
        return isValid && data.eventEndDate > data.eventStartDate;
      }
      return isValid;
    },
    {
      message:
        "Event end date must be after start date, last date to join must be before start date",
    },
  );

// export const UpdateEventValidator = EventValidator.partial().refine(
//   (data) => {
//     return Object.keys(data).length > 0;
//   },
//   {
//     message: "Request body is empty. Please provide data for the event update.",
//   },
// );

// update event validator also needs to check date validity
export const UpdateEventValidator = EventValidator.omit({
  participants: true,
  imgPoster: true,
}).refine(
  (data) => {
    const isValid = data.lastDateToJoin < data.eventStartDate;
    if (data.eventEndDate) {
      return isValid && data.eventEndDate > data.eventStartDate;
    }
    return isValid;
  },
  {
    message: "Request body is empty. Please provide data for the event update.",
  },
);
