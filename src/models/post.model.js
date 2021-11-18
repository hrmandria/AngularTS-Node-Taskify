import mongoose from "mongoose";

const { String, ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  photo: String,
});

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now,
  },
  user: {
    type: UserSchema,
    required: true,
  },
});

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
    default: Date.now,
  },
  colors: [String],
  user: {
    type: ObjectId,
    required: true,
  },
  comments: [CommentSchema],
  likes: [ObjectId],
  photos: [String],
  song: String,
});

const Post = mongoose.model("post", PostSchema);

export { Post, PostSchema };
