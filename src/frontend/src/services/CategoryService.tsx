import axios from "axios";
import CategoryDTO from "../models/CategoryDTO";

const api = axios.create({
    baseURL: "http://mail.gpj.com.br:9198/api",
});

//44384 - Pc Sena
//44336 - Pc Felipe

export async function GetCategories(): Promise<CategoryDTO[]> {
  try {    
      const response = await api.get(`/Category`);
      return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Category from API TronosSolar");
  }
}

export async function GetCategoryById(categoryId: number): Promise<CategoryDTO> {
  try {    
      const response = await api.get(`/Category/${categoryId}`);
      return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Category from API TronosSolar");
  }
}

export async function CreateCategory(category: CategoryDTO): Promise<CategoryDTO> {
  try {    
    const response = await api.post('/Category', category);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Category from API TronosSolar");
  }
}

export async function UpdateCategory(category: CategoryDTO): Promise<CategoryDTO> {
  try{
    const response = await api.patch(`/Category/${category.id}`, category);
    return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to update Category from API TronosSolar");
  }
}

export async function DeleteCategory(categoryId: number): Promise<void> {
  try {
    await api.delete(`/Category/${categoryId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Category from API TronosSolar");
  }
}