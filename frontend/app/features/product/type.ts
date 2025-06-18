import {Brand} from "@/app/features/brand/type";

export type Product = {
    id: number,
    name: string,
    price: number,
    imagePath: string,
    brandId: number,
    brand: Brand,
}
