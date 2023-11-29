import axios from "axios";
import ProductDTO from "../models/ProductDTO";

const api = axios.create({
    baseURL: "http://mail.gpj.com.br:9198/api",
});
//44384 - Pc Sena
//44336 - Pc Felipe
//44323 - Pc Vitim

export async function GetProducts(filter?: string, categories?: number[], orderBy?: string, maxResults?: number): Promise<ProductDTO[]> {
  try {    
    const response = await api.get('/Product', {
      params: {
        filter: filter,
        categories: categories?.join(','),
        orderBy: orderBy,
        maxResults: maxResults
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Product from API TronosSolar");
  }
}
export async function GetProductsById(id?: number): Promise<ProductDTO[]> {
  try {    
    const response = await api.get(`/Product/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Product from API TronosSolar");
  }
}

export async function GetProductById(productId: number): Promise<ProductDTO> {
  try {    
      const response = await api.get(`/Product/${productId}`);
      return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Product from API TronosSolar");
  }
}

export async function CreateProduct(product: ProductDTO): Promise<ProductDTO> {
  try {    
    const response = await api.post('/Product', product);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Product from API TronosSolar");
  }
}

export async function UpdateProduct(product: ProductDTO): Promise<ProductDTO> {
  try{
    const response = await api.patch(`/Product/${product.id}`, product);
    return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to update Product from API TronosSolar");
  }
}

export async function DeleteProduct(productId: number): Promise<void> {
  try {
    await api.delete(`/Product/${productId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Product from API TronosSolar");
  }
}