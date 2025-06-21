import CartModel from "../Model/Cart.model.js";
import ProductModel from "../Model/Products.model.js";
import mongoose from "mongoose";

// Controller to add an item to the cart
export async function addToCart(req, res) {
  const { productId, quantity } = req.body;

  // Validate product ID format
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  // Validate quantity
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    // Check if the product exists in the database
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create new cart item
    const cartItem = new CartModel({
      productId,
      quantity,
    });

    // Save cart item to database
    await cartItem.save();

    // Return success response
    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: error.message });
  }
}

// Controller to update the quantity of a cart item
export async function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  // Validate cart item ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  // Validate quantity
  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    // Find and update cart item by ID
    const updatedCartItem = await CartModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true } // Return the updated document
    );

    // If item not found, return 404
    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Return success response
    res.status(200).json({
      message: "Cart item updated",
      updatedCartItem,
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: error.message });
  }
}

// Controller to delete a cart item
export async function deleteCartItem(req, res) {
  const { id } = req.params;

  // Validate cart item ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  try {
    // Find and delete cart item by ID
    const deletedItem = await CartModel.findByIdAndDelete(id);

    // If item not found, return 404
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Return success response
    res.status(200).json({
      message: "Cart item deleted",
      deletedItem,
    });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: error.message });
  }
}
