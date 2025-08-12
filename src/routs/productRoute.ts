import express from "express";
import productController from "../controllers/productController";

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: The list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
productRouter.get("/", productController.getAllProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *             properties:
 *               brand:
 *                 type: string
 *               model:
 *                 type: number
 *               price:
 *                 type: numer
 *               category_id:
 *                  type: string
 *             example:
 *               brand: Test
 *               price: 999
 *               model: Yaris
 *               category_id: f1a1c4a2-bd2c-4b0d-a39d-e0f621aad5c1

 *     responses:
 *       201:
 *         description: The product was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict product exists.
 *       500:
 *         description: Server error
 */
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.get("/:id", productController.getProductById);
productRouter.delete("/:id", productController.deleteProductById);
export default productRouter;
