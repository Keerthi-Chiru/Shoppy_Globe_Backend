import { Schema,mongoose } from "mongoose";


const CartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
});

const CartModel = mongoose.model("Cart", CartSchema);

export default CartModel;