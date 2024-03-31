import { z } from "zod"
import { CATEGORIES } from "./constants"

export const EventValidator = z.object({
  name: z.string(),
  slug: z.string().toLowerCase(),
  description: z.string(),
  location: z.string(),
  imgPoster: z.string().url().optional(),
  category: z.array(z.enum(CATEGORIES)),
  eventStartDate: z.string().pipe(z.coerce.date()),
  eventEndDate: z.string().pipe(z.coerce.date()).optional(),
  lastDateToJoin: z.string().pipe(z.coerce.date()),
  maximumParticipants: z.number().min(1, "Invalid maximum participants"),
  participants: z.array(z.string())
})

export const CreateEventValidator = EventValidator.omit({ participants: true }).refine((data) => {
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
