import User, { IUser } from "@/models/User";
import Event, { Events } from "@/models/Event";
import { ReturnType } from "../types";

// a place to put commonly used database operations
// usage: const { data, error } = await getUserById(...)

// IGNORE FOR NOW

export const getUserById = async (
  userId: string,
): Promise<ReturnType<IUser>> => {
  const user: IUser | null = await User.findById(userId);
  if (!user) {
    return { data: null, error: "No such user in db" };
  }

  return { data: user, error: null };
};

export const getEventById = async (
  eventId: string,
): Promise<ReturnType<Events>> => {
  const event: Events | null = await Event.findById(eventId);
  if (!event) {
    return { data: null, error: "No such events in db" };
  }

  return { data: event, error: null };
};

export const joinEvent = async (
  user: IUser,
  event: Events,
): Promise<ReturnType<string>> => {
  if (event.participants.includes(user._id)) {
    return { data: null, error: "User already in list" };
  }

  await Event.findByIdAndUpdate(event._id, {
    $push: { participants: user._id },
  });

  return { data: "Successfully joined event", error: null };
};

export const leaveEvent = async (
  user: IUser,
  event: Events,
): Promise<ReturnType<string>> => {
  if (!event.participants.includes(user._id)) {
    return { data: null, error: "User not in list" };
  }

  await Event.findByIdAndUpdate(event._id, {
    $pull: { participants: user._id },
  });

  return { data: "Successfully left event", error: null };
};
