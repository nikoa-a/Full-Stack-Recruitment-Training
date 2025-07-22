import mongoose from "mongoose";

const Schema = mongoose.Schema({
  username: {type: String, unique: true},
  password: String
})

const userModel = mongoose.model("user", Schema);
export default userModel;