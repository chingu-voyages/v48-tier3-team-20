import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
  fullname: string;
  email: string;
  username: string;
  password: string;
  isSubscribed?: boolean;
  profile_pic?: string;
  bio?: string;
  interest?: Array<string>;
  // dob: string;   // Date of birth
}

export interface PublicUser extends Omit<IUser, "password"> {}

const UserSchema = new mongoose.Schema<IUser>({
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    minlength: [3, "Username must be 3 letters long"],
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
  profile_pic: {
    type: String,
    default: "/stock-user.jpeg",
  },
  bio: {
    type: String,
  },
  interest: {
    type: [String],
  },
  // dob: {
  //   type: Date
  // }
});

// export default mongoose.model<Users>('users', UserSchema);
export default mongoose.models.users || mongoose.model("users", UserSchema);
