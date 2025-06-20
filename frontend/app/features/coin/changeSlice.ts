import {CoinItem, CoinState} from "@/app/features/coin/type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Coin} from "@/app/features/payment/type";
import {RootState} from "@/app/store/store";

const initialState: CoinState = {
    items: [],
};

const changeSlice = createSlice({
    name: 'change',
    initialState,
    reducers: {
        addToChange: {
            reducer: (state, action: PayloadAction<CoinItem>) => {
                const existingItem = state.items.find(
                    item => item.coin.id === action.payload.coin.id
                );
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    state.items.push(action.payload);
                }
            },
            prepare: (coin: Coin, quantity: number) => ({
                payload: {
                    coin,
                    quantity: quantity,
                },
            }),
        },
        resetChange: () => {
            return initialState;
        },
    },
});

export const selectChangeItems = (state: RootState) => state.change.items;

export const selectTotalChangeSumCoin = (state: RootState) =>
    state.change.items.reduce(
        (total: number, item: CoinItem) => total + item.coin.denomination * item.quantity,
        0
    );
export const { addToChange, resetChange } = changeSlice.actions;
export default changeSlice.reducer;


