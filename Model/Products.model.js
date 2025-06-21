import mongoose, { Schema } from "mongoose";

// Define the schema for Product
const ProductSchema = new Schema({
  name: String,         // Name of the product
  price: Number,        // Product price
  description: String,  // Description of the product
  stock: Number,        // Number of items available
});

// Create the Product model
const ProductModel = mongoose.model("Product", ProductSchema); 

// Export the model for use in other parts of the app
export default ProductModel;
