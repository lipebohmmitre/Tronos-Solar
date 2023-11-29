import axios from "axios";
import KitDTO from "../models/KitDTO";

const api = axios.create({
    baseURL: "http://mail.gpj.com.br:9198/api",
});

//44384 - Pc Sena
//44336 - Pc Felipe
//segurança em primeiro lugar xD

export async function GetKits(filter?: string, orderBy?: string, maxResults?: number, includeProducts?: boolean): Promise<KitDTO[]> {
  try {    
    const response = await api.get('/Kit', {
      params: {
        filter: filter,
        orderBy: orderBy,
        maxResults: maxResults,
        includeProducts: includeProducts
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Kits from API TronosSolar");
  }
}

export async function GetKitById(kitId: number): Promise<KitDTO> {
  try {    
      const response = await api.get(`/Kit/${kitId}`);
      return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Kit from API TronosSolar");
  }
}

export async function GetRecommendedKits(): Promise<KitDTO[]> {
  let billValuePerMonth = localStorage.getItem('billValuePerMonth');
  let kwhValuePerMonth = localStorage.getItem('kwhValuePerMonth');
  let kwhPrice = localStorage.getItem('kwhPrice');
  let stateCode = localStorage.getItem('state');

  try {    
    const response = await api.get('/Kit/RecommendedKits', {
      params: {
        kwhValuePerMonth: kwhValuePerMonth,
        billValuePerMonth: billValuePerMonth,
        kwhPrice: kwhPrice,
        stateCode: stateCode
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Kits from API TronosSolar");
  }
}

export async function CreateKit(kit: KitDTO): Promise<KitDTO> {
  try {    
    const response = await api.post('/Kit', kit);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create Kit from API TronosSolar");
  }
}

export async function UpdateKit(kit: KitDTO): Promise<KitDTO> {
  try{
    const response = await api.patch(`/Kit/${kit.id}`, kit);
    return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to update Kit from API TronosSolar");
  }
}

export async function GetBestKit(): Promise<KitDTO> {
  let billValuePerMonth = localStorage.getItem('billValuePerMonth');
  let kwhValuePerMonth = localStorage.getItem('kwhValuePerMonth');
  let kwhPrice = localStorage.getItem('kwhPrice');
  let stateCode = localStorage.getItem('state');

  try {    
    const response = await api.get('/Kit/BestKit', {
      params: {
        kwhValuePerMonth: kwhValuePerMonth,
        billValuePerMonth: billValuePerMonth,
        kwhPrice: kwhPrice,
        stateCode: stateCode
      }
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Kits from API TronosSolar");
  }
}

export async function DeleteKit(kitId: number): Promise<void> {
  try {
    await api.delete(`/Kit/${kitId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete Kit from API TronosSolar");
  }
}