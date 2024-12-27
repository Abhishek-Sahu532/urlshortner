import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema(
  {
    longUrl: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    alias: {
      type: String,
      lowercase: true,
      trim: true,
    },
    topic: {
      type: String,
      trim: true,
    },
    shortUrl: {
      type: String,
      required: true,
      trim: true,
    },
    totalClicks: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);
