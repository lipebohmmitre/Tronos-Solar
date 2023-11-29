import CategoryDTO from "./CategoryDTO";

export default interface ProductDTO{
    
    [key: string]: any; 
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
    createdDate: Date;
    lastModifiedDate: Date;
    categories: CategoryDTO[];
}