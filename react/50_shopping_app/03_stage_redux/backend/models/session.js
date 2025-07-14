import mongoose from "mongoose";

const Schema = mongoose.Schema({
    user: {type: String, index: true},
    ttl: Number,
    token: String
})

const sessionModel = mongoose.model("session", Schema);
export default sessionModel;