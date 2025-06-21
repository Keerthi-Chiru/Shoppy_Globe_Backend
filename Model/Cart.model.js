import mongoose, { Schema } from "mongoose";


// Define the Cart schema
const CartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Product document
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1 // Quantity must be at least 1
  },
});

// Create the Cart model from the schema
const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;