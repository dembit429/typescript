export interface CreateProductRequest {
  brand: string;
  model: string;
  price: number;
  category_id: string;
}

export interface UpdateProductRequest {
  brand?: string;
  model?: string;
  price?: number;
  category_id?: string;
}
