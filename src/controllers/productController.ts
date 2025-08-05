import { STATUS_CODES } from "../common/statusCodes";
import { ERROR_MESSAGES } from "../common/errors";
import logger from "../common/logger";
import productService from "../services/productService";
import { Request, Response } from "express";
import { z } from "zod";

const createProductSchema = z.object({
  brand: z.string().min(1),
  model: z.string().min(1),
  price: z.number().positive(),
  category_id: z.string().uuid(),
});

const updateProductSchema = createProductSchema.partial();

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const parsed = createProductSchema.safeParse(req.body);

      if (!parsed.success) {
        logger.error("Bad request: ");
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ Error: ERROR_MESSAGES.INVALID_CREDENTIALS });
      }

      const result = await productService.createProduct(req.body);
      res.status(STATUS_CODES.CREATED).json({ Data: result });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === ERROR_MESSAGES.PRODCUT_EXISTS) {
          return res
            .status(STATUS_CODES.CONFLICT)
            .json({ Error: "Product already exists." });
        }
      }

      logger.error("Creating product error:", err);
      return res
        .status(STATUS_CODES.Internal_Server_Error)
        .json({ Error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const parsed = updateProductSchema.safeParse(req.body);

      if (!parsed.success) {
        logger.error("Invalid data");
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ Error: ERROR_MESSAGES.INVALID_CREDENTIALS });
      }

      const result = await productService.updateProduct(req.params.id,req.body);
      res.status(STATUS_CODES.OK).json({Data : result})
    }
    catch (err) {
      if(err instanceof Error && err.message ===ERROR_MESSAGES.PRODUCT_NOT_FOUND){
        res.status(STATUS_CODES.NOT_FOUND).json({Error:"Products don't exist."})
      }
      logger.error("Updating product error:", err);
      return res
        .status(STATUS_CODES.Internal_Server_Error)
        .json({ Error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async getAllProducts(req:Request,res:Response){
    try{
      const result = await productService.getAllProducts();
      res.status(STATUS_CODES.OK).json({Data : result})

    }catch(err){
      return res
        .status(STATUS_CODES.Internal_Server_Error)
        .json({ Error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

}

const productController = new ProductController();
export default productController;
