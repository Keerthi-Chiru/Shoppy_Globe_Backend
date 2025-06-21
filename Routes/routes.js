import { fetchProducts, fetchProductsByID } from "../Controller/Products.controller.js";
import { addToCart, updateCartItem, deleteCartItem } from "../Controller/Cart.controller.js";
import { addUser, loginUser } from "../Controller/User.controller.js";
import { authMiddleware } from "../Middleware/authMiddleware.js";



export function routes(app){
    app.get("/products",fetchProducts);
    app.get("/products/:id",fetchProductsByID);
    app.post("/cart", authMiddleware, addToCart);
    app.put("/cart/:id", authMiddleware, updateCartItem);
    app.delete("/cart/:id", authMiddleware, deleteCartItem);
    app.post("/register", addUser);
    app.post('/login', loginUser);
}