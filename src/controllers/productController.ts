import { STATUS_CODES } from "../common/statusCodes";
import { ERROR_MESSAGES } from "../common/errors";
import logger from "../common/logger";
import productService from "../services/productService";
import { Request, Response } from "express";
import redisService from "../services/redisService";
import {
  createProductSchema,
  idParamSchema,
  updateProductSchema,
} from "../dto/productsSchemas";
import { validateWithSchema } from "../utils/validatewithSchema";
import { statSync } from "fs";

class ProductController {
  async createProduct(req: Request, res: Response) {
    try {
      const parsed = validateWithSchema(createProductSchema, req.body);

      const result = await productService.createProduct(parsed);
      res.status(STATUS_CODES.CREATED).json({ Data: result });
    } catch (err: any) {
      logger.error("Creating product error:", err);
      if(err.message === ERROR_MESSAGES.PRODUCT_EXISTS){
        return res.status(STATUS_CODES.CONFLICT).json({Data : ERROR_MESSAGES.PRODUCT_EXISTS})
      }


      return res
        .status(STATUS_CODES.Internal_Server_Error)
        .json({ Error: err.message });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      const parsed = validateWithSchema(updateProductSchema, req.body);

      const parsedParams = validateWithSchema(idParamSchema, req.params);

      const result = await productService.updateProduct(
        parsedParams.id,
        parsed,
      );
      res.status(STATUS_CODES.OK).json({ Data: result });
    } catch (err: any) {
      if (err.message === ERROR_MESSAGES.PRODUCT_NOT_FOUND) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ Error: "Products don't exist." });
      }
      logger.error("Updating product error:", err);
      return res
        .status(STATUS_CODES.Internal_Server_Error)
        .json({ Error: err.message });
    }
  }

  async getAllProducts(req: Request, res: Response) {
    try {
      const result = await productService.getAllProducts();
      res.status(STATUS_CODES.OK).json({ Data: result });
    } catch (err) {
      return res
        .status(STATUS_CODES.Internal_Server_Error)
        .json({ Error: ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const parsedParams = validateWithSchema(idParamSchema, req.params);
      console.time(`Redis GET ${req.params.id}`);
      const cached = await redisService.getProduct(req.params.id);
      console.timeEnd(`Redis GET ${req.params.id}`);
      if (cached) {
        logger.info(`[CACHE HIT] Product ${req.params.id}`);
        return res.status(STATUS_CODES.OK).json({ Data: JSON.parse(cached) });
      }

      logger.info(`[CACHE MISS] Product ${req.params.id}`);

      logger.info(console.time(`DB GET ${req.params.id}`));
      const result = await productService.getProductById(req.params.id);
      console.timeEnd(`DB GET ${req.params.id}`);

      if (!result) {
        return res.status(STATUS_CODES.NOT_FOUND).json({
          Error: ERROR_MESSAGES.PRODUCT_NOT_FOUND,
        });
      }

      console.time(`Redis SET ${req.params.id}`);
      const saveResult = await redisService.saveProduct(req.params.id, result);
      console.timeEnd(`Redis SET ${req.params.id}`);

      if (saveResult !== "OK") {
        logger.warn(`[REDIS] Failed to cache product ${req.params.id}`);
      }

      res.status(STATUS_CODES.OK).json({ Data: result });
    } catch (err: any) {
      logger.error(err);
      res.status(STATUS_CODES.Internal_Server_Error).json({
        Error: err.message,
      });
    }
  }

  async deleteProductById(req: Request, res: Response) {
    try {
      const parsedParams = validateWithSchema(idParamSchema, req.params);
      const result = await productService.deleteProductById(parsedParams.id);
      return res.status(STATUS_CODES.OK).json({ Data: result });
    } catch (err: any) {
      logger.error(err);
      if (err.message === ERROR_MESSAGES.PRODUCT_NOT_FOUND) {
        return res
          .status(STATUS_CODES.NOT_FOUND)
          .json({ Error: ERROR_MESSAGES.PRODUCT_NOT_FOUND });
      }
      return res
        .status(STATUS_CODES.Internal_Server_Error)
        .json({ Error: err.message });
    }
  }
}

const productController = new ProductController();
export default productController;
