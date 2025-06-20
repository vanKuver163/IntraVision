import {Coin} from "@/app/features/payment/type";

export type CoinItem = {
    coin: Coin;
    quantity: number;
}

export type  CoinState = {
    items: CoinItem[];
}
