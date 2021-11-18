import mongoose from "mongoose";

const { String } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: String,
});

const User = mongoose.model("user", UserSchema);

export { User, UserSchema };
