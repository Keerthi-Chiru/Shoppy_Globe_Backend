import CartModel from "../Model/Cart.model.js";
import ProductModel from "../Model/Products.model.js";
import mongoose from "mongoose";


export async function addToCart(req, res){
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
  }

    if(!quantity || quantity < 1) {
        return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    try {
    // Check if product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Add to cart
    const cartItem = new CartModel({
      productId,
      quantity,
    });

    await cartItem.save();

    res.status(201).json({ message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function updateCartItem(req, res) {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  if (!quantity || quantity < 1) {
    return res.status(400).json({ message: "Quantity must be at least 1" });
  }

  try {
    const updatedCartItem = await CartModel.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    if (!updatedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart item updated",
      updatedCartItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


export async function deleteCartItem(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid cart item ID" });
  }

  try {
    const deletedItem = await CartModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.status(200).json({
      message: "Cart item deleted",
      deletedItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

