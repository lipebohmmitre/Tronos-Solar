import axios from "axios";
import EnergyCompanyDTO from "../models/EnergyCompanyDTO";

const api = axios.create({
    baseURL: "http://mail.gpj.com.br:9198/api",
});

//44384 - Pc Sena
//44336 - Pc Felipe

export async function GetEnergyCompanies(): Promise<EnergyCompanyDTO[]> {
  try {    
      const response = await api.get(`/EnergyCompany`);
      return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch EnergyCompany from API TronosSolar");
  }
}

export async function GetEnergyCompanyById(energyCompanyId: number): Promise<EnergyCompanyDTO> {
  try {    
      const response = await api.get(`/EnergyCompany/${energyCompanyId}`);
      return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch EnergyCompany from API TronosSolar");
  }
}

export async function GetEnergyCompaniesByStateCode(stateCode: string): Promise<EnergyCompanyDTO[]> {
  try {    
      const response = await api.get(`/EnergyCompany/State/${stateCode}`);
      return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to fetch EnergyCompany from API TronosSolar");
  }
}

export async function CreateEnergyCompany(energyCompany: EnergyCompanyDTO): Promise<EnergyCompanyDTO> {
  try {    
    const response = await api.post('/EnergyCompany', energyCompany);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create EnergyCompany from API TronosSolar");
  }
}

export async function UpdateEnergyCompany(energyCompany: EnergyCompanyDTO): Promise<EnergyCompanyDTO> {
  try{
    const response = await api.patch(`/EnergyCompany/${energyCompany.id}`, energyCompany);
    return response.data;
  }catch (error) {
    console.error(error);
    throw new Error("Failed to update EnergyCompany from API TronosSolar");
  }
}

export async function DeleteEnergyCompany(energyCompanyId: number): Promise<void> {
  try {
    await api.delete(`/EnergyCompany/${energyCompanyId}`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete EnergyCompany from API TronosSolar");
  }
}