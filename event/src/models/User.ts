import mongoose from "mongoose";

export interface Users extends mongoose.Document {
  fullname: string;
  email: string;
  username: string;
  password: string;
  isSubscribed: boolean;
  profile_pic: string;
  bio: string;
  interest: Array<string>;
  // dob: string;   // Date of birth
}

const UserSchema = new mongoose.Schema<Users>({
  fullname: {
    type: String,
    lowercase: true,
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
    required: true,
  },
  bio: {
    type: String
  },
  interest: {
    type: [String]
  }
  // dob: {
  //   type: Date
  // }
});

// export default mongoose.model<Users>('users', UserSchema);
export default mongoose.models.users || mongoose.model("users", UserSchema);
