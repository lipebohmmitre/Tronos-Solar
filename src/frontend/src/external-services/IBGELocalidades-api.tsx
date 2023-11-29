import axios from "axios";

const api = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/",
});

export interface State{
    description: string;
    uf: string;
}

export async function GetStates(): Promise<State[]>{
    let response = await api.get('/estados')
    
    let result = response.data.map((item: any) => {
        return {
            description: item.nome + " (" + item.sigla + ")",
            uf: item.sigla
        }
    })

    result.sort((a: State, b: State) => {
        const descriptionA = a.description.toLowerCase();
        const descriptionB = b.description.toLowerCase();

        if (descriptionA < descriptionB) { return -1; }

        if (descriptionA > descriptionB) { return 1; }

        return 0;
    });

    return result;
}

export async function GetCityByState(uf: string){
    let response = await api.get(`/estados/${uf}/municipios`)

    return response.data;
}