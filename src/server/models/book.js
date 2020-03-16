import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema ({
  owner: Object,
  author: String,
  title: String,
  description: String,
  availability: Number,
  date: Date,
});

export const Book = mongoose.model("Book", bookSchema);
