// import User, { IUser } from "@/models/User";
import Event, { Events } from "@/models/Event";
// import { ReturnType } from "../types";
import dbConnect from "@/lib/mongo";
import { FULL_CATEGORIES } from "../constants";

export const getCategory = async (category: string): Promise<Events[]> => {
  await dbConnect();
  return await Event.find({ category });
};

export const getAllCategory = async (): Promise<{ [k: string]: Events[] }> => {
  await dbConnect();
  let result: {} = {};
  for (let category of FULL_CATEGORIES) {
    const events = await Event.aggregate([
      { $match: { category: category } },
      { $addFields: { participantCounts: { $size: "$participants" } } },
      { $sort: { participantCounts: -1 } },
      { $limit: 3 },
    ]);

    if (!events) {
      continue;
    }
    result = { ...result, [category]: events };
  }
  return result;
};

export const searchEvents = async (q: string): Promise<Events[]> => {
  await dbConnect();
  await Event.createIndexes();

  return await Event.find({
    $or: [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  });
};

export const getUpcoming = async (n?: number): Promise<Events[]> => {
  await dbConnect();

  if (n && n > 0) {
    return await Event.aggregate([
      { $match: { eventStartDate: { $gt: new Date() } } },
      { $sort: { eventStartDate: 1 } },
      { $limit: n },
    ]);
  }

  return await Event.aggregate([
    { $match: { eventStartDate: { $gt: new Date() } } },
    { $sort: { eventStartDate: 1 } },
  ]);
};

export const getTrending = async (n?: number): Promise<Events[]> => {
  await dbConnect();

  if (n && n > 0) {
    return await Event.aggregate([
      { $match: { eventStartDate: { $gt: new Date() } } },
      { $addFields: { participantCount: { $size: "$participants" } } },
      { $sort: { participantCount: -1 } },
      { $limit: n },
    ]);
  }

  return await Event.aggregate([
    { $match: { eventStartDate: { $gt: new Date() } } },
    { $addFields: { participantCount: { $size: "$participants" } } },
    { $sort: { participantCount: -1 } },
  ]);
};

// export const getUserById = async (
//   userId: string,
// ): Promise<ReturnType<IUser>> => {
//   const user: IUser | null = await User.findById(userId);
//   if (!user) {
//     return { data: null, error: "No such user in db" };
//   }

//   return { data: user, error: null };
// };

// export const getEventById = async (
//   eventId: string,
// ): Promise<ReturnType<Events>> => {
//   const event: Events | null = await Event.findById(eventId);
//   if (!event) {
//     return { data: null, error: "No such events in db" };
//   }

//   return { data: event, error: null };
// };

// export const joinEvent = async (
//   user: IUser,
//   event: Events,
// ): Promise<ReturnType<string>> => {
//   if (event.participants.includes(user._id)) {
//     return { data: null, error: "User already in list" };
//   }

//   await Event.findByIdAndUpdate(event._id, {
//     $push: { participants: user._id },
//   });

//   return { data: "Successfully joined event", error: null };
// };

// export const leaveEvent = async (
//   user: IUser,
//   event: Events,
// ): Promise<ReturnType<string>> => {
//   if (!event.participants.includes(user._id)) {
//     return { data: null, error: "User not in list" };
//   }

//   await Event.findByIdAndUpdate(event._id, {
//     $pull: { participants: user._id },
//   });

//   return { data: "Successfully left event", error: null };
// };
