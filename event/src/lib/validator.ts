import { z } from "zod"
import { ACCEPTED_IMAGE_TYPES, CATEGORIES, MAX_FILE_SIZE } from "./constants"
''

export const EventValidator = z.object({
  name: z.string(),
  slug: z.string().toLowerCase(),
  description: z.string(),
  imgPoster:
    z.object({
      size: z.number(),
      type: z.string(),
    })
      .refine(
        (files) => files?.size <= MAX_FILE_SIZE,
        `Max image size is 5MB.`
      )
      .refine(
        (files) => ACCEPTED_IMAGE_TYPES.includes(files?.type),
        'Only .jpg, .jpeg, .png and .webp formats are supported.'
      ),
  location: z.string(),
  category: z.array(z.enum(CATEGORIES)),
  eventStartDate: z.string().pipe(z.coerce.date()),
  eventEndDate: z.string().pipe(z.coerce.date()).optional(),
  lastDateToJoin: z.string().pipe(z.coerce.date()),
  maximumParticipants: z.number().min(1, "Invalid maximum participants"),
  participants: z.array(z.string())
})

export const CreateEventValidator = EventValidator.omit({ participants: true }).strict().refine((data) => {
  if (data.eventEndDate) {
    return data.eventEndDate > data.eventStartDate
  }
}, {
  message: "Event end date must be after start date"
})

export const UpdateEventValidator = EventValidator.partial().refine(data => {
  return Object.keys(data).length > 0
}, {
  message: "Request body is empty. Please provide data for the event update."
})
