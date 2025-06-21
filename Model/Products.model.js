import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  stock: Number,
});

const ProductModel = mongoose.model("Product", ProductSchema); 

export default ProductModel;
