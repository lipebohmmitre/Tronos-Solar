import axios from "axios";

const api = axios.create({
    baseURL: "https://viacep.com.br/ws/",
});

export async function GetLocationByCep(cep: string){
    let response = await api.get(`${cep}/json/`);

    return response.data;
}