import {CoinItem} from "@/app/features/coin/type";
import {CartItem} from "@/app/features/cart/type";

export type Coin = {
    id: number,
    denomination: number,
}

export type PaymentRequest = {
    payment: CoinItem[],
    order: CartItem[]
}

export type PaymentResponse = {
    success: boolean,
    change: CoinItem[]
}
