import ProductDTO from './ProductDTO';

export default interface KitDTO{
    id: number;
    name: string;
    description: string;
    price: number;
    image: string | null;
    createdDate: Date;
    lastModifiedDate: Date;
    kwhProductionPerMonthBase: number;
    potencialSavePercentage: number;
    products: ProductDTO[];
}