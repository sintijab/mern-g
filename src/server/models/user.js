import mongoose, { Schema } from "mongoose";

const userSchema = new Schema ({
  name: String,
  books: Array,
});

export const User = mongoose.model("User", userSchema);
