//todo: remover esse arquivo

import axios from "axios";

const api = axios.create({
    baseURL: "http://mail.gpj.com.br:9198/api",
});




interface CalculatorResultDTO {
  TotalMoney: number;
  TotalEnergy: number;
  MoneyPerMonth: number;
  EnergyPerMonth: number;
}

interface CalculatorConversorDTO{
  ConversorRealToEnergy: number;
}


export async function CalculateCost(Valor: string): Promise<CalculatorResultDTO> {
  try {
    const response = await api.get<CalculatorResultDTO>(`/Calculator/${Valor}`);

    //console.log(response.data);
    return response.data;

  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch cost from API Calculate");
  }
}

export async function ConversorRealToEnergy(Valor: string): Promise<CalculatorConversorDTO>{
  try{
    const response = await api.get<CalculatorConversorDTO>(`/Calculator/Conversor/${Valor}`);
    return response.data;

  } catch(error){
    console.log(error);
    throw new Error("Failed to fetch cost from API Conversor")
  }
}