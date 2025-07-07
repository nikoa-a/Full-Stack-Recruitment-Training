import mongoose from "mongoose";

const Schema = mongoose.Schema({
  type: String,
  count: Number,
  price: Number
});

Schema.virtual("id").get(() => {
  return this._id;
});

const itemModel = mongoose.model("Item", Schema);
export default itemModel;