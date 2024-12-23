import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
