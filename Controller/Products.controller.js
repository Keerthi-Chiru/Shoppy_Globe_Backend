import ProductModel from "../Model/Products.model.js";
import mongoose from "mongoose";

// Controller to fetch all products
export function fetchProducts(req, res) {
  ProductModel.find()
    .then((data) => {
      // If no products are found, send an empty array (not an error)
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
      // Send the product data
      res.status(200).json(data);
    })
    .catch((err) => {
      // Handle server error
      res.status(500).json({ message: err.message });
    });
}

// Controller to fetch a product by its ID
export function fetchProductsByID(req, res) {
  const { id } = req.params;

  // Validate the product ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  ProductModel.findById(id)
    .then((data) => {
      // If product not found, send a 404 response
      if (!data) {
        return res.status(404).json({ message: "Product not found" });
      }
      // Send the product data
      res.status(200).json(data);
    })
    .catch((error) => {
      // Always respond with a 500 if there's a server/database error
      res.status(500).json({ message: error.message });
    });
}
