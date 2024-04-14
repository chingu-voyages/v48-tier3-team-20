import mongoose, { Types, Schema } from "mongoose";

export interface Events extends mongoose.Document {
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
  host: Types.ObjectId;
  participants: Types.ObjectId[];
}

const Eventschema = new mongoose.Schema<Events>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  slug: {
    type: String,
    minlength: [3, "Slug must be 3 letters long"],
    unique: true,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imgPoster: {
    type: String,
    default: "/placeholder-image.png",
  },
  category: {
    type: [String],
    default: ["Uncategorized"],
  },
  eventStartDate: {
    type: Date,
    required: true,
  },
  eventEndDate: {
    type: Date,
  },
  lastDateToJoin: {
    type: Date,
    required: true,
  },
  maximumParticipants: {
    type: Number,
    required: true,
  },
  host: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  participants: {
    type: [Schema.Types.ObjectId],
    ref: "users",
  },
});

// export default mongoose.model<Events>('Events', Eventschema);
export default mongoose.models.events || mongoose.model("events", Eventschema);
