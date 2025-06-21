import ProductModel from "../Model/Products.model.js";
import mongoose from "mongoose";

export function fetchProducts(req, res){
    ProductModel.find().then((data)=>{
        if(!data){
            res.status(400).json({message: "Bad Request"});
        }
        res.send(data);
    }).catch((err)=>{
        res.status(500).json({message: err.message});
    })
};

export function fetchProductsByID(req, res){
    const {id} = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

    ProductModel.findById(id).then((data)=>{
        if(!data){
            res.status(400).json({message: "Product not found"});
        }
        res.status(200).send(data);
    }).catch((error)=>{
        res.status(error.status).json({message: error.message});
    })

}