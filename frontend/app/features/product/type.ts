import {Brand} from "@/app/features/brand/type";

export type Product = {
    id: number,
    name: string,
    price: number,
    quantity: number,
    imagePath: string,
    brandId: number,
    brand: Brand,
}

export interface ProductImportData {
    name: string;
    price: number;
    quantity: number;
    imagePath: string;
    brand: string;
}


