import express from "express";
import productController from "../controllers/productController";
const productRouter = express.Router();

productRouter.get("/",productController.getAllProducts);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
export default productRouter;
