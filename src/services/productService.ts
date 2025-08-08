import Product from "../models/product";
import { ERROR_MESSAGES } from "../common/errors";
import logger from "../common/logger";
import { CreateProductRequest, UpdateProductRequest } from "../dto/dto";

class ProductService {
  async createProduct(data: CreateProductRequest): Promise<Product> {
    const existing = await Product.findOne({
      where: { brand: data.brand, model: data.model },
    });

    if (existing) {
      throw new Error(ERROR_MESSAGES.PRODCUT_EXISTS);
    }

    try {
      return Product.create(data);
    } catch (err) {
      logger.error("DB ERROR creating product:", err);
      throw new Error(ERROR_MESSAGES.PRODUCT_CREATION_FAILED);
    }
  }
  async updateProduct(productid: string,data: UpdateProductRequest): Promise<Product> {
    try {
      logger.info("Updating product with ID:", productid);
      const product = await Product.findByPk(productid);

      if (product === null) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      }

      return product.update(data);
    } catch (err) {
      logger.error("DB ERROR updating product:", err);
      throw err;
    }
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      return Product.findAll();
    } catch (err) {
      logger.error("DB ERROR getting product:", err);
      throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    }
  }

  async getProductById(productId: string): Promise<Product> {
    try {
      const result = await Product.findByPk(productId);
      if (!result) {
        throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      }
      return result;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

export default new ProductService();
