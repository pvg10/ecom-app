import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  gender: String,
  image: String  // <-- add this
}, { timestamps: true });


export default mongoose.models.Product || mongoose.model("Product", ProductSchema);