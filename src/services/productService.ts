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
  async updateProduct(productid: string, data: UpdateProductRequest): Promise<Product> {
  try {
    const product = await Product.findByPk(productid);

    if (!product) {
      throw new Error(ERROR_MESSAGES.PRODUCT_NOT_FOUND);
    }

    await product.update({
      brand: data.brand,
      model: data.model,
      price: data.price,
      category_id: data.category_id
    });

    return product; 
  } catch (err) {
    if(err instanceof Error && err.message === ERROR_MESSAGES.PRODUCT_NOT_FOUND){
      throw new Error();
    }
    logger.error("DB ERROR updating product:", err);
    throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}

async getAllProducts():Promise<Product[]>{
  try{
    return Product.findAll();
  }catch(err){
    logger.error("DB ERROR getting product:", err);
    throw new Error(ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
  }
}



}

export default new ProductService();
