import {Product} from "@/app/features/product/type";

export type CartItem = {
    product: Product;
    quantity: number;
}

export type  CartState = {
    items: CartItem[];
}
