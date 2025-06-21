import mongoose from "mongoose";
import ProductModel from "./Model/Products.model.js";

await mongoose.connect("mongodb://localhost:27017", {
  dbName: 'Shoppy_Globe',
});
console.log("MongoDB connected");

const res = await fetch("https://dummyjson.com/products");
const data = await res.json();

const products = data.products.map((item) => ({
  name: item.title,
  description: item.description,
  price: item.price,
  stock: item.stock,
}));

await ProductModel.deleteMany(); // clean old data
await ProductModel.insertMany(products); // insert new data

console.log(`✅ Seeded ${products.length} products`);
mongoose.disconnect();
